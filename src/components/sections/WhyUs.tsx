import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Paper, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";
import ConstructionIcon from "@mui/icons-material/Construction";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import useIsVisible from "@/utils/hooks/useIsVisible";
import Zoom from "@mui/material/Zoom";

const WhyUs = (): JSX.Element => {
  const theme = useTheme();
  const satisfyBarRef = useRef(null);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [progress, setProgress] = useState(10);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const iconSize = 80;

  const satisfyBarVisible = useIsVisible(satisfyBarRef);
  const filar0Visible = useIsVisible(ref0);
  const filar1Visible = useIsVisible(ref1);
  const filar2Visible = useIsVisible(ref2);
  const filar3Visible = useIsVisible(ref3);

  // Handle Progress Bar
  useEffect(() => {
    setProgress(0);
    const timer =
      progress < 100 && satisfyBarVisible
        ? setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 5));
          }, 40)
        : undefined;
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [satisfyBarVisible]);

  const filar = (
    ref: React.RefObject<HTMLElement | null>,
    visible: boolean,
    icon: JSX.Element,
    header: string,
    content: string
  ) => {
    return (
      <Zoom in={visible} ref={ref} timeout={1000}>
        <Stack
          alignItems="center"
          justifyContent="top"
          sx={{ textAlign: "center", width: isMobile ? "100%" : "23%", minWidth: "250px" }}
        >
          <Box
            sx={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "primary.main",
              mb: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="p" sx={{ fontWeight: "bold", mb: 1 }}>
            {header}
          </Typography>
          <Typography variant="body1">{content}</Typography>
        </Stack>
      </Zoom>
    );
  };
  return (
    <Box sx={{ maxWidth: "100vw", mt: 2 }} component="section">
      <Container>
        <ContentHeader primary="Co nas wyróżnia" secondary="Nasze 4 filary" />
        <Stack
          direction="row"
          spacing={isMobile ? 4 : 2}
          sx={{ flexWrap: "wrap", pt: 4 }}
          justifyContent="center"
          useFlexGap
        >
          {filar(
            ref0,
            filar0Visible,
            <ConstructionIcon sx={{ fontSize: iconSize }} />,
            "Jakość",
            "Najwyższe standardy jakości zapewniające trwałość i niezawodność w działaniu"
          )}
          {filar(
            ref1,
            filar1Visible,
            <AutoAwesomeIcon sx={{ fontSize: iconSize }} />,
            "Estetyka",
            "Dbałość o detale i walory estetyczne, aby nie tylko niższe rachunki cieszyły Twoje oko :)"
          )}
          {filar(
            ref2,
            filar2Visible,
            <AccessibilityNewIcon sx={{ fontSize: iconSize }} />,
            "Wygoda",
            "Inwestycje dopasujemy do Twoich potrzeb, a formalności załatwimy za Ciebie"
          )}
          {filar(
            ref3,
            filar3Visible,
            <AssuredWorkloadIcon sx={{ fontSize: iconSize }} />,
            "Bezpieczeństwo",
            "Fachowy montaż to gwarancja bezpiecznej i bezawaryjnej pracy urządzeń"
          )}
        </Stack>
        <Stack alignItems="center" justifyContent="center" mt={6} spacing={1}>
          <Box sx={{ position: "relative", width: "50%", height: "2px", backgroundColor: "primary.main", mb: 3 }}></Box>
          <Typography ref={satisfyBarRef} variant="h4" component="p">
            {progress}%
          </Typography>
          <Typography variant="h5" component="p">Zadowolonych klientów</Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default WhyUs;
