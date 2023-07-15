import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  description:
    "Oferujemy Instalacje fotowoltaiczne, pompy ciepła, klimatyzacje oraz magazyny energii. Działamy głównie na terenie województw podkarpackiego i małopolskiego, obsługując miasta takie jak Krosno, Rzeszów, Kraków, Tarnów oraz inne miejscowości w regionie.",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://www.s-control.net",
    siteName: "S-Control | Instalacje Fotowoltaiczne",
    images: [
      { url: "/img/openGraph/main0.webp" },
      { url: "/img/openGraph/main1.webp" },
      { url: "/img/openGraph/main2.webp" },
      { url: "/img/openGraph/main3.webp" },
    ],
    description:
      "Oferujemy Instalacje fotowoltaiczne, pompy ciepła, klimatyzacje oraz magazyny energii. Działamy głównie na terenie województw podkarpackiego i małopolskiego, obsługując miasta takie jak Krosno, Rzeszów, Kraków, Tarnów oraz inne miejscowości w regionie.",
  },
};

export default config;
