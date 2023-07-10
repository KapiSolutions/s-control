import React from "react";
import { Box, Container, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";

const AboutUs = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box component="section">
      <Container sx={{ minHeight: "100vh" }} name="AboutUsSection">
        <ContentHeader primary="O nas" secondary="Poznaj S-control" />
      </Container>
    </Box>
  );
};

export default AboutUs;
