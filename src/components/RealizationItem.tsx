import React, { useState } from "react";
import { useRouter } from "next/router";
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
import type { Realization } from "@/utils/schema/realization";
import PowerIcon from "@mui/icons-material/Power";
import PlaceIcon from "@mui/icons-material/Place";

//Define Types
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
  header: {
    marginTop: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
};

const RealizationItem = ({ realization }: Props): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  if (!realization) {
    return <></>;
  }

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, borderRadius: 2, height: "310px", overflow: "hidden" }}
      className={isMobile ? "" : "pointer zoom"}
      onClick={() => {
        router.push({
          pathname: "/realizacje/[pid]",
          query: { pid: realization._id, name: "Realizacje" },
          hash: "main",
        });
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
      <Typography variant="h6" component="h2" sx={styles.header}>
        {realization.title}
      </Typography>

      <Typography variant="body2" sx={styles.description} component="div">
        {realization.description}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Chip icon={<PowerIcon />} label={realization.atrPower} />
        <Chip icon={<PlaceIcon />} label={realization.atrLocalization} />
      </Stack>
    </Paper>
  );
};

export default RealizationItem;
