import React from "react";
import { Box, Divider, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Link from "next/link";
import { useRouter } from "next/router";

const CallToUs = (): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const style = {
    diamondShape: {
      position: "absolute",
      top: -20,
      right: isMobile ? "calc(50% - 30px)" : 60,
      bgcolor: "layout.dark",
      height: "60px",
      textAlign: "center",
      transform: "rotate(45deg)",
      width: "60px",
      borderRadius: 4,
    },
    diamondContent: {
      color: "text.dark",
      display: "table-cell",
      height: "60px",
      transform: "rotate(-45deg)",
      verticalAlign: "middle",
      width: "60px",
    },
  };

  const scrollButtonAction = () => {
    if (router.pathname === "/") {
      window.history.pushState(null, "", `/`);
      window.scrollTo(0, 0);
    } else {
      router.push("/");
    }
  };
  return (
    <Box sx={{ position: "relative", width: "100vw", bgcolor: "layout.dark", pt: 10, pb: 10 }}>
      <Box sx={style.diamondShape}>
        <Box sx={style.diamondContent} className="pointer Hover" onClick={scrollButtonAction}>
        <KeyboardDoubleArrowUpIcon sx={{fontSize: 32 }} />
        </Box>
      </Box>

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
              <CallIcon color="primary" sx={{ fontSize: 62 }} className="zoom" />
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
