import React, { useRef } from "react";
import { Box, Container, Stack, Typography, useTheme, useMediaQuery, Zoom, Grid } from "@mui/material";
import ContentHeader from "../ContentHeader";
import useIsVisible from "@/utils/hooks/useIsVisible";
import Image from "next/image";
import img1 from "../../../public/img/sections/photovoltaics/img2.webp";
import img2 from "../../../public/img/sections/photovoltaics/img3.webp";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import VerifiedIcon from "@mui/icons-material/Verified";

const Photovoltaics = (): JSX.Element => {
  const itemRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const itemVisible = useIsVisible(itemRef);
  return (
    <Box component="section" sx={{ pt: 6, pb: 6 }}>
      <Container sx={{ minHeight: "100vh" }} name="PhotovoltaicsSection">
        <ContentHeader primary="Instalacje Fotowoltaiczne" secondary="Zielona energia dla Twojego domu" />
        <Grid
          container
          direction="row"
          spacing={isMobile ? 2 : 4}
          alignItems="center"
          justifyContent="center"
          ref={itemRef}
        >
          <Zoom in={itemVisible} timeout={500}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: "relative",
                height: isMobile ? "330px" : "500px",
                maxWidth: isMobile ? "94vw" : "auto",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: isMobile ? 250 : 350,
                  width: isMobile ? "90vw" : "80%",
                  maxWidth: "90%",
                }}
              >
                <Image src={img1} fill alt="s-control fotowoltaika" style={{ objectFit: "cover" }} />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  right: "-5%",
                  height: isMobile ? 200 : 300,
                  width: 300,
                  border: "12px solid white",
                }}
              >
                <Image src={img2} fill alt="s-control fotowoltaika" style={{ objectFit: "cover" }} />
              </Box>
            </Grid>
          </Zoom>
          <Grid item xs={12} md={6}>
            <Stack
              spacing={2}
              alignItems={isMobile ? "center" : "left"}
              sx={{ textAlign: isMobile ? "center" : "left", pr: 1 }}
            >
              <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center">
                <SolarPowerIcon color="primary" sx={{ fontSize: 36 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
                  Nasza Wizja
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                W S-Control zdajemy sobie sprawę, że energia słoneczna jest nie tylko przyszłością, ale także
                rozwiązaniem na teraźniejszość. Dlatego specjalizujemy się w dostarczaniu kompleksowych rozwiązań
                fotowoltaicznych, które pozwolą Ci cieszyć się czystą energią i oszczędnościami na rachunkach za prąd.
              </Typography>

              <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center">
                <EmojiNatureIcon color="primary" sx={{ fontSize: 36 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
                  Środowisko
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                Dbamy o czystość naszego środowiska i przyczyniamy się do walki ze zmianami klimatu. Wykorzystując
                energię słoneczną, nie emitujemy żadnych szkodliwych gazów cieplarnianych ani innych substancji
                szkodliwych dla atmosfery.
              </Typography>
              
              <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center">
                <VerifiedIcon color="primary" sx={{ fontSize: 36 }} />
                <Typography variant="body1" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
                  Odpowiedzialność
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                Jesteśmy dumni z jakości naszych produktów i usług. Stawiamy na sprawdzone technologie i wysokiej
                jakości panele fotowoltaiczne, które są gwarancją niezawodności i wydajności przez wiele lat. Nasze
                instalacje są również objęte gwarancją, aby zapewnić Ci spokój i pewność, że podejmujesz trafną decyzję.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Photovoltaics;
