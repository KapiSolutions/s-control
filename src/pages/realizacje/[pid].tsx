import { GetStaticPropsContext } from "next";
import { Container, Box } from "@mui/material";
import type { Realization } from "@/utils/schema/realization";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import RealizationOverview from "@/components/RealizationOverview";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo, ArticleJsonLd } from "next-seo";

// Define types
type Props = {
  realization: Realization | null;
  prevID: string;
  nextID: string;
};

export default function RealizationOverviewPage({ realization, prevID, nextID }: Props): JSX.Element {
  const router = useRouter();
  if (!realization) {
    return <></>;
  }
  const breadcrumbs = [{ name: realization ? realization.title : "404", path: `/realizacje/${realization?._id}` }];
  const publishedDate = realization.publishedDate ? realization.publishedDate.toString() : "2023-05-05T09:00:00+08:00";

  return (
    <>
      <NextSeo
        title={`S-control | ${realization.title}`}
        description={realization.description}
        openGraph={{
          type: "article",
          locale: "pl_PL",
          article: {
            publishedTime: publishedDate,
            modifiedTime: publishedDate,
            authors: ["https://www.facebook.com/scontrol1"],
            tags: realization.tags?.split(" "),
          },
          url: `https://www.s-control.vercel.app/realizacje/${realization?._id}`,
          images: [
            {
              url: realization.mainImage,
              width: 850,
              height: 650,
              alt: `S-control fotowoltaika ${realization.atrLocalization}`,
            },
          ],
          siteName: "S-control Fotowoltaika",
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={`https://s-control.vercel.app/${router.asPath}`}
        title={realization.title}
        images={[realization.mainImage]}
        datePublished={publishedDate}
        dateModified={publishedDate}
        authorName={realization.author}
        description={realization.description}
      />
      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container maxWidth="md">
        {realization ? <RealizationOverview realization={realization} prevID={prevID} nextID={nextID} /> : "Realization does not exist."}
      </Container>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const dbName = "Data";
  const collectionName = "Realizations";
  const id = context.params?.pid ? context.params?.pid : "";
  let realization = null;
  let sortedDocs = null;
  let prevID = "";
  let nextID = "";
  
  function parseDate(input: string) {
    return new Date(input).getTime();
  }

  if (id && ObjectId.isValid(id as string)) {
    try {
      // Connect to MongoDB
      await connectDB();
      // Access the specified database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      // Retrieve document by specyfied id
      realization = await collection.findOne({ _id: new ObjectId(id as string) });
      // Retrieve all documents from the collection
      const documents = await collection.find().toArray();
      // Sort documents by date
      sortedDocs = documents.sort(
        (a: { realizationDate: string }, b: { realizationDate: string }) =>
          parseDate(b.realizationDate) - parseDate(a.realizationDate)
      );
      // find previous and next id of realizations
      const actID = sortedDocs.findIndex((item: Realization) => item._id?.toString() === id);
      prevID = actID > 0 ? sortedDocs[actID - 1]._id : sortedDocs[sortedDocs.length - 1]._id;
      nextID = actID < sortedDocs.length - 1 ? sortedDocs[actID + 1]._id : sortedDocs[0]._id;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      realization: JSON.parse(JSON.stringify(realization)),
      prevID: prevID.toString(),
      nextID: nextID.toString(),
    },
    revalidate: false, //on demand revalidation
  };
}

export async function getStaticPaths() {
  const dbName = "Data";
  const collectionName = "Realizations";
  let documentIds = [];
  try {
    // Connect to MongoDB
    await connectDB();
    // Access the specified database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    // Retrieve all documents from the collection
    const documents = await collection.find().toArray();

    // Extract the IDs of each document
    documentIds = documents.map((doc: { _id: string }) => doc._id.toString());
  } catch (error) {
    console.log(error);
  }
  return {
    paths: documentIds.map((doc: string) => {
      return {
        params: { pid: doc },
      };
    }),
    fallback: "blocking",
  };
}
