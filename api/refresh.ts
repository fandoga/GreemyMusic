
import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(400).json({ error: 'No refresh_token provided' });
    }

    const client_id = '5de0e892cfa54797a83e15261b1dadae';
    const client_secret = 'ea627852a76640508c1dd1991aa02523';

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token,
            }).toString(),
            {
                headers: {
                    Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to refresh token', details: error });
    }
}
