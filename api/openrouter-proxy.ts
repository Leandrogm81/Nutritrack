const DEFAULT_UPSTREAM_TIMEOUT_MS = 55_000;

const getUpstreamTimeoutMs = () => {
  const configured = Number(process.env.OPENCODE_PROXY_TIMEOUT_MS);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_UPSTREAM_TIMEOUT_MS;
};

const jsonResponse = (payload: unknown, status: number) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const upstreamResponseHeaders = (headers: Headers) => {
  const responseHeaders = new Headers();
  responseHeaders.set('Content-Type', headers.get('content-type') || 'application/json; charset=utf-8');
  responseHeaders.set('Cache-Control', 'no-store');
  return responseHeaders;
};

async function handler(req: Request) {
  const startedAt = Date.now();
  try {
    const apiKey = process.env.OPENCODE_API_KEY || process.env.OPENCODE_GO_API_KEY || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('Missing API Key (OPENCODE_API_KEY, OPENCODE_GO_API_KEY, or OPENROUTER_API_KEY) in Vercel environment');
      return jsonResponse({ error: 'Server configuration error: Missing API Key' }, 500);
    }

    let targetUrlStr = process.env.OPENCODE_API_URL || 'https://opencode.ai/zen/go/v1/chat/completions';
    // Ensure targetUrlStr ends with /chat/completions for OpenAI compatibility.
    if (!targetUrlStr.includes('/chat/completions')) {
      targetUrlStr = targetUrlStr.replace(/\/$/, '') + '/chat/completions';
    }

    const targetUrl = new URL(targetUrlStr);

    // Read and parse request body to strip vendor prefixes like "xiaomi/" for OpenCode Go compatibility
    let bodyText = await req.text();
    try {
      const bodyObj = JSON.parse(bodyText);
      if (bodyObj && typeof bodyObj.model === 'string' && bodyObj.model.startsWith('xiaomi/')) {
        console.log(`Rewriting model name from ${bodyObj.model} to ${bodyObj.model.replace(/^xiaomi\//, '')} for OpenCode compatibility`);
        bodyObj.model = bodyObj.model.replace(/^xiaomi\//, '');
        bodyText = JSON.stringify(bodyObj);
      }
    } catch (e) {
      // Non-JSON body or parse error, keep original bodyText
    }

    const headers = new Headers();
    headers.set('Authorization', `Bearer ${apiKey}`);
    headers.set('Content-Type', req.headers.get('content-type') || 'application/json');
    headers.set('Accept', 'application/json');

    const controller = new AbortController();
    const timeoutMs = getUpstreamTimeoutMs();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    let proxyRes: Response;
    try {
      proxyRes = await fetch(targetUrl.toString(), {
        method: req.method,
        headers,
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : bodyText,
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error(`OpenCode proxy timeout after ${timeoutMs}ms`);
        return jsonResponse({
          error: 'OpenCode Go did not respond before the proxy timeout.',
          retryable: true,
          timeoutMs,
        }, 504);
      }

      console.error('OpenCode upstream fetch failed:', error);
      return jsonResponse({
        error: 'OpenCode proxy failed before receiving a response.',
        detail: String(error),
        retryable: true,
      }, 502);
    } finally {
      clearTimeout(timeout);
    }

    console.log(`OpenCode proxy responded with ${proxyRes.status} in ${Date.now() - startedAt}ms`);

    return new Response(proxyRes.body, {
      status: proxyRes.status,
      headers: upstreamResponseHeaders(proxyRes.headers),
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return jsonResponse({ error: String(error) }, 500);
  }
}

export default {
  fetch: handler,
};
