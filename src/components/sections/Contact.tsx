import React, { useState } from "react";
import { Box, Stack, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import { osm } from "pigeon-maps/providers";
import { stamenTerrain } from "pigeon-maps/providers";
import ContentHeader from "../ContentHeader";
import ContactForm from "../ContactForm";
import { Overlay, Marker } from "pigeon-maps";
import Image from "next/image";
import arrow from "../../../public/img/sections/contact/arrow.png";

const DynamicMap = dynamic(() => import("pigeon-maps").then((module) => module.Map) as any, {
  ssr: false, // Disable server-side rendering
});
const MapWrapper = ({ children, ...props }: any) => {
  return <DynamicMap {...props}>{children}</DynamicMap>;
};

const Contact = (): JSX.Element => {
  const [zoom, setZoom] = useState(8);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });
  const gMapsUrl =
    "https://www.google.com/maps/dir//%C5%BBarnowiec+119,+38-460+%C5%BBarnowiec/@49.7051489,21.1001723,9z/data=!4m8!4m7!1m0!1m5!1m1!1s0x473c495f118269cb:0xcd02dadc7a7f2822!2m2!1d21.6630658!2d49.693944?entry=ttu";
  return (
    <Box sx={{ maxWidth: "100vw" }} component="section">
      <Container name="ContactSection">
        <ContentHeader primary="Szybki kontakt" secondary="Skorzystaj z naszego formularza" />
        <Stack alignItems="center" justifyContent="center" direction={isMobile ? "column" : "row"}>
          <ContactForm />
          <Box sx={{ width: isMobile ? "100%" : "50%", ml: isMobile ? 0 : 5, mt: isMobile ? 4 : 0 }}>
            <MapWrapper
              provider={osm}
              height={280}
              defaultCenter={[49.85, 21.4]}
              metaWheelZoom={true}
              zoom={zoom}
              maxZoom={14}
              animate={false}
              onBoundsChanged={({ zoom }: { zoom: number }) => {
                setZoom(zoom);
              }}
            >
              <Marker
                width={50}
                color="orange"
                anchor={[49.694, 21.663]}
                onClick={() => window.open(gMapsUrl, "_blank", "noopener,noreferrer")}
              />
              {zoom === 8 && (
                <Overlay anchor={[49.98, 21.2]} offset={[120, 79]}>
                  <Box sx={{ position: "relative", width: "200px", height: "200px" }}>
                    <Image src={arrow} fill alt="Tu jesteśmy" style={{ objectFit: "contain" }} />
                  </Box>
                </Overlay>
              )}
            </MapWrapper>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
