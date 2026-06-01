export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('Missing OPENROUTER_API_KEY in Vercel environment');
      return new Response('Server configuration error: Missing API Key', { status: 500 });
    }

    const targetUrl = new URL('https://openrouter.ai/api/v1/chat/completions');

    const headers = new Headers(req.headers);
    headers.delete('host');
    // Ensure we send the correct authorization to OpenRouter
    headers.set('Authorization', `Bearer ${apiKey}`);
    headers.set('HTTP-Referer', 'https://nutritrack.vercel.app'); // Update with your actual URL
    headers.set('X-Title', 'NutriTrack'); // Site title for OpenRouter rankings

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
