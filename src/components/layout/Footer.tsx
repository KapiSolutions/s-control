import React from "react";
import Link from "next/link";
import { Container, Typography, Stack, Divider, Box, useTheme, useMediaQuery } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CallToUs from "../CallToUs";
import Logotype from "../Logotype";
import DirectionsIcon from "@mui/icons-material/Directions";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const gMapsUrl =
    "https://www.google.com/maps/dir//%C5%BBarnowiec+119,+38-460+%C5%BBarnowiec/@49.7051489,21.1001723,9z/data=!4m8!4m7!1m0!1m5!1m1!1s0x473c495f118269cb:0xcd02dadc7a7f2822!2m2!1d21.6630658!2d49.693944?entry=ttu";

  return (
    <Box sx={{ bgcolor: "layout.dark", color: "text.dark" }} name="footer" component="footer">
      <CallToUs />
      <Container sx={{ mb: 4 }}>
        <Stack spacing={isMobile ? 4 : 1} alignItems={isMobile ? "center" : "left"}>
          <Logotype size={42} />
          <Typography
            variant="body1"
            component="p"
            color="text.darkSecondary"
            textAlign={isMobile ? "center" : "left"}
            sx={{ textTransform: "uppercase" }}
          >
            Fotowoltaika | Pompy Ciepła | Magazyny Energii | Systemy HEMS
          </Typography>
        </Stack>

        {/* Working hours and contact details */}
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems={isMobile ? "center" : "end"}
          justifyContent="space-between"
          px={1}
        >
          <Stack spacing={2} alignItems={isMobile ? "center" : "left"} sx={{ mt: isMobile ? 4 : 2 }}>
            <Typography
              variant="body2"
              color="text.dark"
              className="pointer"
              onClick={() => window.open(gMapsUrl, "_blank", "noopener,noreferrer")}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {!isMobile && <DirectionsIcon color="primary" />} Żarnowiec 119, 38-460 Jedlicze
            </Typography>
            <Typography variant="body2" color="text.dark" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isMobile && <EmailIcon color="primary" />}{" "}
              <Link href="mailto:biuro@s-control.net" aria-label="S-control E-mail">
                biuro@s-control.net
              </Link>
            </Typography>
            <Typography variant="body2" color="text.dark" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isMobile && <CallIcon color="primary" />}{" "}
              <Link href="tel:730530556" aria-label="S-control Telephone">
                +48 730 530 556
              </Link>
            </Typography>

            <Typography variant="body2" color="text.dark" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isMobile && <PhonePausedIcon color="primary" />}{" "}
              <Link href="tel:608687664" aria-label="S-control Telephone">
                +48 608 687 664
              </Link>
            </Typography>
          </Stack>

          {/* Working Hours */}
          <Stack spacing={1} alignItems={isMobile ? "center" : "right"} sx={{ mt: isMobile ? 4 : 0 }}>
            {!isMobile && (
              <Typography variant="body1" color="text.dark" sx={{ textTransform: "uppercase" }}>
                Jesteśmy dostępni:
              </Typography>
            )}

            <Stack spacing={1} divider={<Divider flexItem sx={{ bgcolor: "layout.dividerDark" }} />}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Typography variant="body1" color="text.darkSecondary">
                  Poniedziałek - Sobota
                </Typography>
                <Typography variant="body1" color="text.darkSecondary">
                  8:00 - 16:00
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.darkSecondary">
                  Niedziela
                </Typography>
                <Typography variant="body1" color="primary.main">
                  Zamknięte
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Container sx={{ pb: 3 }}>
        <Divider orientation="horizontal" flexItem sx={{ mb: 2, bgcolor: "layout.dividerDark" }} />
        <Stack direction={isMobile ? "column-reverse" : "row"} justifyContent="space-between" alignItems="center">
          <Typography variant="caption" display="block" align="left" mt={isMobile ? 2 : 0}>
            ©{new Date().getFullYear()}{" "}
            <Link href="/" className="Hover" aria-label="S-control Web site">
              S-control.
            </Link>{" "}
            Wszelkie prawa zastrzeżone.
            {!isMobile && (
              <>
                {" "}
                Projekt strony:{" "}
                <Link
                  href="https://kapisolutions.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Hover"
                  aria-label="Kapisolutions Web site"
                >
                  Kapisolutions.
                </Link>
              </>
            )}
          </Typography>
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: "text.darkSecondary" }} />}
            component="nav"
          >
            <Link
              href="https://www.facebook.com/scontrol1"
              target="_blank"
              rel="noopener noreferrer"
              passHref
              style={{ display: "flex", alignItems: "center", gap: 2 }}
              className="Hover"
              aria-label="S-control Facebook profile"
            >
              <FacebookIcon fontSize="small" /> <Typography variant="caption">Facebook</Typography>
            </Link>
            <Link
              href="mailto:biuro@s-control.net"
              className="Hover"
              style={{ display: "flex", alignItems: "center", gap: 2 }}
              aria-label="S-control E-mail"
            >
              <AlternateEmailIcon fontSize="small" /> <Typography variant="caption">E-mail</Typography>
            </Link>
          </Stack>
        </Stack>
        {isMobile && (
          <Typography variant="caption" display="block" align="center" mt={1}>
            Projekt strony:{" "}
            <Link href="https://kapisolutions.vercel.app" target="_blank" rel="noopener noreferrer" className="Hover">
              Kapisolutions.
            </Link>
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
