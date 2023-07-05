import axios from "axios";

export default async function reCaptcha(captcha: string | null) {
  const secret_key = process.env.RECAPTCHA_SERVER_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captcha}`;

  try {
    const response = await axios.post(url);
    if (response.data.success) {
      return true;
    } else {
      console.log("Invalid Captcha Code!");
      return false;
    }
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
}
