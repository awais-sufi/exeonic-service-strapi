export interface Service {
  id: number;
  documentId: string;
  label: string;
  background: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}
