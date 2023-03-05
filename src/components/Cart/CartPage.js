import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadCart } from "../../redux/actions/orderActions";
import FormatPrice from "../common/FormatPrice";
import {
  deleteCartProduct,
  saveCartProduct,
} from "../../redux/actions/orderActions";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyer = useSelector((state) => state.auth.buyer);
  const cart = useSelector((state) => state.order.cart);
  useEffect(() => {
    const goHomePage = () => navigate("/");
    !buyer.isAuthentication && goHomePage();
  }, [buyer, navigate]);
  useEffect(() => {
    buyer.isAuthentication && dispatch(loadCart(buyer.token));
  }, [buyer.isAuthentication, dispatch, buyer.token]);

  const handleRemoveItem = (product) => {
    dispatch(deleteCartProduct(product, buyer.token));
  };
  const handleUpdateItem = (product) => {
    dispatch(saveCartProduct(true, product, buyer.token));
  };
  return (
    <>
      {typeof cart !== "undefined" && (
        <>
          <Typography sx={{ fontSize: "30px" }} spacing={2} padding={5}>
            รถเข็นสินค้า
          </Typography>
          <Box px={20} justifyContent="center" alignItems="center" flexGrow>
            {cart.cartItems.length === 0 && (
              <Box sx={{ height: "30vh" }}>
                <Typography
                  sx={{ textAlign: "center", fontSize: 25, color: "#ababab" }}
                >
                  คุณยังไม่มีสินค้าในรถเข็น
                </Typography>
              </Box>
            )}
            <CartTable
              items={cart.cartItems}
              handleRemoveItem={handleRemoveItem}
              handleUpdateItem={handleUpdateItem}
            />
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
                to={"/products/categories/all"}
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
                  ค่าส่ง: {FormatPrice(cart.deliveryFee)}
                </Typography>
                <Typography variant="h5" noWrap component="div" color="#ababab">
                  ราคารวม: {FormatPrice(cart.totalPrice)}
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
      )}
    </>
  );
}
