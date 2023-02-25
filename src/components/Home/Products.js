import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import ItemCard from "../Shopping/ItemCard";

export default function Products({ products }) {
  return (
    <Box pt={5}>
      <Typography sx={{ fontSize: "24px" }}>สินค้าแนะนำ</Typography>
      <Grid container spacing={3} alignContent="space-evenly" pt={3}>
        {products &&
          products.data.map((item, i) => <ItemCard product={item} key={i} />)}
      </Grid>
    </Box>
  );
}
