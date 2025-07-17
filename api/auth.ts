
import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { code } = req.body;
    console.log('we are in backend');

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    const client_id = '5de0e892cfa54797a83e15261b1dadae';
    const client_secret = 'ea627852a76640508c1dd1991aa02523';
    const redirect_uri = 'https://fandymusic.vercel.app/login';

    const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization:
                'Basic ' +
                Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri,
        }).toString(),
    };

    try {
        const response = await axios(authOptions);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(400).json({ error: 'Failed to fetch token', details: err });
    }
}
