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
type Props = { realization: Realization | null };

export default function RealizationOverviewPage({ realization }: Props): JSX.Element {
  const router = useRouter();
  const breadcrumbs = [{ name: realization ? realization.title : "404", path: `/realizacje/${realization?._id}` }];

  if (!realization) {
    return <></>;
  }

  return (
    <>
      <NextSeo title={`S-control | ${realization.title}`} description={realization.description} />
      <ArticleJsonLd
        type="BlogPosting"
        url={`https://s-control.vercel.app/${router.asPath}`}
        title={realization.title}
        images={[realization.mainImage]}
        datePublished={realization.publishedDate ? realization.publishedDate.toString() : "2023-05-05T09:00:00+08:00"}
        dateModified={realization.publishedDate ? realization.publishedDate.toString() : "2023-05-05T09:00:00+08:00"}
        authorName={realization.author}
        description={realization.description}
      />
      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container maxWidth="md">
        {realization ? <RealizationOverview realization={realization} /> : "Realization does not exist."}
      </Container>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const dbName = "Data";
  const collectionName = "Realizations";
  let realization = null;
  const id = context.params?.pid ? context.params?.pid : "";

  if (id && ObjectId.isValid(id as string)) {
    try {
      // Connect to MongoDB
      await connectDB();
      // Access the specified database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      // Retrieve all documents in the collection
      realization = await collection.findOne({ _id: new ObjectId(id as string) });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      realization: JSON.parse(JSON.stringify(realization)),
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
