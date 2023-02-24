import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies';

export default async function handler(
    // eslint-disable-next-line no-unused-vars
    req: NextApiRequest,
    res: NextApiResponse
) {
    const cookies = parseCookies();
    const token = cookies.access_token

    try {
        const response = await fetch(`https://api.meteomatics.com/2023-02-22T00:00:00Z--2023-02-23T00:00:00Z/t_2m:C/52.520551,13.461804/json?access_token=${token}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}