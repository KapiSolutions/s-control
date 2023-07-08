import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  description: "Opis",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://www.s-control.vercel.app",
    siteName: "S-Control Fotowoltaika",
  },
};

export default config;
