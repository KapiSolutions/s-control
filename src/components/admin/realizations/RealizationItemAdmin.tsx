import React, { useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSnackbar, VariantType } from "notistack";
import {
  Button,
  Grid,
  Box,
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
  IconButton,
} from "@mui/material";
import type { Realization } from "@/utils/schema/realization";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Define Types
type Props = {
  realization: Realization;
};

const RealizationItemAdmin = ({ realization }: Props): JSX.Element => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
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
        <Grid container wrap="nowrap" direction="row" alignItems="center" justifyContent="space-between">
          <Grid item xs={10} sm={8} md={5} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1} onClick={() => setShowDetails(!showDetails)} className="pointer">
              <Box sx={{ position: "relative", height: "50px", width: "50px" }}>
                <Image
                  src={realization.mainImage}
                  alt={realization.title}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </Box>
              <Typography variant="body1">{realization.title}</Typography>
            </Stack>
          </Grid>

          {isMobile ? (
            <Grid item xs={2} sm={2} sx={{ textAlign: "center" }}>
              <IconButton className="pointer" onClick={() => setShowDetails(!showDetails)}>
                <ArrowForwardIosIcon sx={{ transform: `rotate(${showDetails ? "-90" : "0"}deg)` }} />
              </IconButton>
            </Grid>
          ) : (
            <>
              <Grid item md={2}>
                <Typography variant="body1">{realization.atrLocalization}</Typography>
              </Grid>
              <Grid item md={2}>
                <Typography variant="body1">{realizationDate}</Typography>
              </Grid>

              <Grid item xs={6} sm={4} md={3}>
                <Stack direction="row" spacing={3}>
                  <Button variant="outlined" size="small" color="error" onClick={handleOpen}>
                    Usuń
                  </Button>
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
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? "Zwiń" : "Rozwiń"}
                  </Button>
                </Stack>
              </Grid>
            </>
          )}
        </Grid>

        {showDetails ? (
          <Box mt={2}>
            {isMobile && (
              <Stack spacing={1}>
                <Typography variant="body2">Data realizacji: {realizationDate}</Typography>
                <Typography variant="body2">Miejsce: {realization.atrLocalization}</Typography>
              </Stack>
            )}

            <Typography variant="body1" mt={isMobile ? 2 : 0} sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
              Dane Klienta
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} mt={1} spacing={isMobile ? 1 : 2} flexWrap="wrap" useFlexGap>
              <Typography variant="body2">Imię i nazwisko: {realization.prvClientName}</Typography>
              <Typography variant="body2">Adres: {realization.prvClientAddress}</Typography>
              <Typography variant="body2">E-mail: {realization.prvClientEmail}</Typography>
              <Typography variant="body2">Telefon: {realization.prvClientTelephone}</Typography>
              <Typography variant="body2" sx={{width: "100%"}}>Uwagi: {realization.prvComments}</Typography>
            </Stack>
            {isMobile && (
              <Stack direction="row" mt={4} justifyContent="space-between" alignItems="center">
              <Button variant="outlined" size="small" color="error" onClick={handleOpen} startIcon={<DeleteIcon />}>
                Usuń
              </Button>
              <Button
                variant="contained"
                // size="small"
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
                startIcon={<EditIcon />}
              >
                {redirecting ? <CircularProgress color="inherit" size={18} /> : "Edytuj"}
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<KeyboardArrowUpIcon />}
                onClick={() => setShowDetails(!showDetails)}
              >
                Zwiń
              </Button>
            </Stack>
            )}
            
          </Box>
        ) : (
          <></>
        )}

        <Divider orientation="horizontal" flexItem />
      </Stack>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{
          ".MuiPaper-root": {
            padding: 1,
          },
        }}
      >
        <DialogTitle>Potwierdź operację</DialogTitle>
        <DialogContent>
          <DialogContentText>Na pewno chcesz usunąć ten projekt?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mr: 1 }}>
            Anuluj
          </Button>
          <Button onClick={deleteItem} variant="contained" color="error" startIcon={<DeleteIcon />}>
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
