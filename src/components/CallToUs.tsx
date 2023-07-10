import React from "react";
import { Box, Divider, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import Link from "next/link";

const CallToUs = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box sx={{ width: "100vw", bgcolor: "layout.dark", pt: 8, pb: 8 }}>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Zadzwoń do nas
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          component="p"
          color="text.darkSecondary"
          sx={{ textTransform: "uppercase" }}
        >
          Doradzimy i wycenimy najlapsze rozwiązanie dla Ciebie i Twojego domu!
        </Typography>
        <Box sx={{ width: "50%" }}>
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "layout.dividerDark",
              },
            }}
          >
            <Link href="tel:730530556">
              <CallIcon color="primary" sx={{ fontSize: 62 }} className="zoom"/>
            </Link>
          </Divider>
        </Box>
        <Typography variant="h4" component="p" sx={{ fontWeight: "bold" }} className="zoom">
          <Link href="tel:730530556">+48 730 530 556</Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default CallToUs;
