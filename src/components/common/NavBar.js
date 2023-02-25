import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputAdornment,
  Stack,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import NavBarText from "./NavbarText";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
// import { getProducts } from "../api/product/productApi";

export default function NavBar() {
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getProducts();
  //     console.log(data);
  //   };
  //   fetchData();
  // }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "white", justifyContent: "center", width: "100%" }}
      >
        <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5" }}>
          <Stack
            direction="row"
            spacing={4}
            justifyContent="flex-end"
            marginRight="15%"
          >
            <Button
              component={Link}
              to={"/seller/register"}
              rel="noopener noreferrer"
              target="_blank"
            >
              <NavBarText text="ขายสินค้ากับ ALPHANAH"></NavBarText>
            </Button>
            <Button component={Link} to={"/buyer/register"}>
              <NavBarText text="สร้างบัญชี"></NavBarText>
            </Button>
            <Button component={Link} to={"/buyer/login"}>
              <NavBarText text="เข้าสู่ระบบ"></NavBarText>
            </Button>
          </Stack>
        </Box>

        <Toolbar>
          <Stack
            flexGrow={1}
            direction="row"
            spacing={8}
            justifyContent="center"
            alignItems="center"
          >
            <Button component={Link} to={"/"}>
              <img height="50px" src="/a.png" alt="logo" />
              <Typography variant="h4" component="div" color="primary">
                lphanah
              </Typography>
            </Button>
            <TextField
              placeholder="ค้นหาสินค้า"
              sx={{ width: "55%", bgcolor: "#f5f5f5" }}
              InputProps={{
                sx: { height: "40px", fontSize: "16px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <IconButton color="primary" component={Link} to={"/cart"}>
                <ShoppingCartIcon sx={{ height: 40, width: 40 }} />
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
