import fetch from "node-fetch";

type HostawayRaw = {
    id: number;
    type: string;
    status: string;
    rating: number | null;
    publicReview: string | null;
    reviewCategory: { category: string; rating: number }[];
    submittedAt: string;
    guestName: string;
    listingName: string;
};

type Hostaway_AccessToken = {
    access_token: string;
    expires_in: number;
    token_type: string;
};

export type Hostaway_Response = {
    status: string;
    result: HostawayRaw[];
};

export function normalizeHostaway(items: HostawayRaw[]) {
    const normalized = items.map((r: HostawayRaw) => {
        let submittedAtISO = '';
        if (r.submittedAt) {
            const s = r.submittedAt.replace(" ", "T");
            submittedAtISO = new Date(s).toISOString();
        }

        let rating: number | null = null;
        if (r.rating !== null && r.rating !== undefined)
            rating = Number(r.rating);
        else if (Array.isArray(r.reviewCategory) && r.reviewCategory.length > 0) {
            const vals = r.reviewCategory.map((c: any) => Number(c.rating) || 0);
            rating = vals.reduce((a: number, b: number) => a + b, 0) / vals.length;
        }

        const categories: Record<string, number> = {};
        if (Array.isArray(r.reviewCategory)) {
            r.reviewCategory.forEach((c: any) => {
                categories[c.category] = Number(c.rating);
            });
        }

        return {
            id: String(r.id),
            source: "hostaway",
            listingName: r.listingName || null,
            reviewType: r.type || null,
            status: r.status || null,
            approved: (r.status === "published"),
            rating: rating,
            categories,
            text: r.publicReview || null,
            guestName: r.guestName || null,
            submittedAt: submittedAtISO,
            raw: r
        };
    });

    return normalized;
}

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

const HOSTAWAY_CLIENT_ID = "61148";
const HOSTAWAY_CLIENT_SECRET = "f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152";

export async function getAccessToken() {
    if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

    const body = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: HOSTAWAY_CLIENT_ID,
        client_secret: HOSTAWAY_CLIENT_SECRET,
        scope: "general",
    })

    const res = await fetch("https://api.hostaway.com/v1/accessTokens", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!res.ok) {
        throw new Error(`Failed to get access token: ${res.statusText}`);
    }

    const data = (await res.json()) as Hostaway_AccessToken;
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + data.expires_in * 1000;

    return cachedToken;
}