import React, { useRef } from "react";
import { Box, Container, Stack, Typography, useTheme, useMediaQuery, Zoom } from "@mui/material";
import ContentHeader from "../ContentHeader";
import useIsVisible from "@/utils/hooks/useIsVisible";
import Image from "next/image";
import img1 from "../../../public/img/sections/photovoltaics/img2.webp";
import img2 from "../../../public/img/sections/photovoltaics/img3.webp";

const Photovoltaics = (): JSX.Element => {
  const itemRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const itemVisible = useIsVisible(itemRef);
  return (
    <Box component="section">
      <Container sx={{ minHeight: "100vh" }} name="PhotovoltaicsSection">
        <ContentHeader primary="Instalacje Fotowoltaiczne" secondary="Zielona energia dla Twojego domu" />
        <Stack
          direction="row"
          spacing={isMobile ? 2 : 4}
          alignItems="center"
          justifyContent="center"
          useFlexGap
          flexWrap="wrap"
          ref={itemRef}
        >
          <Zoom in={itemVisible} timeout={500}>
            <Box
              sx={{
                position: "relative",
                height: isMobile ? "330px" : "500px",
                width: isMobile ? "98%" : "45%",
                minWidth: isMobile ? "auto" : "350px",
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
            </Box>
          </Zoom>
          <Box sx={{ width: isMobile ? "100%" : "50%" }}>
            <Typography variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Photovoltaics;
