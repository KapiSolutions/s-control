import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import svg from "../../public/svg/spark.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Image from "next/image";

// Define types
type Props = {
  size?: number;
  weight?: string;
};

const Logotype = ({ size = 42, weight = "normal" }: Props): JSX.Element => {
    const wDiv = weight === "normal" ? 2.4 : 2.5;
  return (
    <Stack direction="row" alignItems="center" sx={{height: size, pt:1}}>
      <Typography variant="h1" component="p" sx={{ fontSize: size, fontWeight: weight, letterSpacing: 1}}>
        S-c
      </Typography>
      <Box sx={{ position: "relative", height: size / 1.8, width: size / wDiv}}>
        <Image src={svg} fill alt="spark s-control logo" style={{ objectFit: "contain" }} />
      </Box>
      <Typography variant="h1" component="p" sx={{ fontSize: size, fontWeight: weight, letterSpacing: 1}}>
        ntrol
      </Typography>
    </Stack>
  );
};

export default Logotype;
