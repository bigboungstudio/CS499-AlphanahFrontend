import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ProductReview from "./Review/ProductReview";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductPreview from "./ProductDetail/ProductPreview";
import ProductDetails from "./ProductDetail/ProductDetails";
import { Link } from "react-router-dom";
import ProductOwner from "./ProductDetail/ProductOwner";

export default function ProductPage() {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        px: 20,
      }}
    >
      <Stack direction="row" spacing={2} pt={4} pb={3} alignItems="center">
        <Typography
          component={Link}
          to={"/shop"}
          color="primary"
          sx={{ textDecoration: "none" }}
        >
          Weapons
        </Typography>
        <ArrowForwardIosIcon sx={{ color: "#ababab", fontSize: "16px" }} />
        <Typography>Diamond sword</Typography>
      </Stack>
      <Stack spacing={1}>
        <ProductPreview />
        <ProductOwner />
        <ProductDetails />
        <ProductReview />
      </Stack>
    </Box>
  );
}
