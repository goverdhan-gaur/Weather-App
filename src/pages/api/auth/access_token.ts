
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies';

export default async function handler(
    // eslint-disable-next-line no-unused-vars
    req: NextApiRequest,
    res: NextApiResponse
) {
    const username = 'vinter_gaur'
    const password = 'F08bbgMd5I'
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(username + ':' + password).toString('base64'));

    try {
        const response = await fetch('https://login.meteomatics.com/api/v1/token', {
            method: 'GET', headers: headers
        });
        const data = await response.json();
        const token = data.access_token;

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        setCookie(null, 'access_token', token, {
            maxAge: expires.getTime() - new Date().getTime()
        });

        res.status(200).json({ status: 200, message: 'Access Granted!!' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
}
