import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Stack, Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import { Contact, schema } from "@/utils/schema/contact";
import { useSnackbar, VariantType } from "notistack";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const ContactForm = (): JSX.Element => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Contact> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await axios.post("/api/sendEmail/", { payload: data });
      reset();
      showSnackBar("success", "Wiadomość wysłana, dziękujemy!");
    } catch (err) {
      const errors = err as Error;
      console.log("errMsg: ", errors.message);
      showSnackBar("error", errors.message);
    } finally {
      setLoading(false);
    }
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
  const getInput = (name: keyof Contact, label: string, multiline = false) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            helperText={Boolean(errors[name]) ? errors[name]?.message : undefined}
            error={Boolean(errors[name])}
            onChange={onChange}
            value={value || ""}
            label={label}
            margin="normal"
            disabled={loading}
            fullWidth
            multiline={multiline}
            rows={3}
          />
        )}
      />
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={isMobile ? "column" : "row"} useFlexGap spacing={isMobile ? 0 : 2}>
        {getInput("clientName", "Imię i nazwisko")}
        {getInput("email", "E-mail")}
      </Stack>
      <Box sx={{ width: "100%" }}>{getInput("msg", "Wiadomość", true)}</Box>
      <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
        <Button type="submit" variant="contained" size="large" fullWidth={isMobile ? true : false} disabled={loading}>
          {loading ? <CircularProgress size={26} /> : "Wyślij"}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
