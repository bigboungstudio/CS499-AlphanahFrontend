import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ItemCard from "../Shopping/ItemCard";

export default function Products() {
  const products = useSelector((state) => state.products.allProducts);
  return (
    <Box pt={5}>
      <Typography sx={{ fontSize: "24px" }}>สินค้าแนะนำ</Typography>
      <Grid container spacing={3} alignContent="space-evenly" pt={3}>
        {Object.keys(products).length !== 0 &&
          products !== undefined &&
          products.data.map((item, i) => <ItemCard product={item} key={i} />)}
      </Grid>
    </Box>
  );
}
