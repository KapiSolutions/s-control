import React from "react";
import { Box, Grid, Stack, Typography, useTheme, useMediaQuery, Container, Divider } from "@mui/material";
import type { Realization } from "@/utils/schema/realization";
import ContentHeader from "./ContentHeader";
import Image from "next/image";
import SegmentIcon from "@mui/icons-material/Segment";
import LightModeIcon from "@mui/icons-material/LightMode";
import BoltIcon from "@mui/icons-material/Bolt";
import CableIcon from "@mui/icons-material/Cable";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import PowerIcon from "@mui/icons-material/Power";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import AppsIcon from "@mui/icons-material/Apps";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

//Define Types
type Props = {
  realization: Realization;
};

const RealizationOverview = ({ realization }: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  // Grid items on the top of the project overview
  const topSegment = (icon: JSX.Element, title: string, content: string | JSX.Element): JSX.Element => {
    return (
      <Grid container alignItems="top">
        <Grid item xs={2} sm={3}>
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              opacity: 0.65,
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon} {isMobile ? null : <span style={{ marginLeft: 8 }}>{title}</span>}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={7}>
          <Typography variant="body2">{content}</Typography>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box>
      <ContentHeader primary={realization.title} secondary={realization.atrLocalization} />
      <Stack spacing={2} sx={{ mt: 2 }}>
        {realization.atrType && topSegment(<AppsIcon />, "Rodzaj instalacji", realization.atrType)}
        {realization.atrPower && topSegment(<PowerIcon />, "Moc instalacji", realization.atrPower)}
        {realization.atrPanels && topSegment(<SolarPowerIcon />, "Panele fotowoltaiczne", realization.atrPanels)}
        {realization.atrInverter && topSegment(<BoltIcon />, "Falownik", realization.atrInverter)}
        {realization.atrPump && topSegment(<LocalFireDepartmentIcon />, "Pompa ciepła", realization.atrPump)}
        {realization.atrBattery && topSegment(<BatteryChargingFullIcon />, "Magazyn energii", realization.atrBattery)}
      </Stack>
      <Box sx={{ position: "relative", width: "100%", height: "300px", mt: 3 }}>
        <Image src={realization.mainImage} fill alt={realization.title} style={{ objectFit: "cover" }} />
      </Box>
      {/* Description */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" component="h2">
          Opis
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, ml: 1 }}>
          {realization.description}
        </Typography>
      </Box>
      {/* Images */}
      {realization.images != "" && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mt: 2, ml: 1 }}>
            Zdjęcia:
          </Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2} sx={{ mt: 2, ml: 1 }}>
            {realization.images?.split("\n").map((url, idx) => (
              <Box
                key={idx}
                sx={{
                  position: "relative",
                  width: isMobile ? "100%" : "250px",
                  height: "200px",
                }}
              >
                <Image
                  src={url}
                  fill
                  alt={`S-control Instalacje fotowoltaiczne ${realization.atrLocalization}`}
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Hash tags */}
      <Divider orientation="horizontal" sx={{ mt: 2 }} />
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2} sx={{ mt: 2 }}>
        {realization.tags?.split(" ").map((tag, idx) => (
          <Typography variant="body2" key={idx}>
            #{tag.trim()}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};

export default RealizationOverview;
