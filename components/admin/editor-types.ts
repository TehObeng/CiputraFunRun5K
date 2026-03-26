import type { LandingPageContent } from "@/lib/site-schema";

export type PathSegment = string | number;
export type Path = PathSegment[];

export type EditorSectionProps = {
  content: LandingPageContent;
  updatePath: (path: Path, value: unknown) => void;
  addItem: (path: Path, value: unknown) => void;
  removeItem: (path: Path, index: number) => void;
  handleAssetUpload: (target: string, file: File, alt: string) => Promise<void>;
  uploadingTarget: string | null;
};
