import React, { useState } from "react";
import { Box, Grid, Stack, Typography, useTheme, useMediaQuery, Button, Divider } from "@mui/material";
import type { Realization } from "@/utils/schema/realization";
import ContentHeader from "./ContentHeader";
import Image from "next/image";
import BoltIcon from "@mui/icons-material/Bolt";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import PowerIcon from "@mui/icons-material/Power";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import AppsIcon from "@mui/icons-material/Apps";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ImageGallery from "./ImageGallery";
import Link from "next/link";

//Define Types
type Props = {
  realization: Realization;
  prevID?: string;
  nextID?: string;
};

const RealizationOverview = ({ realization, prevID, nextID }: Props): JSX.Element => {
  const [show, setShow] = useState(-1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  // Grid items on the top of the project overview
  const topSegment = (icon: JSX.Element, title: string, content: string | JSX.Element): JSX.Element => {
    if (isMobile) {
      return (
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1} alignItems="top">
          {icon}
          <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap" sx={{ maxWidth: "85%" }}>
            <Typography variant="body2" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </Stack>
          <Box sx={{ width: "100%", height: "1px", backgroundColor: "text.disabled", mt: 1, opacity: 0.3 }}></Box>
        </Stack>
      );
    }

    return (
      <Grid container alignItems="top">
        <Grid item xs={4} sm={4}>
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon} <span style={{ marginLeft: 8 }}>{title}</span>
          </Typography>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Typography variant="body2">{content}</Typography>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box>
      <ContentHeader primary={realization.title} secondary={realization.atrLocalization} />
      <Stack spacing={2} sx={{ mt: 2 }}>
        {realization.atrType &&
          topSegment(
            <AppsIcon sx={{ color: "primary.main" }} />,
            isMobile ? "Typ" : "Rodzaj instalacji",
            realization.atrType
          )}
        {realization.atrPower &&
          topSegment(
            <PowerIcon sx={{ color: "primary.main" }} />,
            isMobile ? "Moc" : "Moc instalacji",
            realization.atrPower
          )}
        {realization.atrPanels &&
          topSegment(
            <SolarPowerIcon sx={{ color: "primary.main" }} />,
            isMobile ? "Panele" : "Panele fotowoltaiczne",
            realization.atrPanels
          )}
        {realization.atrInverter &&
          topSegment(<BoltIcon sx={{ color: "primary.main" }} />, "Falownik", realization.atrInverter)}
        {realization.atrPump &&
          topSegment(
            <LocalFireDepartmentIcon sx={{ color: "primary.main" }} />,
            isMobile ? "Pompa" : "Pompa ciepła",
            realization.atrPump
          )}
        {realization.atrBattery &&
          topSegment(
            <BatteryChargingFullIcon sx={{ color: "primary.main" }} />,
            isMobile ? "Magazyn" : "Magazyn energii",
            realization.atrBattery
          )}
      </Stack>
      <Box sx={{ position: "relative", width: "100%", height: "300px", mt: 3 }}>
        <Image
          src={realization.mainImage}
          fill
          alt={realization.title}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 100vw, 85vw"
        />
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
          {/* <Typography variant="body1" sx={{ mt: 2, ml: 1 }}>
            Zdjęcia:
          </Typography> */}
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2} sx={{ mt: 2 }}>
            {realization.images?.split("\n").map((url, idx) => (
              <Box
                key={idx}
                sx={{
                  position: "relative",
                  width: isMobile ? "100%" : "250px",
                  height: "200px",
                }}
                className={isMobile ? "" : "pointer zoom"}
                onClick={() => setShow(idx)}
              >
                <Image
                  src={url}
                  fill
                  alt={`S-control Instalacje fotowoltaiczne ${realization.atrLocalization}`}
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  sizes="(max-width: 600px) 100vw, 33vw"
                />
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Hash tags */}
      <Divider orientation="horizontal" sx={{ mt: 2 }} />
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        spacing={2}
        justifyContent={isMobile ? "center" : "left"}
        sx={{ mt: 2 }}
      >
        {realization.tags?.split(" ").map((tag, idx) => (
          <Typography variant="body2" key={idx}>
            #{tag.trim()}
          </Typography>
        ))}
      </Stack>
      <Stack
        direction="row"
        component="nav"
        spacing={isMobile ? 1 : 6}
        mt={6}
        alignItems="center"
        justifyContent={isMobile ? "space-evenly" : "center"}
      >
        <Link
          href={{
            pathname: "/realizacje/[pid]",
            query: { pid: prevID, name: "Realizacje" },
            hash: "main",
          }}
          passHref
        >
          <Button variant="contained" startIcon={<KeyboardDoubleArrowLeftIcon />}>
            Poprzedni
          </Button>
        </Link>
        <BoltIcon sx={{ fontSize: 32 }} />
        <Link
          href={{
            pathname: "/realizacje/[pid]",
            query: { pid: nextID, name: "Realizacje" },
            hash: "main",
          }}
          passHref
        >
          <Button variant="contained" endIcon={<KeyboardDoubleArrowRightIcon />}>
            Następny
          </Button>
        </Link>
      </Stack>
      {!isMobile && <ImageGallery imgSet={realization.images?.split("\n")} show={show} setShow={setShow} />}
    </Box>
  );
};

export default RealizationOverview;
