import React from "react";
import { Box, Typography, Stack, Breadcrumbs } from "@mui/material";
import ProductReview from "./Review/ProductReview";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductPreview from "./ProductDetail/ProductPreview";
import ProductDetails from "./ProductDetail/ProductDetails";
import { Link } from "react-router-dom";
import ProductOwner from "./ProductDetail/ProductOwner";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const params = useParams().UUID;
  const products = useSelector((state) => state.products);

  const product =
    products.data.find((product) => product.productUUID === params) || null;

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        px: 20,
      }}
    >
      <Breadcrumbs
        pt={4}
        pb={3}
        separator={
          <ArrowForwardIosIcon sx={{ color: "#ababab", fontSize: "16px" }} />
        }
      >
        <Typography
          component={Link}
          to={"/products"}
          color="primary"
          sx={{ textDecoration: "none" }}
        >
          Weapons
        </Typography>

        <Typography>Diamond sword</Typography>
      </Breadcrumbs>
      {product != null ? (
        <Stack spacing={1}>
          <ProductPreview product={product} />
          <ProductOwner product={product} />
          <ProductDetails product={product} />
          <ProductReview product={product} />
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}
