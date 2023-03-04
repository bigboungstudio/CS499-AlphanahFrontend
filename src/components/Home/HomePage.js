import * as React from "react";
import ImageSlider from "./ImageSlider";
import Categories from "./Categories/Categories";
import { Box } from "@mui/material";
import Products from "./Products";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../../redux/actions/productActions";
import { loadCategories } from "../../redux/actions/categoryActions";

export default function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const categories = useSelector((state) => state.categories);

  React.useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
  }, [dispatch]);
  return (
    <>
      <ImageSlider />
      <Box sx={{ bgcolor: "#f5f5f5", px: 25, flexGrow: 1, pb: 20 }}>
        <Categories />
        {Object.keys(products).length === 0 ? (
          <Box>Loading</Box>
        ) : (
          <Products products={products} />
        )}
      </Box>
    </>
  );
}
