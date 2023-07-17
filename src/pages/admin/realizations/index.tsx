import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Typography,
  Container,
  Stack,
  Grid,
  Divider,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RealizationItemAdmin from "@/components/admin/realizations/RealizationItemAdmin";
import type { Realizations } from "@/utils/schema/realization";
import Link from "next/link";
import { connectDB, client } from "@/utils/mongodb";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo } from "next-seo";

type Props = {
  realizations: Realizations;
};

export default function AdminRealizationsPage({ realizations }: Props): JSX.Element {
  const [redirecting, setRedirecting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });

  const breadcrumbs = [{ name: "Panel realizacji", path: "/admin/realizations" }];
  return (
    <>
      <NextSeo title="S-control | Panel realizacji" nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" component="h1">
          Panel realizacji
        </Typography>
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
          <Link
            href="/admin/realizations/new#main"
            passHref
            style={{ width: isMobile ? "100%" : "auto" }}
            onClick={() => setRedirecting(true)}
          >
            <Button variant="outlined" color="inherit" size="large" fullWidth >
              {redirecting ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <>
                  <PostAddIcon sx={{ mr: 1 }} />
                  Dodaj nową!
                </>
              )}
            </Button>
          </Link>
        </Box>

        {/* Title Bar */}
        <Grid container wrap="nowrap" sx={{ mt: 2 }}>
          <Grid item xs={10} sm={8} md={5}>
            <Typography variant="body1">Nazwa</Typography>
          </Grid>
          {isMobile ? null : (
            <>
              <Grid item md={2}>
                <Typography variant="body1">Data wykonania</Typography>
              </Grid>
              <Grid item md={2}>
                <Typography variant="body1">Data wykonania</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Box display="flex">
                  <Typography variant="body1">Akcje</Typography>
                </Box>
              </Grid>
            </>
          )}
        </Grid>

        {/* Items */}
        <Stack direction="column" spacing={3} sx={{ mt: 2 }}>
          <Divider orientation="horizontal" flexItem />
          {realizations.map((realization, idx) => (
            <RealizationItemAdmin key={idx} realization={realization} />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  // withPageAuthRequired checks if the session is authenticated, if not then redirect to Auth0 login page
  async getServerSideProps(context) {
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
    };
  },
});
