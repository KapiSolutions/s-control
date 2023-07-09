import React from "react";
import { Box, Stack, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import ContentHeader from "../ContentHeader";
import Image from "next/image";
import logos from "../../../public/img/sections/dotationSection/logos.webp";
import Link from "next/link";

const Dotation = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const styles = {
    circleBox: {
      width: "230px",
      height: "230px",
      // backgroundColor: "text.primary",
      backgroundColor: "primary.main",
      display: "flex",
      alignItems: "center",
      borderRadius: "50%",
      margin: "auto",
      mt: 4,
    },
    rectBox: {
      width: isMobile ? "95%" : "70%",
      minWidth: "300px",
      height: "fit-content",
      p: 2,
      mt: 7,
      mr: 0,
      ml: "auto",
      backgroundColor: "rgba(0, 21, 37, 0.65)",
      color: "#f1f1f1",
      borderBottom: "8px solid white",
      borderRadius: "2px",
    },
    rectOrangeBox: {
      width: isMobile ? "95%" : "100%",
      minWidth: "300px",
      height: "fit-content",
      p: 2,
      mt: 4,
      backgroundColor: "primary.main",
    },
  };
  const dotationItem = (price: string, detail: string) => {
    return (
      <Typography variant="h6">
        <b>{price} zł</b>{" "}
        <Typography variant="body1" component="span">
          na {detail}
        </Typography>
      </Typography>
    );
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        minHeight: "110vh",
        backgroundImage: "url('/img/sections/dotationSection/house.webp')",
      }}
    >
      <Container sx={{ mt: 8 }}>
        <Box>
          <ContentHeader primary="Dotacje Mój Prąd 5.0" secondary="Formalnośći załatwimy za Ciebie!" />
        </Box>
      </Container>

      <Stack sx={styles.rectBox} spacing={1}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          Uzyskaj nawet:
        </Typography>
        {dotationItem("19 400", "Pompy ciepła")}
        {dotationItem("7 000", "Instalacje Fotowoltaiczne")}
        {dotationItem("5 000", "Magazyny ciepła")}
        {dotationItem("3 000", "Systemy HEMS")}
      </Stack>

      {/* <Box sx={styles.circleBox}>
        <Typography variant="h5" sx={{ textTransform: "uppercase", fontWeight: "bold", textAlign: "center" }}>
          Formalnośći załatwimy za Ciebie!
        </Typography>
      </Box> */}

      <Box sx={{ position: "absolute", bottom: 0, width: "100%", opacity: 0.95 }}>
        <Container sx={styles.rectOrangeBox}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Masz pytania? Zadzwoń do nas!
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
            <Link href="tel:730530556">730 530 556</Link>
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <Link href="tel:608687664">608 687 664</Link>
          </Typography>
        </Container>
        <Box sx={{ position: "relative", width: "100%", height: "60px", backgroundColor: "common.white" }}>
          <Image src={logos} alt="Fundusze unijne" fill style={{ objectFit: "contain" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dotation;
