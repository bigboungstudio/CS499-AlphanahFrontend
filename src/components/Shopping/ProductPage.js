import React, { useEffect } from "react";
import { Box, Typography, Stack, Breadcrumbs } from "@mui/material";
import ProductReview from "./Review/ProductReview";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductPreview from "./ProductDetail/ProductPreview";
import ProductDetails from "./ProductDetail/ProductDetails";
import { Link } from "react-router-dom";
import ProductOwner from "./ProductDetail/ProductOwner";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  loadProductById,
  createReview,
  deleteReview,
} from "../../redux/actions/productActions";
import { loadUserDetail } from "../../redux/actions/authActions";
import { saveCartProduct, loadCart } from "../../redux/actions/orderActions";

export default function ProductPage() {
  const navigate = useNavigate();
  const params = useParams().UUID;
  const products = useSelector((state) => state.products);
  const buyer = useSelector((state) => state.auth.buyer);
  const isAuthentication = buyer.isAuthentication;
  const dispatch = useDispatch();
  const goCartPage = () => navigate("/cart");
  useEffect(() => {
    dispatch(loadProductById(params));
    buyer.isAuthentication && dispatch(loadCart(buyer.token));
    buyer.isAuthentication && dispatch(loadUserDetail("buyer", buyer.token));
  }, [buyer.isAuthentication, buyer.token, dispatch, params]);

  const product = products.oneProduct;
  const categories = [...product.categories].sort((a, b) => a.level - b.level);
  const handleAddToCart = (product) => {
    dispatch(saveCartProduct(false, product, buyer.token));
    goCartPage();
  };
  const handleCreateReview = (review) => {
    dispatch(
      createReview({ ...review, productUUID: product.productUUID }, buyer.token)
    );
  };
  const handleDeleteReview = (review) => {
    dispatch(
      deleteReview({ ...review, productUUID: product.productUUID }, buyer.token)
    );
  };
  const isReviewed = product.reviews.find(
    (review) => review.creator.accountUUID === buyer.currentUser.accountUUID
  );
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
            isAuthentication={isAuthentication}
            handleClick={handleAddToCart}
          />
          <ProductOwner product={product} />
          <ProductDetails product={product} />
          <ProductReview
            isReviewed={isReviewed}
            isAuthentication={isAuthentication}
            handleCreateReview={handleCreateReview}
            handleDeleteReview={handleDeleteReview}
          />
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}
