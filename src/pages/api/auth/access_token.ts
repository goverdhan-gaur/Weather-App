import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    // eslint-disable-next-line no-unused-vars
    req: NextApiRequest,
    res: NextApiResponse
) {

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(process.env.METEOMATIC_USERNAME + ':' + process.env.METEOMATIC_PASSWORD).toString('base64'));

    try {
        const response = await fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
        });
        const data = await response.json();
        const token = data.access_token;

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        res.setHeader('Set-Cookie', serialize('access_token', token, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        }));


        res.status(200).json({ status: 200, message: 'Access Granted!!' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
}
