import React from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Realizations } from "@/utils/schema/realization";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import ContentHeader from "@/components/ContentHeader";

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
    <Box
      sx={{ width: "100vw", pt: isMobile ? 0 : 6, pb: isMobile ? 0 : 6 }}
      name="Realizacje"
      component="section"
    >
      <Container>
        <Box>
          <ContentHeader primary="Nasze realizacje" secondary="Dołącz do grona zadowolonych klientów" />
        </Box>

        {realizations.length > 0 ? (
          <Box>
            {isMobile ? <MobileView realizations={realizations} /> : <DesktopView realizations={realizations} />}
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Realizations;
