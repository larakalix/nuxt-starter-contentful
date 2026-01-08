import type { ButtonProps } from "../../atoms";
import type { SectionHeadingProps } from "../../molecules";
import type { HeroVariantProps } from "./variants";

export type HeroLayout = {
    container: string;
    grid: string;
    content: string;
    media?: string;
    overlay?: string;
    alignment?: "left" | "center";
};

export type HeroContent = {
    eyebrow?: string;
    sectionHeading?: SectionHeadingProps;
    description?: string;
    actions?: ButtonProps[];
};

export type HeroMedia = {
    src?: string;
    alt?: string;
    class?: string;
};

export type HeroBannerProps = HeroVariantProps & {
    content: HeroContent;
    media?: HeroMedia;
};
