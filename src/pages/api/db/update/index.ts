import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { schema } from "@/utils/schema/realization";

const checkForChanges = (existingObj: Record<string, any>, updatedObj: Record<string, any>): Record<string, any> => {
  const updatedFields: Record<string, any> = {};

  for (const key in updatedObj) {
    if (key === "_id") {
      continue; // Skip comparing and updating the _id field
    }
    if (existingObj[key] !== updatedObj[key]) {
      updatedFields[key] = updatedObj[key];
    } else {
      updatedFields[key] = existingObj[key];
    }
  }

  return updatedFields;
};
async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "PUT") {
    const { dbName, collectionName, documentData } = req.body;
    try {
      // Validate incoming data
      if (typeof dbName != "string" && typeof collectionName != "string") {
        res.status(401).json({ error: "Invalid db or collection!" });
        return;
      }
      await schema.validate(documentData);
      
      const docId = documentData._id;
      // Validate the doc ID format
      if (!docId || !ObjectId.isValid(docId)) {
        res.status(400).json({ error: "Invalid document ID" });
        return;
      }
      // Connect to MongoDB
      await connectDB();
      // Access the database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Get existing document by specified id
      const existingDocument = await collection.findOne({ _id: new ObjectId(docId) });
      if (!existingDocument) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Find the fields that have new values and are different from the existing values
      const updatedFields = checkForChanges(existingDocument, documentData);

      // Check if there is any difference between the existing document and the update
      if (Object.keys(updatedFields).length === 0) {
        res.status(204).end();
        return Promise.resolve();
      }

      // Update the document with the updated fields
      const result = await collection.updateOne({ _id: new ObjectId(docId) }, { $set: updatedFields });
      if (result.modifiedCount === 1) {
        return res.status(200).json({ message: "Document updated successfully" });
      } else {
        return res.status(500).json({ message: "Failed to update document" });
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      res.status(500).json({ error: "Server error" });
    } finally {
      // Close the MongoDB connection
      client.close();
    }
  } else {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
  }
}

// withApiAuthRequired checks if the session is authenticated, if yes then handle function is called
export default withApiAuthRequired(handle);
