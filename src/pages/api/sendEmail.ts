import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "@/utils/schema/contact";
import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
    // Extract data from the request body
    const { payload } = req.body;
    try {
      // Validate incoming data
      await schema.validate(payload);
      const data = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: payload,
      };
    } catch (error) {
      console.error("Schema validation error:", error);
      res.status(500).json({ error: "Schema validation error" });
      return;
    }

    try {
      const serviceID = process.env.EMAILJS_SERVICE_ID ? process.env.EMAILJS_SERVICE_ID : "";
      const templateID = process.env.EMAILJS_TEMPLATE_ID ? process.env.EMAILJS_TEMPLATE_ID : "";
      const publicKey = process.env.EMAILJS_PUBLIC_KEY ? process.env.EMAILJS_PUBLIC_KEY : "";
      const privateKey = process.env.EMAILJS_PRIVATE_KEY ? process.env.EMAILJS_PRIVATE_KEY : "";
      await emailjs.send(serviceID, templateID, payload, {
        publicKey: publicKey,
        privateKey: privateKey,
      });
      res.status(200).end("Success");
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log("EMAILJS FAILED...", err);
        res.status(503).json({ error: err });
        return;
      }
      console.log("ERROR", err);
      res.status(500).json({ error: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
