import { NextSeo } from "next-seo";
import { Box, Stack } from "@mui/material";
import BreadCrumbs from "@/components/BreadCrumbs";
import WhyUsSection from "@/components/sections/WhyUsSection";
import DotationSection from "@/components/sections/DotationSection";
import ContactSection from "@/components/sections/ContactSection";

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
        <WhyUsSection />
        <DotationSection />
        <ContactSection />
      </Stack>
    </>
  );
}
