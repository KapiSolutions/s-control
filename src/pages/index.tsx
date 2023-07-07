import { NextSeo } from "next-seo";
import { Box, Stack } from "@mui/material";
import BreadCrumbs from "@/components/BreadCrumbs";
import WhyUs from "@/components/sections/WhyUs";
import Dotation from "@/components/sections/Dotation";
import Contact from "@/components/sections/Contact";
import Realizations from "@/components/sections/realizations/Realizations";
import { connectDB, client } from "@/utils/mongodb";

type Props = {
  realizations: Realizations;
};

export default function HomePage({ realizations }: Props): JSX.Element {
  return (
    <>
      <NextSeo
        title="S-control | Twoja fotowoltaika"
        description="Opis"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <Box sx={{ ml: 2 }}>
        <BreadCrumbs items={null} />
      </Box>
      <Stack spacing={6}>
        <WhyUs />
        <Dotation />
        <Realizations realizations={realizations} />
        <Contact />
      </Stack>
    </>
  );
}

export async function getStaticProps() {
  const dbName = "Data";
  const collectionName = "Realizations";
  let sortedrealizations = null;

  function parseDate(input: string) {
    return new Date(input).getTime();
  }
  try {
    // Connect to MongoDB
    await connectDB();
    // Access the specified database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    // Retrieve all documents in the collection
    const realizations = await collection.find().toArray();
    // Sort documents by date
    sortedrealizations = realizations.sort(
      (a: { realizationDate: string }, b: { realizationDate: string }) =>
        parseDate(b.realizationDate) - parseDate(a.realizationDate)
    );
  } catch (error) {
    console.log(error);
  } finally {
    // Close the MongoDB connection
    client.close();
  }
  return {
    props: {
      realizations: JSON.parse(JSON.stringify(sortedrealizations)),
    },
    revalidate: false, //on demand revalidation
  };
}
