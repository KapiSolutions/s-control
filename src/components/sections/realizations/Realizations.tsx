import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Realizations } from "@/utils/schema/realization";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
// import TechCarousel from "./TechCarousel";

//Define Types
type Props = {
  realizations: Realizations;
};

const Realizations = ({ realizations }: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box sx={{ width: "100vw", minHeight: "90vh" }} name="realizationsSection" component="section">
      <Container sx={{ minHeight: "70vh" }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase", mb: isMobile ? 2 : 1, mt: 1 }}>
          section name
        </Typography>
        {realizations.length > 0 ? (
          <Box>
            {isMobile ? <MobileView realizations={realizations} /> : <DesktopView realizations={realizations} />}
          </Box>
        ) : null}
      </Container>

      {/* <TechCarousel /> */}
    </Box>
  );
};

export default Realizations;
