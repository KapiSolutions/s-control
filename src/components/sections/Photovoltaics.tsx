import React from "react";
import { Box, Container, Paper, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";


const Photovoltaics = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });


  return (
    <Container sx={{minHeight: "100vh"}} name="PhotovoltaicsSection">
      <ContentHeader primary="Instalacje Fotowoltaiczne" secondary="Zielona energia dla Twojego domu" />
     

    </Container>
  );
};

export default Photovoltaics;
