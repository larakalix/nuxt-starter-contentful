import type { APIRoute } from "astro";
import { getLandingPage } from "@starter/content";

export const GET: APIRoute = async ({ params }) => {
    const slug = params.slug as string;

    try {
        if (!slug) {
            return new Response(
                JSON.stringify({ message: "Slug parameter is required" }),
                { status: 400 }
            );
        }

        const page = await getLandingPage(slug);
        return new Response(JSON.stringify(page), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        return new Response(
            JSON.stringify({
                message: err?.message ?? "Failed to load funnel page",
            }),
            { status: 500 }
        );
    }
};
