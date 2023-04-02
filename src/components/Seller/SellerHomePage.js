import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadUserDetail } from "../../redux/actions/authActions";
import { loadProductByMerchant } from "../../redux/actions/productActions";
import { loadSalesOrder } from "../../redux/actions/orderActions";

export default function SellerHomePage() {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.seller);
  const products = useSelector((state) => state.products.merchantProducts);
  const salesOrders = useSelector((state) => state.order.salesOrder);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [needShipOrder, setNeedShipOrder] = useState(0);
  useEffect(() => {
    seller.isAuthentication && dispatch(loadUserDetail("seller", seller.token));
    seller.currentUser.accountUUID &&
      dispatch(loadProductByMerchant(seller.currentUser.accountUUID));
    seller.currentUser.accountUUID && dispatch(loadSalesOrder(seller.token));
  }, [
    dispatch,
    seller.currentUser.accountUUID,
    seller.isAuthentication,
    seller.token,
  ]);
  useEffect(() => {
    Object.keys(products).length !== 0 &&
      products !== undefined &&
      setOutOfStockCount(
        products.data.filter((product) => product.outOfStock > 0).length
      );
  }, [outOfStockCount, products]);
  useEffect(() => {
    Object.keys(salesOrders).length !== 0 &&
      salesOrders.data !== undefined &&
      salesOrders !== undefined &&
      setNeedShipOrder(
        salesOrders.data.filter((order) => order.deliveryStatus === "PENDING")
          .length
      );
  }, [salesOrders]);
  function ToDoItem({ num, text, link }) {
    return (
      <Stack alignItems="center">
        <Typography
          component={Link}
          to={link}
          sx={{
            color: "#01bfa6",
            fontSize: 24,
            textAlign: "center",
            pb: 1,
            textDecoration: "none",
          }}
        >
          {num}
        </Typography>
        <Typography
          sx={{ color: "#ababab", fontSize: 18, textAlign: "center" }}
        >
          {text}
        </Typography>
      </Stack>
    );
  }
  return (
    <>
      <Box mx="15%" bgcolor="white" py={5} my={10}>
        <Typography sx={{ fontSize: 24, px: 4, pb: 5 }}>
          สิ่งที่ต้องจัดการ
        </Typography>
        <Stack direction="row" mx={12} spacing={8} justifyContent="center">
          <ToDoItem
            link="/seller/orders"
            num={needShipOrder}
            text="สินค้าที่ต้องจัดส่ง"
          />
          <Divider orientation="vertical" flexItem />
          <ToDoItem
            link="/seller/products"
            num={outOfStockCount}
            text="สินค้าหมดคลัง"
          />
        </Stack>
      </Box>
    </>
  );
}
