"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import FlightIcon from "@mui/icons-material/Flight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PublicIcon from "@mui/icons-material/Public";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { userLogout } from "../redux/features/userSlice";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLoggedIn, username } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    navigate("/myflights");
    setAnchorElNav(null);
  };

  const handleMenuLogout = () => {
    setAnchorElUser(null);
    removeToken();
    dispatch(userLogout());
    navigate("/login");
  };

  const handleMenuMyFlights = () => {
    setAnchorElUser(null);
    navigate("/myflights");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      className="bg-themeLightGrey shadow-none text-black w-full mt-4"
    >
      <Container className="min-w-full  px-10 mx-0">
        <Toolbar disableGutters className=" flex justify-between min-w-full ">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <FlightIcon className="mr-1 rotate-90 bg-themePurple rounded-full text-themeLightGrey" />
            <Typography
              variant="h6"
              noWrap
              className="font-semibold"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              Plane scape
            </Typography>
            <Typography
              variant="h6"
              noWrap
              className="font-semibold"
              sx={{
                display: { xs: "flex", md: "none" },
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              Plane scape
            </Typography>
          </div>

          {/* Links */}
          <Box
            className=" gap-2 mr-8 justify-end"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black" }}
              className="p-1 rounded-full text-sm"
            >
              <LocalOfferIcon className="text-themePurple mr-1" />
              Deals
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black" }}
              className="p-1 rounded-full text-sm"
            >
              <PublicIcon className="text-themePurple mr-1" />
              Discover
            </Button>
          </Box>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }} className="text-black">
              <Tooltip title="Open Settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  className="gap-2 p-2 w-full h-full rounded-full flex-col xl:flex-row items-end xl:items-center"
                >
                  <Avatar
                    alt="Avatar"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?t=st=1723678852~exp=1723682452~hmac=8676c71230911690cb125f4bbcff944fdab7bb977b6a7fe513715a1eb7c44976&w=1480"
                  />
                  <h1 className="text-black text-sm flex-wrap">{username}</h1>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", mr: "-10px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleMenuMyFlights}>
                  <Typography textAlign="center">My Flights</Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              className="bg-themePurple hover:bg-themePurple/70 text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
