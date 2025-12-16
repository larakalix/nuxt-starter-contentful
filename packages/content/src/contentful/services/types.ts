export type GetEntriesInput = {
    contentType: string;
    where?: Record<string, unknown>;
    limit?: number;
    skip?: number;
    order?: string | string[];
    selection: string;
};

export type GetBySlugInput = {
    contentType: string;
    slug: string;
    slugField?: string;
    selection: string;
};

export type CollectionResult<T> = {
    items: T[];
    total?: number;
    limit?: number;
    skip?: number;
};
