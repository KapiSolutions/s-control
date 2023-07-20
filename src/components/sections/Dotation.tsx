import React, { useRef } from "react";
import { Box, Stack, Typography, Container, useTheme, useMediaQuery, Slide } from "@mui/material";
import ContentHeader from "../ContentHeader";
import Image from "next/image";
import euLogoDotation from "../../../public/img/sections/dotation/logos.webp";
import mojPradSvg from "../../../public/svg/mojprad-logo.svg";
import Link from "next/link";
import useIsVisible from "@/utils/hooks/useIsVisible";

const Dotation = (): JSX.Element => {
  const itemRef = useRef(null);
  const item2Ref = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const itemVisible = useIsVisible(itemRef);
  const item2Visible = useIsVisible(item2Ref);

  const styles = {
    rectBox: {
      width: isMobile ? "95%" : "70%",
      minWidth: "300px",
      p: 2,
      mr: 0,
      ml: "auto",
      backgroundColor: "rgba(0, 21, 37, 0.65)",
      color: "#f1f1f1",
      // borderBottom: "8px solid white",
      borderRadius: "2px",
    },
    rectOrangeBox: {
      width: isMobile ? "95%" : "100%",
      p: 2,
      backgroundColor: "primary.main",
    },
  };
  const dotationItem = (price: string, detail: string) => {
    return (
      <Typography variant="h6" component="p">
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
        width: "100vw",
        backgroundImage: "url('/img/sections/dotation/house.webp')",
        backgroundSize: "cover",
      }}
      component="section"
    >
      <Container sx={{ mt: 8 }}>
        <Box>
          <ContentHeader primary="Dotacje Mój Prąd 5.0" secondary="Nie czekaj, skorzystaj już dziś!" />
        </Box>
      </Container>
      <Stack spacing={4}>
        <Box ref={itemRef}>
          <Slide direction="left" in={itemVisible} container={itemRef.current} timeout={500}>
            <Stack sx={styles.rectBox} spacing={1}>
              <Typography variant="h5" component="p" sx={{ fontWeight: "bold", mb: 1 }}>
                Uzyskaj nawet:
              </Typography>
              {dotationItem("19 400", "Pompe ciepła")}
              {dotationItem("16 000", "Magazyn energii")}
              {dotationItem("7 000", "Instalacje fotowoltaiczną")}
              {dotationItem("5 000", "Magazyn ciepła")}
              {dotationItem("3 000", "System HEMS")}
              <Box pt={2}>
                <Box sx={{ width: "50%", height: "2px", backgroundColor: "primary.main", mb: 2 }}></Box>
                <Typography variant="h5" component="p" sx={{ textTransform: "uppercase", fontWeight: "bold", mb: 1 }}>
                  Formalności załatwimy za Ciebie! &#128221;
                </Typography>
              </Box>
            </Stack>
          </Slide>
        </Box>

        <Box sx={{ width: "100%" }} ref={item2Ref}>
          <Slide direction="up" container={item2Ref.current} in={item2Visible} timeout={500}>
            <Container sx={styles.rectOrangeBox}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" component="p" sx={{ fontWeight: "bold" }}>
                    Masz pytania? Zadzwoń do nas!
                  </Typography>
                  <Typography variant="h6" component="p" sx={{ fontWeight: "bold", mt: 1 }}>
                    <Link href="tel:730530556" aria-label="S-control Telephone">
                      730 530 556
                    </Link>
                  </Typography>
                  <Typography variant="h6" component="p" sx={{ fontWeight: "bold" }}>
                    <Link href="tel:608687664" aria-label="S-control Telephone">
                      608 687 664
                    </Link>
                  </Typography>
                </Box>
                {!isMobile && (
                  <Box sx={{ position: "relative", height: "80px", width: "300px", opacity: 1 }}>
                    <Image
                      src={mojPradSvg}
                      fill
                      alt="s-control mój prąd dotacje logo"
                      style={{ objectFit: "contain" }}
                      sizes="100vw"
                    />
                  </Box>
                )}
              </Stack>
            </Container>
          </Slide>
          <Box sx={{ position: "relative", width: "100%", height: "60px", backgroundColor: "common.white" }}>
            <Image src={euLogoDotation} alt="Fundusze unijne" fill style={{ objectFit: "contain" }} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dotation;
