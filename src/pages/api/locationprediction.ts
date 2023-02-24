import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.query.location);
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`);
        const data = await response.json();
        const predictions = data.predictions;
        res.status(200).json(predictions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}