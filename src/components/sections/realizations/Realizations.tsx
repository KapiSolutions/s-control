import React from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Realizations } from "@/utils/schema/realization";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import ContentHeader from "@/components/ContentHeader";
import Logotype from "@/components/Logotype";

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
    <Box sx={{ width: "100vw", pb: isMobile ? 0 : 0 }} name="Realizacje" component="section">
      <Container>
        <Box>
          <ContentHeader primary="Nasze realizacje" secondary="Dołącz do grona zadowolonych klientów" />
        </Box>

        {realizations.length > 0 ? (
          <Box>
            {isMobile ? <MobileView realizations={realizations} /> : <DesktopView realizations={realizations} />}
          </Box>
        ) : null}

        <Box sx={{ opacity: 0.2, display: "flex", justifyContent: "center", mt: 4, filter: "grayscale(1)" }}>
          <Logotype size={isMobile ? 80 : 100} weight="bold" />
        </Box>
      </Container>
    </Box>
  );
};

export default Realizations;
