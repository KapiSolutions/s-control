import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/layout/grid.module.scss";
import { Box } from "@mui/material";

//Define Types:
type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Header />
      </Box>

      <Box component="main" name="main" className={styles.main} sx={{ pt: 2, pb: 8 }}>
        {children}
      </Box>

      <Box className={styles.footer}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
