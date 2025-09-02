// types/header.ts

export type HeaderLink = {
  id: number;
  text: string;
  url: string;
};

export type HeaderButton = {
  id: number;
  text: string;
  url: string;
};

export type Logo = {
  url: string;
  alternativeText: string;
};

export type HeaderData = {
  id: number;
  logo: Logo;
  link: HeaderLink[];
  button: HeaderButton[];
};

export type ApiResponse = {
  data: {
    id: number;
    documentId: string;
    header: HeaderData[];
  };
};
