import { Box, Stack, Typography, Avatar, Divider, Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ItemCard from "./ItemCard";
import {
  loadMerchantDetail,
  loadProductByMerchant,
} from "../../redux/actions/productActions";

export default function MerchantPage() {
  const params = useParams().UUID;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.merchantProducts);
  const merchant = useSelector((state) => state.products.merchantDetail);
  React.useEffect(() => {
    dispatch(loadMerchantDetail(params));
    dispatch(loadProductByMerchant(params));
  }, [dispatch, params]);
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        height: "100vh",
      }}
    >
      {Object.keys(merchant).length !== 0 && merchant !== undefined && (
        <Stack
          bgcolor="white"
          direction="row"
          py={7}
          px={20}
          spacing={4}
          alignItems="center"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={merchant.firstname}
              src={merchant.image}
              sx={{
                width: 100,
                height: 100,
                mr: 3,
              }}
            />
            <Typography sx={{ fontSize: 30 }}>
              {merchant.firstname} {merchant.lastname}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <StorefrontIcon />
              <Typography>รายการสินค้า: </Typography>
              <Typography color="primary" fontSize="20px">
                {merchant.productCount}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <StarBorderIcon />
              <Typography>คะแนนสินค้า: </Typography>
              <Typography color="primary" fontSize="20px">
                {merchant.reviewCount}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}

      <Box py={7} px={20}>
        <Typography sx={{ color: "#ababab", fontSize: 20 }}>
          สินค้าทั้งหมดของผู้ขาย
        </Typography>
        <Grid container spacing={3} alignContent="space-evenly" pt={3}>
          {Object.keys(products).length !== 0 &&
            products !== undefined &&
            products.data.map((item, i) => <ItemCard product={item} key={i} />)}
        </Grid>
      </Box>
    </Box>
  );
}
