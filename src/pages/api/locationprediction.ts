import type { NextApiRequest, NextApiResponse } from 'next'

const key = 'AIzaSyCtsCY6SclN4jiA-mRKinYyksR6xcmHbWc'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.query.location);
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${req.query.location}&key=${key}`);
        const data = await response.json();
        const predictions = data.predictions;
        res.status(200).json(predictions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}