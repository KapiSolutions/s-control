import React, { useRef } from "react";
import { Box, Container, Stack, Typography, useTheme, useMediaQuery, Fade } from "@mui/material";
import useIsVisible from "@/utils/hooks/useIsVisible";
import ContentHeader from "../ContentHeader";
import mainImg from "../../../public/img/sections/heatpumps/main.webp";
import main2Img from "../../../public/img/sections/heatpumps/main2.webp";
import Image from "next/image";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PixIcon from "@mui/icons-material/Pix";
import SavingsIcon from "@mui/icons-material/Savings";
import ChairIcon from "@mui/icons-material/Chair";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import HouseIcon from "@mui/icons-material/House";

const HeatPumps = (): JSX.Element => {
  const itemRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const itemVisible = useIsVisible(itemRef);

  const getItem = (icon: JSX.Element, header: string, content: string): JSX.Element => {
    return (
      <Stack spacing={2} alignItems="center" className="zoom" sx={{ textAlign: "center" }}>
        {icon}
        <Typography variant="body1" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {header}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </Stack>
    );
  };

  return (
    <Box
      component="section"
      sx={{ minHeight: "100vh", maxWidth: "100vw", bgcolor: "layout.dark", color: "common.white", pt: 6, pb: 6 }}
    >
      <Container name="Pompy-ciepla">
        <ContentHeader primary="Pompy Ciepła" secondary="Komfort termiczny przez cały rok!" />
      </Container>
      <Box sx={{ position: "relative", height: 350, width: "100vw" }}>
        <Image src={isMobile ? main2Img : mainImg} fill alt="s-control pompy ciepła" style={{ objectFit: "cover" }} />
      </Box>
      <Container sx={{ mt: 4 }}>
        <Fade in={itemVisible} timeout={1000}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={4}
            alignItems="center"
            justifyContent="space-evenly"
            ref={itemRef}
          >
            {getItem(
              <SavingsIcon color="primary" sx={{ fontSize: 36 }} />,
              "Oszczędności",
              "Obniż rachunki dzięki odnawialnej energii"
            )}
            {getItem(
              <HouseIcon color="primary" sx={{ fontSize: 36 }} />,
              "Niezależność",
              "Stabilne i ekonomiczne źródło ciepła w Twoim domu"
            )}
            {getItem(
              <ChairIcon color="primary" sx={{ fontSize: 36 }} />,
              "Komfort",
              "Niezależnie od warunków atmosferycznych, ciesz się przyjemnym klimatem w swoim wnętrzu"
            )}
            {getItem(
              <PixIcon color="primary" sx={{ fontSize: 36 }} />,
              "Wielofunkcyjność",
              "Twoja pompa ciepła nie tylko ogrzewa, ale również dostarcza ciepłą wodę użytkową"
            )}
          </Stack>
        </Fade>
      </Container>
    </Box>
  );
};

export default HeatPumps;
