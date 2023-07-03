import { Box, Stack } from "@mui/material";
import BreadCrumbs from "@/components/BreadCrumbs";
import FirstSection from "@/components/sections/FirstSection";
import { NextSeo } from "next-seo";

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
      <Stack spacing={2}>
        <FirstSection />
      </Stack>
    </>
  );
}
