import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Stack, Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Realization, initValues, schema } from "@/utils/schema/realization";
import { useSnackbar, VariantType } from "notistack";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

//Define Types
type Props = {
  realization: Realization | null;
};

const RealizationTemplate = ({ realization }: Props): JSX.Element => {
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
    control,
    formState: { errors },
  } = useForm<Realization>({
    resolver: yupResolver(schema) as Resolver<Realization>,
    defaultValues: realization ? realization : initValues,
  });

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

  const getInput = (name: keyof Realization, label: string, fullWidth = false, type = "text") => {
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
                rows={3}
              />
            );
          }
        }}
      />
    );
  };

  const submitForm = async () => {
    setLoading(true);
    const data = getValues();
    console.log(data);
    try {
      //   await axios.post("/api/sendEmail/", { payload: data });
      //   reset();
      showSnackBar("success", "Dodano nową realizację!");
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
      <form onSubmit={handleSubmit(() => setShowPreview(!showPreview))}>
        <Stack
          direction={isMobile ? "column" : "row"}
          useFlexGap
          justifyContent="center"
          spacing={isMobile ? 0 : 2}
          sx={{ flexWrap: "wrap" }}
        >
          {getInput("title", "Nazwa")}
          {getInput("author", "Autor")}
          {getInput("atrType", "Typ realizacji")}
          {getInput("atrLocalization", "Lokalizacja")}
          {getInput("atrPower", "Moc")}
          {getInput("atrPanels", "Model paneli fotowoltaicznych")}
          {getInput("atrInverter", "Model falownika")}
          {getInput("atrPump", "Model pompy ciepła")}
          {getInput("tags", "Tagi")}
          {getInput("realizationDate", "Data wykonania", false, "typeDate")}
          {getInput("publishedDate", "Data publikacji", false, "typeDate")}
          {getInput("mainImage", "Główny obraz", true)}
          {getInput("images", "Pozostałe obrazy", true)}
          {getInput("description", "Opis", true, "typeArea")}
        </Stack>
        {/* <Box sx={{ width: "100%" }}></Box> */}

        <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
          <Button
            name="showPreviewRealizationButton"
            type="submit"
            variant="contained"
            size="large"
            fullWidth={isMobile ? true : false}
            disabled={loading}
          >
            {loading ? <CircularProgress size={26} /> : "Pokaż podgląd"}
          </Button>
        </Box>
      </form>

      {showPreview ? (
        <>
          {/* <ProjectOverview project={getValues()} /> */}
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
            {loading ? <CircularProgress size={26} /> : realization ? "Edytuj" : "Dodaj"}
          </Button>
        </>
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
