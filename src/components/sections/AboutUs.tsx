import React from "react";
import { Box, Container, Stack, Typography, useTheme, useMediaQuery, Grid, Paper } from "@mui/material";
import ContentHeader from "../ContentHeader";
import Image from "next/image";
import main from "../../../public/img/sections/aboutUs/main2.webp";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";

const AboutUs = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const styles = {
    icon: {
      fontSize: 58,
      color: "primary.main",
      "&:hover": {
        color: "layout.dark",
      },
    },
  };

  const getItem = (icon: JSX.Element, header: string, content?: string): JSX.Element => {
    return (
      <Stack alignItems="center" spacing={2} className="zoom">
        {icon}
        <Typography variant="body1" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          {header}
        </Typography>
      </Stack>
    );
  };
  return (
    <Box component="section" sx={{ bgcolor: "layout.semiLight", pt: 6, pb: 6, maxWidth: "100vw" }}>
      <Container name="O-nas">
        <ContentHeader primary="O nas" secondary="Poznaj S-control" />
        <Grid container alignItems="center" justifyContent="space-evenly" sx={{ margin: "auto" }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              position: "relative",
              height: isMobile ? 300 : 400,
              clipPath: "polygon(0 0,calc(100% - 40.00px) 0,100% 40.00px,100% 100%,0 100%)",
            }}
          >
            <Image src={main} fill alt="s-control fotowoltaika" style={{ objectFit: "cover" }} />
          </Grid>
          <Grid item xs={12} md={7} sx={{ pt: isMobile ? 4 : 0 }}>
            <Stack spacing={4} alignItems="center" sx={{ textAlign: isMobile ? "center" : "left" }}>
              <Stack spacing={2} alignItems="center">
                <Typography variant="h6" component="p" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  Kim jesteśmy?
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "justify" }}>
                  Jesteśmy doświadczoną firmą działającą w branży Odnawialnych Źródeł Energii oraz Automatyki od 2017
                  roku. Nasza firma, S-Control, powstała w wyniku zebranych doświadczeń, pasji do nowoczesnych
                  technologii oraz dążenia do opracowywania innowacyjnych rozwiązań. Wszystko to, aby dostarczać jak
                  najlepsze rozwiązania dla Ciebie i Twojego domu.
                </Typography>
              </Stack>
              <Box sx={{ width: "50%", height: "2px", backgroundColor: "primary.main" }}></Box>
              <Stack spacing={2} alignItems="center">
                <Typography variant="h6" component="p" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  Gdzie działamy?
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "justify" }}>
                  Swoje usługi oferujemy głównie na terenie województw podkarpackiego i małopolskiego, obsługując miasta
                  takie jak Krosno, Rzeszów, Kraków, Tarnów oraz inne miejscowości w regionie. Nasz zespół ekspertów
                  posiada wiedzę i doświadczenie, aby sprostać Twoim potrzebom i dostarczyć profesjonalne, szyte na
                  miarę rozwiązania.
                </Typography>
              </Stack>
              {isMobile && <Box sx={{ width: "50%", height: "2px", backgroundColor: "primary.main" }}></Box>}
            </Stack>
          </Grid>
        </Grid>

        <Stack alignItems="center" mt={isMobile ? 6 : 8} mb={2} spacing={4}>
          <Stack alignItems="center">
            <Typography
              variant="body1"
              sx={{ textTransform: "uppercase", fontWeight: "bold", color: "text.secondary" }}
            >
              Co oferujemy
            </Typography>
            <Typography variant="h4" component="p" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Nasza oferta
            </Typography>
          </Stack>

          <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 4 : 8}>
            {getItem(<SolarPowerIcon sx={styles.icon} />, "Fotowoltaika")}
            {getItem(<HeatPumpIcon sx={styles.icon} />, "Pompy ciepła")}
            {getItem(<BatteryCharging90Icon sx={styles.icon} />, "Magazyny energii")}
            {getItem(<KeyboardCommandKeyIcon sx={styles.icon} />, "Systemy HEMS")}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutUs;
