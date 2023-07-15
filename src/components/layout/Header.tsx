import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography, Stack, Container, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import Logotype from "../Logotype";

const Header = (): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const styles = {
    overlay: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      // background: isMobile ? "none" : "linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(0,0,0,0) 50%)",
      background: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) ${isMobile ? "80%" : "50%"})`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/img/main-2.webp')",
        backgroundPosition: "right",
      }}
    >
      <Navbar />
      <Box sx={styles.overlay}>
        <Container>
          <Stack spacing={isMobile ? 3 : 6} sx={{ textAlign: "left", ml: 2 }}>
            <Box sx={{color: "common.white"}}>
              <Logotype size={isMobile ? 80 : 100} weight="bold" />
            </Box>

            <Typography
              color="whitesmoke"
              variant={isMobile ? "h5" : "h4"}
              component="p"
              mb={2}
              sx={{
                textTransform: "uppercase",
                background: "linear-gradient(to right, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 110%)",
                // backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: "6px",
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
                sx={{ fontWeight: "bold", width: "220px", height: "50px", borderRadius: "10px" }}
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
    </Box>
  );
};

export default Header;
