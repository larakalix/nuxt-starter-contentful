import type { TocMenuVariantsProps } from "./variants";

export type TocItem = {
    id: string;
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type PostTocProps = TocMenuVariantsProps & {
    bodyContent: string;
    containerSelector?: string;
    scrollOffset?: number;
    debug?: boolean;
};
