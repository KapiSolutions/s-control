import React from "react";
import { Box, Container, Paper, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";


const AboutUs = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });


  return (
    <Container sx={{minHeight: "100vh"}} name="AboutUsSection">
      <ContentHeader primary="O nas" secondary="Poznaj S-control" />
     

    </Container>
  );
};

export default AboutUs;
