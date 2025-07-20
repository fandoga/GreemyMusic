
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
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refresh_token);

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            params, // <-- передаём объект, а не строку!
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );

        // Spotify может не вернуть новый refresh_token, тогда возвращаем старый
        const access_token = response.data.access_token;
        const new_refresh_token = response.data.refresh_token || refresh_token;

        res.status(200).json({
            access_token,
            refresh_token: new_refresh_token,
            expires_in: response.data.expires_in,
            scope: response.data.scope,
            token_type: response.data.token_type,
        });
    } catch (error: any) {
        console.error(error?.response?.data || error?.message || error);
        res.status(400).json({
            error: 'Failed to refresh token',
            details: error?.response?.data || error?.message || String(error)
        });
    }
}
