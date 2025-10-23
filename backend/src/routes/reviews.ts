import express from "express";
import fetch from "node-fetch";
import hostawaySample from "../mock/hostaway-sample-expanded.json";
import { getAccessToken, normalizeHostaway } from "../services/hostaway";
import type { Hostaway_Response as Hostaway_ResponseType } from "../services/hostaway";

const router = express.Router();

router.get("/reviews/hostaway", async (req: express.Request, res: express.Response) => {
    try {
        const token = await getAccessToken();
        const response = await fetch("https://api.hostaway.com/v1/reviews", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json() as Hostaway_ResponseType;

        const items = Array.isArray(data.result) ?
            data.result.length > 0 ?
                data.result :
                hostawaySample.result :
            hostawaySample.result;

        const normalized = normalizeHostaway(items);

        res.json(normalized);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;
