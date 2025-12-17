export default defineEventHandler(async (event) => {
    const rc = useRuntimeConfig();
    const preview = getQuery(event).preview === "1";
    const token = preview ? rc.contentfulPreviewToken : rc.contentfulCdaToken;

    const body = await readBody(event);

    const url = `https://graphql.contentful.com/content/v1/spaces/${
        rc.contentfulSpaceId
    }/environments/${rc.contentfulEnvironmentId ?? "master"}`;

    return await $fetch(url, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
        body,
    });
});
