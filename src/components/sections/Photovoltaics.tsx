import React from "react";
import { Box, Container, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";

const Photovoltaics = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Container sx={{ minHeight: "100vh" }} name="PhotovoltaicsSection">
        <ContentHeader primary="Instalacje Fotowoltaiczne" secondary="Zielona energia dla Twojego domu" />
      </Container>
    </Box>
  );
};

export default Photovoltaics;
