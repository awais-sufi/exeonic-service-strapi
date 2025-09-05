export type Logo = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

export type LinkItem = {
  id: number;
  text: string;
  url: string;
};

export type Button = {
  id: number;
  text: string;
  url: string;
};

export type Media = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  data: string;
};

export type SocialLink = {
  id: number;
  url: string;
  logoText: string;
};

export type FooterData = {
  id: number;
  paragraph: string;
  heading: string;
  heading1: string;
  heading2: string;
  subHeading: string;
  lasttext: string;
  logo: Logo;
  socaillink: SocialLink[];
  link: LinkItem[];
  link1: LinkItem[];
  button: Button;
};

export type ApiResponse = {
  data: FooterData;
};
