import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&key=${process.env.GOOGLE_API_KEY}`);
        const data = await response.json();
        const coordinates = data.result.geometry.location;
        res.status(200).json(coordinates);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}