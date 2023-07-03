import "@/styles/main.scss";
import "@fontsource/teko";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import Layout from "@/components/layout/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import themeSetup from "@/utils/themeSetup";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme(themeSetup);
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  );
}
