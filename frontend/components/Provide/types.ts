// types/strapi.ts

export interface Logo {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
    };
  } | null;
}

export interface ProvideItem {
  id: number;
  heading: string;
  paragraph: string;
  logo: Logo;
}

export interface ProvideData {
  id: number;
  documentId: string;
  heading: string;
  subHeading: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  provide: ProvideItem[];
}

export interface ProvideResponse {
  data: ProvideData;
  meta: Record<string, unknown>;
}
