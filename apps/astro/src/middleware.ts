import "@starter/content/contentful/astro";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
    return next();
});
