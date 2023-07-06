import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Container, Stack, Grid, Divider, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RealizationItemAdmin from "@/components/admin/realizations/RealizationItemAdmin";
import type { Realizations } from "@/utils/schema/realization";
import Link from "next/link";
// import { connectDB, client } from "@/utils/mongodb";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo } from "next-seo";
import realizations from "@/tmp/realizations.json";

type Props = {
  realizations: Realizations;
};

export default function AdminRealizationsPage({ realizations }: Props): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
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
        <Typography variant="h4" align={isMobile ? "center" : "left"}>
          Panel realizacji
        </Typography>
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
          <Link href="/admin/realizations/new#main">
            <Button variant="outlined" color="inherit" size="large" sx={{ width: isMobile ? "100%" : "auto" }}>
              <PostAddIcon sx={{ mr: 1 }} />
              Dodaj nową!
            </Button>
          </Link>
        </Box>

        {/* Title Bar */}
        <Grid container spacing={2} wrap="nowrap" sx={{ mt: 2 }}>
          <Grid item xs={9} sm={5} lg={9}>
            <Typography variant="body1">Nazwa</Typography>
          </Grid>
          {isMobile ? null : (
            <Grid item sm={3} lg={1}>
              <Typography variant="body1">Data wykonania</Typography>
            </Grid>
          )}
          <Grid item xs={3} sm={4} lg={2}>
            <Box display="flex">
              <Typography variant="body1">Opcje</Typography>
            </Box>
          </Grid>
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
    // const dbName = "Data";
    // const realizationsCollection = "realizations";
    // let sortedrealizations = null;

    // function parseDate(input: string) {
    //   const parts = input.match(/(\d+)/g);
    //   if (parts !== null && parts.length === 3) {
    //     const year = parseInt(parts[2], 10);
    //     const month = parseInt(parts[1], 10) - 1;
    //     const day = parseInt(parts[0], 10);
    //     return new Date(year, month, day).getTime();
    //   } else {
    //     return 0;
    //   }
    // }
    // try {
    //   // Connect to MongoDB
    //   await connectDB();
    //   // Access the specified database and collection
    //   const db = client.db(dbName);
    //   const collection = db.collection(realizationsCollection);
    //   // Retrieve all documents in the collection
    //   const realizations = await collection.find().toArray();
    //   // Sort documents by date
    //   sortedrealizations = realizations.sort(
    //     (a: { date: string }, b: { date: string }) => parseDate(b.date) - parseDate(a.date)
    //   );
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   // Close the MongoDB connection
    //   client.close();
    // }
    return {
      props: {
        // realizations: JSON.parse(JSON.stringify(sortedrealizations)),
        realizations: realizations,
      },
    };
  },
});
