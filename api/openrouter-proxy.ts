export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const apiKey = process.env.OPENCODE_API_KEY || process.env.OPENCODE_GO_API_KEY || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('Missing API Key (OPENCODE_API_KEY, OPENCODE_GO_API_KEY, or OPENROUTER_API_KEY) in Vercel environment');
      return new Response('Server configuration error: Missing API Key', { status: 500 });
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

    const headers = new Headers(req.headers);
    headers.delete('host');
    // Ensure we send the correct authorization header
    headers.set('Authorization', `Bearer ${apiKey}`);

    const proxyRes = await fetch(targetUrl.toString(), {
      method: req.method,
      headers,
      body: bodyText,
      duplex: 'half',
    } as any);

    return new Response(proxyRes.body, {
      status: proxyRes.status,
      headers: proxyRes.headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(String(error), { status: 500 });
  }
}
