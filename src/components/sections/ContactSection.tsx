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

const ContactSection = (): JSX.Element => {
  const [zoom, setZoom] = useState(8);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });
  return (
    <Container name="ContactSection" sx={{minWidth: "98vw"}}>
      <ContentHeader primary="Szybki kontakt" secondary="Skorzystaj z naszego formularza" />
      <Stack alignItems="center" justifyContent="center"direction={isMobile ? "column" : "row"} >
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
            <Marker width={50} color="orange" anchor={[49.694, 21.663]} />
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
  );
};

export default ContactSection;
