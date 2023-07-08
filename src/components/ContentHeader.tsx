import React from "react";
import { Box, Stack, Typography } from "@mui/material";

// Define types
type Props = {
  primary: string;
  secondary: string;
};

const ContentHeader = ({ primary, secondary }: Props): JSX.Element => {
  return (
    <Stack direction="row" spacing={2} sx={{mb:4}}>
      <Box sx={{ position: "relative", width: "8px", minHeight: "100%", backgroundColor: "primary.main" }}></Box>
      <Box>
        <Typography variant="h4" component="h1" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          {primary}
        </Typography>
        <Typography variant="body1" sx={{opacity: 0.8}}>{secondary}</Typography>
      </Box>
    </Stack>
  );
};

export default ContentHeader;
