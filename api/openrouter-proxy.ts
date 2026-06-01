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

    const targetUrl = new URL(process.env.OPENCODE_API_URL || 'https://opencode.ai/zen/go/v1/chat/completions');

    const headers = new Headers(req.headers);
    headers.delete('host');
    // Ensure we send the correct authorization header
    headers.set('Authorization', `Bearer ${apiKey}`);

    const proxyRes = await fetch(targetUrl.toString(), {
      method: req.method,
      headers,
      body: req.body,
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
