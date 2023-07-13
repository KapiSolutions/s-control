import React from "react";
import { Box, Container, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";

const HeatPumps = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box component="section" sx={{ bgcolor: "layout.dark", color: "common.white", pt: 6, pb: 6 }}>
      <Container sx={{ minHeight: "100vh" }} name="HeatPumpsSection">
        <ContentHeader primary="Pompy Ciepła" secondary="Ciepło i oszczędności" />
      </Container>
    </Box>
  );
};

export default HeatPumps;
