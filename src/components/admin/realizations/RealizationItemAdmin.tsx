import React, { useCallback, useState } from "react";
import axios from "axios";
import { useSnackbar, VariantType } from "notistack";
import {
  Button,
  Grid,
  Stack,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import type { Realization } from "@/utils/schema/realization";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";

//Define Types
type Props = {
  realization: Realization;
};

const RealizationItemAdmin = ({ realization }: Props): JSX.Element => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, seLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const realizationDate = realization.realizationDate ? new Date(realization.realizationDate).toLocaleDateString() : "";
  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // Show snackbar on success or error
  const showSnackBar = useCallback(
    (variant: VariantType, message: string) => {
      enqueueSnackbar(message, {
        variant: variant,
        action: (key) => (
          <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </Button>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );
  const deleteItem = async () => {
    seLoading(true);
    setOpenDialog(false);
    try {
      // showSnackBar("default", "Deleting...");
      await axios.delete(`/api/db/delete-by-id/?dbName=Data&collectionName=Realizations&id=${realization._id}`);
      showSnackBar("success", "Projekt pomyślnie usunięty!");
      const revalidateData = {
        paths: ["/", `/realizacje/${realization._id}`],
      };
      await axios.post("/api/revalidate/", revalidateData);
      showSnackBar("success", "Rewalidacja zakońoczna!");
      router.reload();
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("error", "Ups! Coś poszło nie tak");
    } finally {
      seLoading(false);
    }
  };

  return (
    <>
      <Stack direction="column" spacing={3}>
        <Grid container spacing={2} wrap="nowrap" direction="row" justifyContent="center">
          <Grid item xs={9} sm={5} lg={9}>
            <Typography variant="body1">{realization.title}</Typography>
          </Grid>

          {isMobile ? null : (
            <Grid item sm={3} lg={1}>
              <Typography variant="body1">{realizationDate}</Typography>
            </Grid>
          )}

          <Grid item xs={3} sm={4} lg={2}>
            <Stack direction="row" spacing={3}>
              {isMobile ? null : (
                <Button variant="outlined" size="small" color="error" onClick={handleOpen}>
                  Usuń
                </Button>
              )}

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  if (!redirecting) {
                    router.push({
                      pathname: "/admin/realizations/[pid]",
                      query: { pid: realization._id },
                      hash: "main",
                    });
                  }
                  setRedirecting(true);
                }}
              >
                {redirecting ? <CircularProgress color="inherit" size={18} /> : "Edytuj"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" flexItem />
      </Stack>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Potwierdź operację</DialogTitle>
        <DialogContent>
          <DialogContentText>Na pewno chcesz usunąć ten projekt?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Anuluj
          </Button>
          <Button onClick={deleteItem} variant="contained" autoFocus>
            Usuń
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default RealizationItemAdmin;
