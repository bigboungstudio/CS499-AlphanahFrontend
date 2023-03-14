import React, { useEffect, useState } from "react";
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
  const [productField, setProductField] = useState({
    product: {},
    categories: [],
    isReviewed: false,
  });
  useEffect(() => {
    dispatch(loadProductById(params));
    buyer.isAuthentication && dispatch(loadCart(buyer.token));
    buyer.isAuthentication && dispatch(loadUserDetail("buyer", buyer.token));
  }, [buyer.isAuthentication, buyer.token, dispatch, params]);

  useEffect(() => {
    Object.keys(products.oneProduct).length !== 0 &&
      products.oneProduct !== undefined &&
      setProductField({
        ...productField,
        product: products.oneProduct,
        categories: [...products.oneProduct.categories].sort(
          (a, b) => a.level - b.level
        ),
      });
  }, [productField, products.oneProduct]);

  useEffect(() => {
    Object.keys(productField.product).length !== 0 &&
      productField.product !== undefined &&
      setProductField({
        ...productField,
        isReviewed: productField.product.reviews.find(
          (review) =>
            review.creator.accountUUID === buyer.currentUser.accountUUID
        ),
      });
  }, [buyer.currentUser.accountUUID, productField]);

  const handleAddToCart = (product) => {
    dispatch(saveCartProduct(false, product, buyer.token));
    goCartPage();
  };
  const handleCreateReview = (review) => {
    dispatch(
      createReview(
        { ...review, productUUID: productField.product.productUUID },
        buyer.token
      )
    );
  };
  const handleDeleteReview = (review) => {
    dispatch(
      deleteReview(
        { ...review, productUUID: productField.product.productUUID },
        buyer.token
      )
    );
  };

  return (
    <>
      {Object.keys(productField.product).length !== 0 && (
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
              <ArrowForwardIosIcon
                sx={{ color: "#ababab", fontSize: "16px" }}
              />
            }
          >
            {productField.categories.map((item, i) => (
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

            <Typography>{productField.product.name}</Typography>
          </Breadcrumbs>
          {Object.keys(productField.product).length !== 0 && (
            <Stack spacing={1}>
              <ProductPreview
                isAuthentication={isAuthentication}
                handleClick={handleAddToCart}
              />
              <ProductOwner product={productField.product} />
              <ProductDetails product={productField.product} />
              <ProductReview
                isReviewed={productField.isReviewed}
                isAuthentication={isAuthentication}
                handleCreateReview={handleCreateReview}
                handleDeleteReview={handleDeleteReview}
              />
            </Stack>
          )}
        </Box>
      )}
    </>
  );
}
