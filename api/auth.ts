export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
        });
    }

    const { code } = await req.json();

    if (!code) {
        return new Response(JSON.stringify({ error: 'No code provided' }), {
            status: 400,
        });
    }

    const client_id = '5de0e892cfa54797a83e15261b1dadae';
    const client_secret = 'ea627852a76640508c1dd1991aa02523';
    const redirect_uri = 'https://fandymusic.vercel.app/login';

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization:
                'Basic ' +
                btoa(`${client_id}:${client_secret}`),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri,
        }),
    });

    const data = await tokenResponse.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}