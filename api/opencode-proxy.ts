// Backward-compatible endpoint for clients cached with the temporary OpenCode route.
// It intentionally routes to OpenRouter and never reads OPENCODE_* secrets.
const DEFAULT_UPSTREAM_TIMEOUT_MS = 55_000;

const getUpstreamTimeoutMs = () => {
  const configured = Number(process.env.OPENROUTER_PROXY_TIMEOUT_MS);
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
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('Missing OPENROUTER_API_KEY in Vercel environment');
      return jsonResponse({ error: 'Server configuration error: Missing OPENROUTER_API_KEY' }, 500);
    }

    const targetUrlStr = process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions';
    const targetUrl = new URL(targetUrlStr);
    const bodyText = await req.text();

    const headers = new Headers();
    headers.set('Authorization', `Bearer ${apiKey}`);
    headers.set('Content-Type', req.headers.get('content-type') || 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('HTTP-Referer', req.headers.get('origin') || 'https://nutritrack.app');
    headers.set('X-Title', 'NutriTrack');

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
        console.error(`OpenRouter compatibility proxy timeout after ${timeoutMs}ms`);
        return jsonResponse({
          error: 'OpenRouter did not respond before the proxy timeout.',
          retryable: true,
          timeoutMs,
        }, 504);
      }

      console.error('OpenRouter compatibility upstream fetch failed:', error);
      return jsonResponse({
        error: 'OpenRouter proxy failed before receiving a response.',
        detail: String(error),
        retryable: true,
      }, 502);
    } finally {
      clearTimeout(timeout);
    }

    console.log(`OpenRouter compatibility proxy responded with ${proxyRes.status} in ${Date.now() - startedAt}ms`);

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
