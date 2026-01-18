export const BlockType = [
  "heading",
  "heading1",
  "heading2",
  "paragraph",
  "document",
  "image",
  "video",
  "code",
  "link",
  "bullet",
] as const;

export type BlockType = (typeof BlockType)[number];