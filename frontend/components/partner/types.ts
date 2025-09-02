export interface PartnerImageFormat {
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

export interface PartnerImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: PartnerImageFormat;
    large?: PartnerImageFormat;
    medium?: PartnerImageFormat;
    small?: PartnerImageFormat;
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

export interface PartnerButton {
  id: number;
  label: string;
  url: string;
}

export interface PartnerData {
  id: number;
  documentId: string;
  heading: string;
  subHeading: string;
  paragraph: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: PartnerImage;
  button: PartnerButton;
}

export interface PartnerResponse {
  data: PartnerData;
  meta: Record<string, unknown>;
}
