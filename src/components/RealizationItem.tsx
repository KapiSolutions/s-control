import React, { useState } from "react";
import {
  Box,
  Skeleton,
  Backdrop,
  Chip,
  Badge,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

//Define Types
import type { Realization } from "@/utils/schema/realization";
import { useRouter } from "next/router";

type Props = {
  realization: Realization | null;
};

//Styles
const styles = {
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
};

const RealizationItem = ({ realization }: Props): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  if (!realization) {
    return <></>;
  }

  return (
    <>
      <Paper
        elevation={1}
        sx={{ p: 2, borderRadius: 2, height: "310px", overflow: "hidden" }}
        className={isMobile ? "" : "pointer zoom"}
        onClick={() => {
          if (!redirecting) {
            router.push({
              pathname: "/realizations/[pid]",
              query: { pid: realization._id },
              hash: "main",
            });
          }
          setRedirecting(true);
        }}
      >
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" width="100%" height={150} style={{ borderRadius: 4 }} />
            <Skeleton variant="text" width="50%" height={34} sx={{ mt: 2 }} />
            <Skeleton variant="text" width="75%" height={12} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="75%" height={12} sx={{ mt: 1 }} />
            <Skeleton variant="text" height={24} sx={{ mt: 1 }} />
          </Box>
        ) : null}
        <Box sx={{ position: "relative", width: "100%", height: 150 }}>
          <Image
            onLoadingComplete={() => setLoading(false)}
            src={realization.mainImage}
            alt={realization.title}
            fill
            style={{ objectFit: "cover", borderRadius: 4, opacity: loading ? 0 : 1 }}
            sizes="(max-width: 600px) 90vw, (max-width: 900px) 50vw, 33vw"
          />
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {realization.title}
        </Typography>

        <Typography variant="body2" sx={styles.description} component="div">
          {realization.description}
        </Typography>
      </Paper>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={redirecting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default RealizationItem;
