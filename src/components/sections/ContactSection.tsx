import React from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import ContentHeader from "../ContentHeader";
import ContactForm from "../ContactForm";

const ContactSection = (): JSX.Element => {
  return (
    <Container name="ContactSection">
      <ContentHeader primary="Szybki kontakt" secondary="Skorzystaj z naszego formularza" />
      <Stack alignItems="center">
        <ContactForm />
      </Stack>
    </Container>
  );
};

export default ContactSection;
