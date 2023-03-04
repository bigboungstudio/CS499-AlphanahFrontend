import React, { useEffect } from "react";
import { Box, Typography, Stack, Breadcrumbs } from "@mui/material";
import ProductReview from "./Review/ProductReview";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductPreview from "./ProductDetail/ProductPreview";
import ProductDetails from "./ProductDetail/ProductDetails";
import { Link } from "react-router-dom";
import ProductOwner from "./ProductDetail/ProductOwner";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProductById } from "../../redux/actions/productActions";

export default function ProductPage() {
  const params = useParams().UUID;
  const products = useSelector((state) => state.products);
  const buyer = useSelector((state) => state.auth.buyer);
  const isAuthentication = buyer.isAuthentication;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductById(params));
  }, [dispatch, params]);

  const product = products.oneProduct;
  const categories = [...product.categories].sort((a, b) => a.level - b.level);
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
        {categories.map((item, i) => (
          <Typography
            component={Link}
            to={"/products/categories/" + item.categoryUUID}
            color="primary"
            sx={{ textDecoration: "none" }}
            key={i}
          >
            {item.name}
          </Typography>
        ))}

        <Typography>{product.name}</Typography>
      </Breadcrumbs>
      {typeof product !== "undefined" ? (
        <Stack spacing={1}>
          <ProductPreview
            product={product}
            isAuthentication={isAuthentication}
          />
          <ProductOwner product={product} />
          <ProductDetails product={product} />
          <ProductReview
            product={product}
            isAuthentication={isAuthentication}
          />
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}
