import { Router, Request, Response } from "express";
import axios from "axios";
import { ITunesSearchParams, ITunesApiResponse } from '../types';

const router = Router();

// Define API routes here
router.get("/search", async (req: Request<{}, {}, {}, ITunesSearchParams>, res: Response) => {
    const { term, limit, offset } = req.query;
    console.log(`Received search request: term=${term}, limit=${limit}, offset=${offset}`);
    try {
        const numLimit = limit ? Number(limit) : 10; // Default to 10 if limit is missing
        const numOffset = Number(offset || 0);
        const fetchLimit = Math.min(numOffset + numLimit, 200);

        console.log(`Fetching data from iTunes with params:`, { term, limit: fetchLimit, media: 'music' });
        const response = await axios.get<ITunesApiResponse>(process.env.ITUNES_API_URL as string, {
            params: {
                term,
                limit: fetchLimit,
                media: 'music'
            }
        });

        const results = response.data.results.slice(numOffset, numOffset + numLimit);
        res.json({ ...response.data, resultCount: results.length, results });
    } catch (error: unknown) {
        console.error("Error fetching data from iTunes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;