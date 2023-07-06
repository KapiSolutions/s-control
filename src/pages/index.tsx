import { NextSeo } from "next-seo";
import { Box, Stack } from "@mui/material";
import BreadCrumbs from "@/components/BreadCrumbs";
import WhyUs from "@/components/sections/WhyUs";
import Dotation from "@/components/sections/Dotation";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <NextSeo
        title="S-control | Twoja fotowoltaika"
        // description={t[locale].desc}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <Box sx={{ ml: 2 }}>
        <BreadCrumbs items={null} />
      </Box>
      <Stack spacing={6}>
        <WhyUs />
        <Dotation />
        <Contact />
      </Stack>
    </>
  );
}
