import React from "react";
import Link from "next/link";
import { Container, Typography, Stack, Divider, useTheme, useMediaQuery } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Container name="footer" component="footer" sx={{ pb: 3 }}>
      <Divider orientation="horizontal" flexItem sx={{ mb: 3 }} />
      <Stack direction={isMobile ? "column-reverse" : "row"} justifyContent="space-between" alignItems="center">
        <Typography variant="caption" display="block" align="left" mt={isMobile ? 2 : 0}>
          ©{new Date().getFullYear()} S-Control. Wszelkie prawa zastrzeżone.
        </Typography>
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          component="nav"
        >
          <Link
            href="https://www.facebook.com/scontrol1"
            target="_blank"
            rel="noopener noreferrer"
            passHref
            style={{ display: "flex", alignItems: "center", gap: 2 }}
            className="Hover"
          >
            <FacebookIcon fontSize="small" /> <Typography variant="caption">Facebook</Typography>
          </Link>
          <Link
            href="mailto:biuro@s-control.net"
            className="Hover"
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <AlternateEmailIcon fontSize="small" /> <Typography variant="caption">E-mail</Typography>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;
