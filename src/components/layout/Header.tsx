import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography, Stack, Container, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";

const Header = (): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Navbar />

      <Container>
        <Stack spacing={isMobile ? 3 : 6} sx={{ textAlign: "left", ml: 2 }}>
        
          <Box>
            <Typography variant="h1" component="h1" sx={{ fontWeight: "bold", fontSize: isMobile ? "20vw" : "auto" }}>
              S-control
            </Typography>
            {/* <Typography variant="body2" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Złap kontrolę nad własnymi rachunkami
            </Typography> */}
          </Box>
          
          <Typography variant={isMobile ? "h5" : "h3"} mb={2} sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
            Instalacje fotowoltaiczne i pompy ciepła
          </Typography>
          
          <Stack direction="row" spacing={2} sx={{ mt: isMobile ? 2 : 0 }}>
            {/* <Button variant="outlined" size="large" color="primary">
              Wycena
            </Button> */}
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                if (router.route === "/") {
                  document.getElementsByName("main")[0].scrollIntoView({ block: "start", inline: "nearest" });
                } else {
                  router.push("/#main");
                }
              }}
            >
              Dowiedz się więcej
            </Button>
          </Stack>
          
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
