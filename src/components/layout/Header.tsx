import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography, Stack, Container, useTheme, useMediaQuery } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import Navbar from "./Navbar";
import Logotype from "../Logotype";

const Header = (): JSX.Element => {
  const [scrollTo, setScrollTo] = useState({ change: false, name: "" });
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
    wrapper: {
      position: "relative",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('/img/main-2.webp')",
      backgroundPosition: "right",
      backgroundSize: "cover",
    },
  };
  const dynamicText = (): JSX.Element => {
    const delay = 2000;
    return (
      <TypeAnimation
        preRenderFirstString={true}
        sequence={["pompy ciepła", delay, "magazyny energii", delay, "systemy hems", delay, "klimatyzacje", delay]}
        wrapper="span"
        cursor={false}
        repeat={Infinity}
        style={{ display: "inline-block" }}
      />
    );
  };
  return (
    <Box sx={styles.wrapper}>
      <Navbar scrollTo={scrollTo} />
      <Box sx={styles.overlay}>
        <Container>
          <Stack spacing={6} sx={{ textAlign: "left", ml: 2 }}>
            <Box sx={{ color: "common.white" }}>
              <Logotype size={isMobile ? 80 : 100} weight="bold" />
            </Box>
            <Stack
              direction={isMobile ? "column" : "row"}
              alignItems="left"
              spacing={isMobile ? 0 : 1}
              mb={2}
              p={2}
              sx={{
                background: "linear-gradient(to right, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0) 110%)",
                borderRadius: "6px",
                maxWidth: "90%",
                textTransform: "uppercase",
              }}
            >
              <Typography color="whitesmoke" variant={isMobile ? "h5" : "h4"} component="p">
                Instalacje fotowoltaiczne{isMobile? "":" i "}
              </Typography>
              <Typography color="whitesmoke" variant={isMobile ? "h5" : "h4"} component="p">
                {dynamicText()}
              </Typography>
            </Stack>

            <Stack
              direction={isMobile ? "column" : "row-reverse"}
              spacing={4}
              justifyContent="left"
              mt={isMobile ? 2 : 0}
            >
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="animatedBorder"
                sx={{
                  fontWeight: "bold",
                  width: "260px",
                  height: "50px",
                  borderRadius: "10px",
                  border: "1px solid #001525",
                }}
                onClick={() => setScrollTo({ change: !scrollTo.change, name: "Kontakt" })}
              >
                Zamów bezpłatny audyt
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                sx={{ fontWeight: "bold", width: "220px", height: "50px", borderRadius: "10px" }}
                onClick={() => setScrollTo({ change: !scrollTo.change, name: "main" })}
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
