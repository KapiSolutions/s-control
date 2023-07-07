import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDB, client } from "@/utils/mongodb";
import { schema } from "@/utils/schema/realization";

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
    try {
      // Extract data from the request body
      const { dbName, collectionName, documentData } = req.body;

      // Validate incoming data
      if (typeof dbName != "string" && typeof collectionName != "string") {
        res.status(401).json({ error: "Invalid db or collection!" });
        return;
      }
      await schema.validate(documentData);

      // Connect to MongoDB
      await connectDB();

      // Access the database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Insert the document into the collection
      const result = await collection.insertOne(documentData);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error uploading data:", error);
      res.status(500).json({ error: "Server error" });
    } finally {
      // Close the MongoDB connection
      client.close();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// withApiAuthRequired checks if the session is authenticated, if yes then handle function is called
export default withApiAuthRequired(handle);
