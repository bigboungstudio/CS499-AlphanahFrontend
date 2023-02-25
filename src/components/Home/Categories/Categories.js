import React from "react";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import CategoriesCard from "./CategoriesCard";
import { Link } from "react-router-dom";

export default function Categories() {
  var items = [
    {
      image: "/Categories/phone.jpg",
      alt: "phone",
      name: "มือถือ",
    },
    {
      image: "/Categories/game.png",
      alt: "game",
      name: "อุปกรณ์เกม",
    },
    {
      image: "/Categories/shirt.png",
      alt: "shirt",
      name: "เสื้อ",
    },
    {
      image: "/Categories/access.png",
      alt: "access",
      name: "เครื่องประดับ",
    },
    {
      image: "/diasword.png",
      alt: "weapons",
      name: "อาวุธ",
    },
  ];
  return (
    <Box>
      <Stack pt={5} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: "24px" }}>หมวดหมู่</Typography>
        <Button
          component={Link}
          to={"/products"}
          variant="outlined"
          sx={{ fontSize: "16px" }}
        >
          สินค้าทั้งหมด
        </Button>
      </Stack>
      <Grid container alignContent="space-evenly">
        {items.map((item, i) => (
          <CategoriesCard key={i} item={item} />
        ))}
      </Grid>
    </Box>
  );
}
