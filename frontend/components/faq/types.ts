// types/faq.ts
export interface FaqQuestion {
  id: number;
  question: string;
  answer: string;
}

export interface FaqImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface FaqImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: FaqImageFormat;
    small?: FaqImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FaqButton {
  id: number;
  label: string;
  url: string;
}

export interface FaqData {
  id: number;
  documentId: string;
  faq: string;
  heading: string;
  subHeading: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  text: string;
  subtext: string;
  question: FaqQuestion[];
  image: FaqImage;
  button: FaqButton;
}

export interface FaqResponse {
  data: FaqData;
  meta: Record<string, unknown>;
}
