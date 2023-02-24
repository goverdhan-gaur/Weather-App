import type { NextApiRequest, NextApiResponse } from 'next'

const key = 'AIzaSyCtsCY6SclN4jiA-mRKinYyksR6xcmHbWc'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&key=${key}`);
        const data = await response.json();
        const coordinates = data.result.geometry.location;
        res.status(200).json(coordinates);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}