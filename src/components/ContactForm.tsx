import React, { useEffect, useState, useCallback } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Stack, Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import { Contact, schema } from "@/utils/schema/contact";
import { useSnackbar, VariantType } from "notistack";
import axios from "axios";
import dynamic from "next/dynamic";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));
import CloseIcon from "@mui/icons-material/Close";

const ContactForm = (): JSX.Element => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showReCaptcha, setShowReCaptcha] = useState(false);
  const [captchaResult, setCaptchaResult] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });
  const reCaptchaClientKey = process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY
    ? process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY
    : "";

  const onReCAPTCHAChange = (captchaCode: string | null) => {
    setCaptchaResult(captchaCode);
  };

  // Scroll and set focus on the error field
  useEffect(() => {
    const errArray = Object.keys(errors);
    // check for errors
    if (errArray.length > 0) {
      const key = errArray[0] as keyof Contact;
      const property = errors[key];

      if (typeof property === "object" && "message" in property) {
        // single field
        document.getElementsByName(errArray[0])[0].focus();
        document.getElementsByName(errArray[0])[0].scrollIntoView({ block: "center", inline: "nearest" });
      }
    }
  }, [errors]);

  const onSubmit: SubmitHandler<Contact> = async (data) => {
    setLoading(true);
    // Show reCaptcha widget
    if (!showReCaptcha) {
      setShowReCaptcha(true);
      setLoading(false);
      return;
    }
    // Check for captcha code
    if (!captchaResult) {
      setLoading(false);
      return;
    }

    // Validate captcha and send email to the user
    try {
      await axios.post("/api/sendEmail/", { payload: data, captcha: captchaResult });
      reset();
      setShowReCaptcha(false);
      setCaptchaResult(null);
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
          <>
            {!isMobile && (
              <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
                <CloseIcon />
              </Button>
            )}
          </>
        ),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enqueueSnackbar, closeSnackbar]
  );
  const getInput = (name: keyof Contact, label: string, multiline = false) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            name={name}
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
      {showReCaptcha && (
        <Box sx={{ display: "flex", justifyContent: isMobile ? "center" : "right" }}>
          <ReCAPTCHA sitekey={reCaptchaClientKey} onChange={onReCAPTCHAChange} />
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth={isMobile ? true : false}
          disabled={loading || (showReCaptcha && !captchaResult)}
        >
          {loading ? <CircularProgress size={26} /> : "Wyślij"}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
