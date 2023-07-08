import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextField,
  Stack,
  Box,
  Container,
  useTheme,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Realization, initValues, schema } from "@/utils/schema/realization";
import { useSnackbar, VariantType } from "notistack";
import { useRouter } from "next/router";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import RealizationOverview from "@/components/RealizationOverview";

//Define Types
type Props = {
  realization: Realization | null;
};

const RealizationTemplate = ({ realization }: Props): JSX.Element => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPreview, setShowPreview] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<Realization>({
    resolver: yupResolver(schema) as Resolver<Realization>,
    defaultValues: realization ? realization : initValues,
  });
  const editMode = realization ? true : false;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enqueueSnackbar, closeSnackbar]
  );

  // Close preview on evry change of input form
  useEffect(() => {
    watch(() => setShowPreview(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  // Scroll and set focus on the error field
  useEffect(() => {
    const errArray = Object.keys(errors);
    // check for errors
    if (errArray.length > 0) {
      setShowPreview(false);
      const key = errArray[0] as keyof Realization;
      const property = errors[key];

      if (typeof property === "object" && "message" in property) {
        // single field
        document.getElementsByName(errArray[0])[0].focus();
        document.getElementsByName(errArray[0])[0].scrollIntoView({ block: "center", inline: "nearest" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const scrollDown = () => {
    document.getElementsByName("showPreviewRealizationButton")[0].scrollIntoView({ block: "start", inline: "nearest" });
  };

  const getInput = (name: keyof Realization, label: string, fullWidth = false, type = "text", rows = 3) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          if (type === "typeDate") {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                <DatePicker
                  value={value ? dayjs(value) : null}
                  onChange={(date) => onChange(date?.toDate() || null)}
                  label={label}
                  slotProps={{
                    textField: {
                      name: name,
                      fullWidth: fullWidth,
                      variant: "outlined",
                      error: Boolean(errors[name]),
                      helperText: errors[name]?.message,
                      margin: isMobile ? "normal" : "dense",
                    },
                  }}
                />
              </LocalizationProvider>
            );
          } else {
            return (
              <TextField
                name={name}
                helperText={Boolean(errors[name]) ? errors[name]?.message : undefined}
                error={Boolean(errors[name])}
                onChange={onChange}
                value={value || ""}
                label={label}
                margin={isMobile ? "normal" : "dense"}
                disabled={loading}
                fullWidth={fullWidth}
                multiline={type === "typeArea"}
                minRows={rows}
              />
            );
          }
        }}
      />
    );
  };

  // Convert GoogleDrive preview url's to the direct url's
  const formatUrls = (name: keyof Realization, input: string) => {
    const urls = input.trim().replaceAll(" ", "\n").split("\n");
    urls.map((url, idx) => {
      if (url.includes("drive.google.com")) {
        const id = url.substring(url.indexOf("/d/") + 3, url.lastIndexOf("/view?"));
        const directUrl = `https://lh3.googleusercontent.com/d/${id}`;
        urls[idx] = directUrl;
      }
    });
    const finalUrls = urls.join("\n");
    setValue(name, finalUrls);
  };

  const handlePreview = () => {
    const data = getValues();
    formatUrls("mainImage", data.mainImage);
    formatUrls("images", data.images);
    setShowPreview(!showPreview);
  };
  const revalidatePaths = async (id: string) => {
    const revalidateData = {
      paths: ["/", `/realizacje/${id}`],
    };
    try {
      await axios.post("/api/revalidate/", revalidateData);
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("warning", "Revalidation Error");
    }
  };

  const submitForm = async () => {
    setLoading(true);
    const data = getValues();
    try {
      let status = 0;
      let docId;
      const payload = {
        dbName: "Data",
        collectionName: "Realizations",
        documentData: data,
      };
      if (editMode) {
        // update existing project
        const res = await axios.put("/api/db/update/", payload);
        status = res.status;
        docId = data._id;
      } else {
        // add new project
        const res = await axios.post("/api/db/insert-one/", payload);
        status = res.status;
        docId = res.data.insertedId;
      }
      if (status === 204) {
        // no changes to made
        setShowPreview(false);
        showSnackBar("warning", "Brak zmian do wprowadzenia.");
      } else if (status === 200) {
        // request was successful
        await revalidatePaths(docId);
        setShowPreview(false);
        reset(); //clear fields
        showSnackBar("success", `Pomyślnie ${editMode ? "zaktualizowano!" : "dodano!"}`);
        router.push("/admin/realizations#main");
      }
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("error", errors.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(handlePreview)}>
        <Stack
          direction={isMobile ? "column" : "row"}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          spacing={isMobile ? 0 : 2}
        >
          {getInput("title", "Nazwa")}
          {getInput("author", "Autor")}
          {getInput("atrType", "Typ realizacji")}
          {getInput("atrLocalization", "Lokalizacja")}
          {getInput("atrPower", "Moc")}
          {getInput("atrPanels", "Model paneli fotowoltaicznych")}
          {getInput("atrInverter", "Model falownika")}
          {getInput("atrPump", "Model pompy ciepła")}
          {getInput("atrBattery", "Model magazynu en.")}
          {getInput("realizationDate", "Data wykonania", false, "typeDate")}
          {getInput("publishedDate", "Data publikacji", false, "typeDate")}
          {getInput("tags", "Tagi", true)}
          {getInput("mainImage", "Główny obraz", true)}
          {getInput("images", "Pozostałe obrazy", true, "typeArea", 1)}
          {getInput("description", "Opis", true, "typeArea")}
        </Stack>

        {/* Private data */}
        <Typography variant="h5" align="left" sx={{ mt: 2 }}>
          Dane klienta
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          spacing={isMobile ? 0 : 2}
          sx={{ backgroundColor: "#fdfdfd", mt: 2, p: 1, borderRadius: 2, border: "1px solid #6c6c6c" }}
        >
          {getInput("prvClientName", "Imię i nazwisko")}
          {getInput("prvClientEmail", "Adres email")}
          {getInput("prvClientTelephone", "Telefon")}
          {getInput("prvClientAddress", "Adres")}
          {getInput("prvComments", "Uwagi", true, "typeArea")}
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
          <Button
            name="showPreviewRealizationButton"
            type="submit"
            variant="contained"
            size="large"
            fullWidth={isMobile ? true : false}
            disabled={loading}
          >
            {loading ? <CircularProgress size={26} /> : showPreview ? "Zamknij podgląd" : "Pokaż podgląd"}
          </Button>
        </Box>
      </form>

      {showPreview ? (
        <Container sx={{ mt: 2 }}>
          <RealizationOverview realization={getValues()} />
          {/* Submit button */}
          <Button
            color="primary"
            disabled={loading}
            fullWidth
            size="large"
            onClick={submitForm}
            variant="contained"
            sx={{ mt: 4 }}
          >
            {loading ? <CircularProgress size={26} /> : editMode ? "Edytuj" : "Dodaj"}
          </Button>
        </Container>
      ) : (
        isMobile && (
          <Box sx={{ position: "fixed", right: "20px", bottom: "20px", zIndex: 1 }}>
            <Button color="primary" variant="contained" onClick={scrollDown} sx={{ borderRadius: "50%", py: 1, px: 0 }}>
              <KeyboardArrowDownIcon sx={{ fontSize: 48 }} />
            </Button>
          </Box>
        )
      )}
    </Box>
  );
};

export default RealizationTemplate;
