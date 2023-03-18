import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";

const NabBarSearchBar = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.allProducts);
  const categories = useSelector((state) => state.categories);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (
      Object.keys(products).length !== 0 &&
      products !== undefined &&
      Object.keys(categories).length !== 0 &&
      categories !== undefined
    ) {
      const newProducts = products.data.map((product) => {
        return {
          id: product.productUUID,
          name: product.name,
          type: "product",
          key: product.productUUID,
        };
      });
      const newCategories = categories.data.map((category) => {
        return {
          id: category.categoryUUID,
          name: category.name,
          type: "category",
          key: category.categoryUUID,
        };
      });
      const newItems = [...newCategories.concat(newProducts)];
      setItems(newItems);
    }
  }, [categories, products]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event, value) => {
    if (value) {
      const navigateSearch = () =>
        navigate(
          `/products/${value.type === "product" ? "detail/" : "categories/"}${
            value.id
          }`
        );
      setSelectedOption(value);
      navigateSearch();
    }
  };

  return (
    <Autocomplete
      sx={{ width: "55%" }}
      freeSolo
      options={items}
      getOptionLabel={(option) => option.name}
      value={selectedOption}
      onChange={handleOptionChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="ค้นหาสินค้า"
          fullWidth
          sx={{ bgcolor: "#f5f5f5" }}
          inputProps={{
            ...params.inputProps,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
              }
            },
            sx: {
              height: "7px",
              fontSize: "14px",
            },
            // startAdornment: (
            //   <InputAdornment position="start">
            //     <SearchIcon />
            //   </InputAdornment>
            // ),
          }}
        />
      )}
    />
  );
};

export default NabBarSearchBar;
