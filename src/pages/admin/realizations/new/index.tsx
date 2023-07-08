import BreadCrumbs from "@/components/BreadCrumbs";
import RealizationTemplate from "@/components/admin/realizations/RealizationTemplate";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Container, Box, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function AdminNewProjectPage(): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      prev: "Menage projects",
      h1: "New Project!",
    },
    pl: {
      prev: "Twoje projekty",
      h1: "Nowy Projekt!",
    },
    default: {},
  };
  const breadcrumbs = [
    { name: "Panel realizacji", path: "/admin/realizations#main" },
    { name: "Nowa realizacja", path: "/admin/realizations/new" },
  ];
  return (
    <>
      <NextSeo title="S-control | Nowa Realizacja" nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" sx={{mb:2, mt:2}}>
          Nowa Realizacja
        </Typography>
        <RealizationTemplate realization={null} />
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
