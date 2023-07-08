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
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/img/main-1.webp')",
        backgroundPosition: "right",
      }}
    >
      <Navbar />

      <Container>
        <Stack spacing={isMobile ? 3 : 6} sx={{ textAlign: "left", ml: 2 }}>
          <Box>
            <Typography variant="h1" component="h1" sx={{ fontWeight: "bold" }}>
              S-control
            </Typography>
          </Box>

          <Typography
            color="whitesmoke"
            variant={isMobile ? "h5" : "h3"}
            mb={2}
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "4px",
              p: 2,
              maxWidth: "90%",
            }}
          >
            Instalacje fotowoltaiczne i pompy ciepła
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: isMobile ? 2 : 0 }}>
            {/* <Button variant="outlined" size="large" color="secondary">
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
