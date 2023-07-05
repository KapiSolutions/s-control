import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function reCaptcha(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
    const { captcha } = req.body;
    const secret_key = process.env.RECAPTCHA_SERVER_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captcha}`;

    try {
      const response = await axios.post(url);
      if (response.data.success) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).end("Invalid Captcha Code!");
      }
    } catch (error) {
      console.log("error: ", error);
      res.status(500).end(error);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
