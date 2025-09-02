export interface ImageFormat {
  url: string;
  width: number;
  height: number;
  name: string;
}

export interface ImageData {
  id: number;
  name: string;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface Solution {
  id: number;
  heading: string;
  subHeading: string;
  image: ImageData;
}

export interface WhyUs {
  id: number;
  heading: string;
  subHeading: string;
  solution: Solution[];
}
