import type { ButtonProps } from "../../atoms";
import type { AuthorCardVariantsProps } from "./variants";

export type AuthorSocialType =
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "website";

export type AuthorSocial = {
    type: AuthorSocialType;
    href: string;
    label?: string;
    button: ButtonProps;
};

export type AuthorCardProps = AuthorCardVariantsProps & {
    name: string;
    role?: string;
    bio?: string;
    avatarSrc?: string | null;
    avatarAlt?: string | null;
    socials?: AuthorSocial[];
    class?: string;
};
