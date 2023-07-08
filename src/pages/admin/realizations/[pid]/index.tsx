import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Box, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Realization } from "@/utils/schema/realization";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo } from "next-seo";
import RealizationTemplate from "@/components/admin/realizations/RealizationTemplate";

// Define types
type Props = { realization: Realization | null };

export default function AdminEditRealizationPage({ realization }: Props): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const breadcrumbs = [
    { name: "Panel realizacji", path: "/admin/realizations#main" },
    { name: realization ? "Edycja Realizacji" : "404", path: `admin/realizations/${realization?._id}` },
  ];
  return (
    <>
      <NextSeo title="S-control | Edycja Realizacji" nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" align={isMobile ? "center" : "left"} sx={{mb:2, mt:2}}>
          Edycja realizacji
        </Typography>
        {realization ? <RealizationTemplate realization={realization} /> : "realization not found."}
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  // withPageAuthRequired checks if the session is authenticated, if not then redirect to Auth0 login page
  async getServerSideProps(context) {
    const dbName = "Data";
    const collectionName = "Realizations";
    let realization = null;

    const id: string | undefined = Array.isArray(context.params?.pid) ? context.params?.pid[0] : context.params?.pid;
    if (id && ObjectId.isValid(id)) {
      try {
        // Connect to MongoDB
        await connectDB();
        // Access the specified database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // Retrieve all documents in the collection
        realization = await collection.findOne({ _id: new ObjectId(id) });
      } catch (error) {
        console.log(error);
      } finally {
        // Close the MongoDB connection
        client.close();
      }
    }
    return {
      props: {
        realization: JSON.parse(JSON.stringify(realization)),
      },
    };
  },
});
