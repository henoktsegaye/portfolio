export type SiteWidth = "col" | "wide" | "post";

export const widthClass: Record<SiteWidth, string> = {
  col: "max-w-col",
  wide: "max-w-wide",
  post: "max-w-post",
};
