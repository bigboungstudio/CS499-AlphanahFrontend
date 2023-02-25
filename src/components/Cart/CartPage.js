import React from "react";
import {
  Stack,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";

export default function CartPage() {
  var items = [
    {
      quantity: 1,
      src: "/arm.png",
      alt: "arm",
      name: "Nero's arm",
      seller: "Nero",
      price: 96.0,
    },
    {
      quantity: 1,
      src: "/yamato.png",
      alt: "yamato",
      name: "Yamato",
      seller: "Vergil",
      price: 1999.99,
    },
    {
      quantity: 1,
      src: "/yamato.png",
      alt: "yamato",
      name: "Yamato",
      seller: "Vergil",
      price: 1999.99,
    },
    {
      quantity: 1,
      src: "/yamato.png",
      alt: "yamato",
      name: "Yamato",
      seller: "Vergil",
      price: 1999.99,
    },
  ];
  return (
    <>
      <Typography sx={{ fontSize: "30px" }} spacing={2} padding={5}>
        รถเข็นสินค้า
      </Typography>
      <Box px={20}>
        <CartTable items={items} />
      </Box>
      <AppBar
        position="static"
        sx={{
          top: "auto",
          bottom: 0,
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Button
            sx={{ fontSize: "19px", left: "3%" }}
            startIcon={<KeyboardBackspaceIcon />}
            size="large"
            component={Link}
            to={"/products"}
          >
            เลือกสินค้าเพิ่ม
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="column" spacing={2} padding={5}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#faaf00",
                  },
                  "&:hover fieldset": {
                    borderColor: "#faaf00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#faaf00",
                  },
                },
              }}
              InputProps={{
                style: { height: "50px", fontSize: "16px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      sx={{
                        color: "#faaf00",
                        "&:hover": {
                          backgroundColor: "#fff7d1",
                        },
                      }}
                      variant="text"
                    >
                      ใช้งาน
                    </Button>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon sx={{ color: "#faaf00" }} />
                  </InputAdornment>
                ),
              }}
              placeholder="กรอกคูปอง"
            />
            <Typography variant="h6" noWrap component="div" color="#ababab">
              ค่าส่ง: +฿5.00
            </Typography>
            <Typography variant="h5" noWrap component="div" color="#ababab">
              ราคารวม: ฿96.00
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to={"/checkout"}
              sx={{ fontSize: 20 }}
            >
              ชำระเงิน
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
