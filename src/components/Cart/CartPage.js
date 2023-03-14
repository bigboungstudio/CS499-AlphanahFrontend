import React, { useEffect } from "react";
import { Stack, AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
      {Object.keys(cart).length !== 0 && cart !== undefined && (
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
              <Stack width="25%" direction="column" spacing={2} padding={5}>
                <Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: 20, color: "#ababab" }}>
                      ค่าส่ง:
                    </Typography>
                    <Typography sx={{ fontSize: 20, color: "#ababab" }}>
                      {FormatPrice(cart.rawDeliveryFee)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" pb={2}>
                    <Typography sx={{ fontSize: 20, color: "#ababab" }}>
                      ค่าสินค้า:
                    </Typography>
                    <Typography sx={{ fontSize: 20, color: "#ababab" }}>
                      {FormatPrice(cart.rawTotalPrice)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: 20, color: "#ababab" }}>
                      ราคารวม:
                    </Typography>
                    <Typography sx={{ fontSize: 20, color: "#ababab" }}>
                      {FormatPrice(cart.rawTotalPrice + cart.rawDeliveryFee)}
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  disabled={cart.cartItems.length === 0}
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
