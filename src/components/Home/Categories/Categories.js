import React from "react";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import CategoriesCard from "./CategoriesCard";
import { Link } from "react-router-dom";

export default function Categories() {
  var items = [
    {
      id: "4f6c093e-acb8-4dc3-891b-94a52245adf1",
      image: "/Categories/phone.jpg",
      alt: "phone",
      name: "มือถือและแท็บเล็ต",
    },
    {
      id: "11777566-158c-4857-bf23-a3d093952aeb",
      image: "/Categories/com.png",
      alt: "computer",
      name: "คอมพิวเตอร์",
    },
    {
      id: "2c59d631-698a-4245-a234-96975236f07c",
      image: "/Categories/sleep.jpg",
      alt: "sleep",
      name: "เครื่องนอน",
    },
    {
      id: "f6de06dd-638b-45eb-b4c3-532b66e1baf6",
      image: "/Categories/kitchen.jpg",
      alt: "kitchen",
      name: "เครื่องครัว",
    },
    {
      id: "ed13c9d7-a85d-4498-8602-bbcfa48e76a3",
      image: "/Categories/bag.jpg",
      alt: "bag",
      name: "กระเป๋า",
    },
    {
      id: "97c9e57b-da39-4419-9f89-a988e090d149",
      image: "/Categories/shoes.jpg",
      alt: "shoes",
      name: "รองเท้า",
    },
    {
      id: "7acfbca5-aa1f-495b-b3fe-0d92d8b423b0",
      image: "/Categories/sport.jpg",
      alt: "sport",
      name: "อุปกรณ์กีฬา",
    },
  ];
  return (
    <Box>
      <Stack pt={5} direction="row" justifyContent="space-between" pb={2}>
        <Typography sx={{ fontSize: "24px" }}>หมวดหมู่</Typography>
        <Button
          component={Link}
          to={"/products/categories/all"}
          variant="outlined"
          sx={{ fontSize: "16px" }}
        >
          สินค้าทั้งหมด
        </Button>
      </Stack>
      <Grid container alignContent="space-evenly">
        {items.map((item, i) => (
          <CategoriesCard item={item} key={i} />
        ))}
      </Grid>
    </Box>
  );
}
