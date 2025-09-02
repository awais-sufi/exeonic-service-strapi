// app/types.ts

export interface Logo {
  id: number;
  link: string;
}

export interface SocialLink {
  id: number;
  url: string;
}

export interface NavLink {
  id: number;
  text: string;
  url: string;
}

export interface Button {
  id: number;
  text: string;
  url: string | null;
}

export interface FooterData {
  heading: string;
  heading1: string;
  heading2: string;
  subHeading: string;
  paragraph: string;
  email: string | null;
  lasttext: string;
  logo: Logo;
  socaillink: SocialLink[];
  link: NavLink[];
  link1: NavLink[];
  button: Button;
}
