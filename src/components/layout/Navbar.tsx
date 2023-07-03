import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FilePresentIcon from "@mui/icons-material/FilePresent";
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
} from "@mui/material";
import logo from "../../../public/img/darkLogo.png";
import Image from "next/image";

const pages = ["O Nas", "Fotowoltaika", "Pompy Ciepła", "Realizacje", "Kontakt"];
const sections = ["AboutSection", "FotoSection", "HeatPumpsSection", "RealizationsSection", "ContactSection"];

const Navbar = (): JSX.Element => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElNavLg, setAnchorElNavLg] = useState<null | HTMLElement>(null);
  const { user, error, isLoading } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const navBackground = "rgba(255, 255, 255, 0.75)";

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
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
    }
  }, [router.pathname]);

  const scrollToSection = (name: string) => {
    if (router.pathname === "/") {
      const element = document.getElementsByName(name)[0];
      window.history.pushState(null, "", `/#${name}`); //add to history without loading the page
      // window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      window.scrollTo({ top: element.offsetTop - 50, behavior: "smooth" });
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

  return (
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
        backgroundColor: navBackground,
        backdropFilter: "blur(16px) saturate(180%)",
      }}
      component="nav"
    >
      {/* Mobile View */}
      {isMobile ? (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%", pt: 1, pb: 1 }}>
          <Box
            className="pointer"
            onClick={brandButtonAction}
            sx={{ position: "relative", width: "110px", height: "22px"}}
          >
            <Image src={logo} alt="S-control logo fotowoltaika" fill style={{ objectFit: "contain" }} />
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
                "& .MuiMenu-paper": { backgroundColor: navBackground, backdropFilter: "blur(24px)" },
              }}
            >
              {pages.map((page, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    closeNavMenu();
                    scrollToSection(sections[idx]);
                  }}
                  // divider={idx == pages.length - 1 ? true : false}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}

              {/* Admin controls */}
              {user ? (
                <Box sx={{ mt: 2 }}>
                  <MenuItem onClick={closeNavMenu}>
                    <Stack direction="row" spacing={1}>
                      <SettingsIcon color="secondary" />
                      <Link href="/admin/projects#main">
                        <Typography textAlign="center" color="secondary" component="span">
                          Realizacje
                        </Typography>
                      </Link>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={closeNavMenu}>
                    <Stack direction="row" spacing={1}>
                      <LogoutIcon color="secondary" />
                      <Typography textAlign="center" color="secondary" component="span">
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
          <Box
            className="pointer"
            onClick={brandButtonAction}
            sx={{ position: "relative", width: "110px", height: "30px" }}
          >
            <Image src={logo} alt="S-control logo fotowoltaika" fill style={{ objectFit: "contain" }} />
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
                      <Link href="/admin/projects#main">
                        <Typography textAlign="center" component="span">
                          Projects
                        </Typography>
                      </Link>
                    </Stack>
                  </MenuItem>
                  {/* <MenuItem onClick={closeNavMenuLg} divider>
                    <Stack direction="row" alignItems="center" spacing={1}>
                    <SettingsIcon sx={{fontSize:"medium"}}/>
                      <Link href="/admin/carrier">
                        <Typography textAlign="center" component="span">
                          Carrier
                        </Typography>
                      </Link>
                    </Stack>
                  </MenuItem> */}
                  <MenuItem onClick={closeNavMenuLg} divider>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LogoutIcon sx={{ fontSize: "medium" }} />
                      <Typography textAlign="center">
                        <a href="/api/auth/logout">Log out</a>
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
  );
};
export default Navbar;