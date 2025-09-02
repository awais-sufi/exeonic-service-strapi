// app/components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FooterData } from "./types";

// Fetch function
async function getFooterData(): Promise<FooterData> {
  const res = await fetch("http://localhost:1337/api/footer?populate=*", {
    cache: "no-store", // ensure fresh data
  });
  if (!res.ok) {
    throw new Error("Failed to fetch footer data");
  }
  const json = await res.json();

  const data = json.data;

  return {
    heading: data.heading,
    heading1: data.heading1,
    heading2: data.heading2,
    subHeading: data.subHeading,
    paragraph: data.paragraph,
    email: data.email,
    lasttext: data.lasttext,
    logo: data.logo,
    socaillink: data.socaillink,
    link: data.link,
    link1: data.link1,
    button: data.button,
  };
}

const Footer = async () => {
  const data = await getFooterData();

  return (
    <footer className="bg-[#102e3c] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 my-20">
        {/* Logo & Description */}
        <div>
          <Link href={data.logo.link}>
            <h1 className="text-2xl font-bold mb-4">Logo</h1>
          </Link>
          <p>{data.paragraph}</p>
          <div className="flex space-x-4 mt-4">
            {data.socaillink.map((social) => (
              <Link
                key={social.id}
                href={social.url}
                className="hover:text-[#219ebc]"
              >
                {social.url.replace("/", "")}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="font-semibold mb-12">{data.heading}</h2>
          <ul className="space-y-5">
            {data.link.map((nav) => (
              <li key={nav.id}>
                <Link href={nav.url} className="hover:text-[#219ebc]">
                  {nav.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links */}
        <div>
          <h2 className="font-semibold mb-12">{data.heading1}</h2>
          <ul className="space-y-5">
            {data.link1.map((nav) => (
              <li key={nav.id}>
                <Link href={nav.url} className="hover:text-[#219ebc]">
                  {nav.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-semibold mb-2">{data.heading2}</h2>
          <p className="mb-4">{data.subHeading}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md bg-white text-gray-900 flex-1"
            />
            <button className="bg-[#9ca3af] hover:bg-[#219ebc] text-white px-4 py-2 rounded-md">
              {data.button.text}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <hr className="border-[#374151] max-w-6xl mx-auto" />
      <div className="text-md text-center mt-6 mb-13">{data.lasttext}</div>
    </footer>
  );
};

export default Footer;
