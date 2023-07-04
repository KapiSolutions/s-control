import React, { useState, useEffect } from "react";
import { Box, Container, Paper, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";
import ConstructionIcon from "@mui/icons-material/Construction";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

const WhyUsSection = (): JSX.Element => {
  const theme = useTheme();
  const [progress, setProgress] = useState(10);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  // Check if the progress bar section is visible in the current viewport
  const checkPosition = () => {
    const actPos = window.scrollY; //Actual scroll position
    const windowHeight = window.innerHeight; //Window height
    const element = document.getElementsByName("satisfyBar")[0];
    if (element) {
      const elementPos = element.offsetTop; //Element position
      // If visible, fire up the progress bar
      if (actPos + windowHeight >= elementPos) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setProgress(0);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkPosition);
    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Progress Bar
  useEffect(() => {
    const timer =
      progress < 100 && isVisible
        ? setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 5));
          }, 50)
        : undefined;
    return () => {
      clearInterval(timer);
    };
  }, [progress, isVisible]);

  const filars = [
    {
      icon: <ConstructionIcon sx={{ fontSize: 80 }} />,
      header: "Jakość",
      content: "Najwyższe standardy jakości zapewniające trwałość i niezawodność w działaniu",
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 80, mr: 1 }} />,
      header: "Estetyka",
      content: "Dbałość o detale i walory estetyczne, aby nie tylko niższe rachunki cieszyły Twoje oko :)",
    },
    {
      icon: <AccessibilityNewIcon sx={{ fontSize: 80 }} />,
      header: "Wygoda",
      content: "Inwestycje dopasujemy do Twoich potrzeb, a formalności załatwimy za Ciebie",
    },
    {
      icon: <AssuredWorkloadIcon sx={{ fontSize: 80 }} />,
      header: "Bezpieczeństwo",
      content: "Fachowy montaż to gwarancja bezpiecznej i bezawaryjnej pracy urządzeń",
    },
  ];
  return (
    <Container sx={{mt:2}}>
      <ContentHeader primary="Co nas wyróżnia" secondary="Nasze 4 filary" />
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", pt: 4 }} justifyContent="center" useFlexGap>
        {filars.map((filar, idx) => (
          <Stack
            key={idx}
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
              {filar.icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {filar.header}
            </Typography>
            {/* <Typography variant="body1">{filar.content}</Typography> */}
            <Typography variant="body1">{filar.content}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack alignItems="center" justifyContent="center" mt={6}  spacing={1}>
        <Box sx={{ position: "relative", width: "50%", height: "2px", backgroundColor: "primary.main", mb: 3 }}></Box>
        <Typography name="satisfyBar" variant="h4">
          {progress}%
        </Typography>
        <Typography variant="h5">Zadowolonych klientów</Typography>
      </Stack>
    </Container>
  );
};

export default WhyUsSection;
