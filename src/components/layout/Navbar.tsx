import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Divider,
  Stack,
  Menu,
  MenuItem,
  Button,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Logotype from "../Logotype";

const pages = ["Fotowoltaika", "Pompy Ciepła", "Realizacje", "O Nas", "Kontakt"];
const sections = [
  "Fotowoltaika",
  "Pompy-ciepla",
  "Realizacje",
  "O-nas",
  "Kontakt",
];

const Navbar = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElNavLg, setAnchorElNavLg] = useState<null | HTMLElement>(null);
  const { user, error, isLoading } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
    defaultMatches: true,
  });
  const scrollOffset = 70;

  // Mobile menu handlers
  const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const closeNavMenu = () => {
    setAnchorElNav(null);
  };
  // Desktop menu admin handlers
  const openNavMenuLg = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavLg(event.currentTarget);
  };
  const closeNavMenuLg = () => {
    setAnchorElNavLg(null);
  };

  // Handle scrolling actions on the home page when the user redirects to it
  useEffect(() => {
    if (window.location.hash && router.pathname == "/") {
      const name = window.location.hash.replace("#", "");
      const element = document.getElementsByName(name)[0];
      window.scrollTo({ top: element.offsetTop - scrollOffset, behavior: "smooth" });
    }
    setLoading(false);
  }, [router.pathname]);

  const scrollToSection = (name: string) => {
    if (router.pathname === "/") {
      const element = document.getElementsByName(name)[0];
      window.history.pushState(null, "", `/#${name}`); //add to history without loading the page
      // window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      window.scrollTo({ top: element.offsetTop - scrollOffset, behavior: "smooth" });
    } else {
      router.push(`/#${name}`, undefined, { scroll: false });
    }
  };

  const brandButtonAction = () => {
    if (router.pathname === "/") {
      window.history.pushState(null, "", `/`);
      window.scrollTo(0, 0);
    } else {
      router.push("/");
    }
  };

  const showBackdrop = () => {
    router.pathname != "/admin/realizations" && setLoading(true);
  };

  return (
    <Box>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        elevation={1}
        sx={{
          zIndex: 1000,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          pl: 3,
          pr: 3,
          borderRadius: 0,
          bgcolor: "layout.navbar",
          backdropFilter: "blur(16px) saturate(180%)",
        }}
        component="nav"
      >
        {/* Mobile View */}
        {isMobile ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%", pt: 1, pb: 1 }}
          >
            <Box className="pointer" onClick={brandButtonAction}>
              <Logotype size={36} />
            </Box>
            <Box>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={closeNavMenu}
                disableScrollLock={true}
                sx={{
                  transform: "translateY(12px)",
                  "& .MuiMenu-paper": { bgcolor: "layout.navbar", backdropFilter: "blur(24px)" },
                }}
              >
                {pages.map((page, idx) => (
                  <MenuItem
                    key={idx}
                    onClick={() => {
                      closeNavMenu();
                      scrollToSection(sections[idx]);
                    }}
                    divider={idx == pages.length - 1 ? true : false}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}

                {/* Admin controls */}
                {user ? (
                  <Box sx={{ mt: 2 }}>
                    <MenuItem onClick={closeNavMenu}>
                      <Stack direction="row" spacing={1}>
                        <SettingsIcon />
                        <Link href="/admin/realizations#main" onClick={showBackdrop}>
                          <Typography textAlign="center" component="span">
                            Realizacje
                          </Typography>
                        </Link>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={closeNavMenu}>
                      <Stack direction="row" spacing={1}>
                        <LogoutIcon />
                        <Typography textAlign="center" component="span">
                          <a href="/api/auth/logout">Wyloguj</a>
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Box>
                ) : null}
              </Menu>
            </Box>
          </Stack>
        ) : (
          // Desktop View
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ width: "100%", pt: 1, pb: 1 }}
          >
            <Box className="pointer zoom" onClick={brandButtonAction}>
              <Logotype size={40} />
            </Box>
            <Stack direction="row">
              {pages.map((page, idx) => (
                <Button
                  key={page}
                  onClick={() => {
                    closeNavMenu();
                    scrollToSection(sections[idx]);
                  }}
                  sx={{ color: "text.primary", display: "block" }}
                  className="zoom"
                >
                  {page}
                </Button>
              ))}
              {/* Admin Menu */}
              {user ? (
                <Stack direction="row" sx={{ ml: 2 }} spacing={1}>
                  <Divider orientation="vertical" flexItem />
                  <Button
                    aria-label="menuAdminLg"
                    aria-controls="menuAdminLg"
                    aria-haspopup="true"
                    onClick={openNavMenuLg}
                    color="inherit"
                  >
                    <AdminPanelSettingsIcon />
                    <Typography textAlign="center" sx={{ ml: 1 }}>
                      Admin
                    </Typography>
                  </Button>
                  <Menu
                    id="menuAdminLg"
                    anchorEl={anchorElNavLg}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNavLg)}
                    onClose={closeNavMenuLg}
                    disableScrollLock={true}
                    sx={{ transform: "translateY(12px)" }}
                  >
                    <MenuItem onClick={closeNavMenuLg} divider>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <SettingsIcon sx={{ fontSize: "medium" }} />
                        <Link href="/admin/realizations#main" onClick={showBackdrop}>
                          <Typography textAlign="center" component="span">
                            Realizacje
                          </Typography>
                        </Link>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={closeNavMenuLg} divider>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LogoutIcon sx={{ fontSize: "medium" }} />
                        <Typography textAlign="center">
                          <a href="/api/auth/logout">Wyloguj</a>
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Menu>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        )}
      </Paper>
    </Box>
  );
};
export default Navbar;
