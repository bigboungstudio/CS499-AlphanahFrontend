import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Box,
  Typography,
  Divider,
  MenuItem,
  IconButton,
  Rating,
  ButtonBase,
} from "@mui/material";
import ItemCard from "./ItemCard";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { loadCategories } from "../../redux/actions/categoryActions";

export default function ShoppingPage() {
  const params = useParams().UUID;
  const products = useSelector((state) => state.products.allProducts.data);
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState("ล่าสุด");
  const [category, setCategory] = useState(
    params !== "all"
      ? [...categories].find((category) => category.categoryUUID === params)
      : {}
  );
  const [sortedProducts, setSortedProducts] = useState(
    [...products].sort((a, b) => {
      return (
        new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );
    })
  );

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
  }, [dispatch]);
  const isAll = params === "all";

  useEffect(() => {
    setSortOption("ล่าสุด");
    if (params !== "all") {
      setCategory(
        [...categories].find((category) => category.categoryUUID === params)
      );
      category.products &&
        setSortedProducts(
          [...category.products].sort(
            (a, b) => Date(b.createDate) - Date(a.createDate)
          )
        );
    } else if (params === "all") {
      setSortedProducts(
        [...products].sort((a, b) => {
          return (
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
          );
        })
      );
    }
  }, [params, categories, products, category]);

  const rateArray = [5, 4, 3, 2, 1];

  const handleChangeSort = (event) => {
    setSortOption(event.target.value);
    if (event.target.value === "ล่าสุด") {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => {
          return (
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
          );
        })
      );
    } else if (event.target.value === "ราคาสูงสุด") {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => b.minPrice - a.minPrice)
      );
    } else if (event.target.value === "ราคาต่ำสุด") {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => a.minPrice - b.minPrice)
      );
    }
  };
  const parentUUID =
    category && category.level === 1
      ? category.parentCategory.categoryUUID
      : null;
  return (
    <>
      <Stack direction="row" spacing={2} height="100%">
        <Stack direction="column" p={5} spacing={2} sx={{ width: "12%" }}>
          <Typography sx={{ fontSize: "28px" }}>หมวดหมู่</Typography>
          <Typography sx={{ fontSize: "20px", color: "#01bfa6" }}>
            {isAll
              ? "ทุกหมวดหมู่"
              : category.level === 1
              ? category.parentCategory.name
              : category.name}
          </Typography>
          <Divider />
          {!isAll && (
            <Typography
              component={Link}
              to={
                category.level === 0
                  ? "/products/categories/" + category.categoryUUID
                  : "/products/categories/" + parentUUID
              }
              sx={{
                color: category.level === 0 ? "#FB6376" : "black",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              ทั้งหมด
            </Typography>
          )}

          {params !== "all"
            ? category.childCategories !== undefined &&
              (category.level === 0
                ? category.childCategories !== [] &&
                  [...category.childCategories].map((item, index) => (
                    <Typography
                      component={Link}
                      to={"/products/categories/" + item.categoryUUID}
                      key={index}
                      sx={{
                        color:
                          category.categoryUUID === item.categoryUUID
                            ? "#FB6376"
                            : "black",
                        fontSize: "16px",
                        textDecoration: "none",
                      }}
                    >
                      {item.name}
                    </Typography>
                  ))
                : [...categories].find(
                    (category) => category.categoryUUID === parentUUID
                  ).childCategories !== [] &&
                  [...categories]
                    .find((category) => category.categoryUUID === parentUUID)
                    .childCategories.map((item, index) => (
                      <Typography
                        component={Link}
                        to={"/products/categories/" + item.categoryUUID}
                        key={index}
                        sx={{
                          color:
                            category.categoryUUID === item.categoryUUID
                              ? "#FB6376"
                              : "black",
                          fontSize: "16px",
                          textDecoration: "none",
                        }}
                      >
                        {item.name}
                      </Typography>
                    )))
            : [...categories]
                .filter((category) => category.level === 0)
                .map((item, index) => (
                  <Typography
                    component={Link}
                    to={"/products/categories/" + item.categoryUUID}
                    key={index}
                    sx={{
                      fontSize: "16px",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {item.name}
                  </Typography>
                ))}

          {!isAll && <Divider />}
          <Box>
            <Typography sx={{ fontSize: "18px", pb: 1 }}>ราคา</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <TextField
                InputProps={{
                  sx: { height: "30px", fontSize: "13px" },
                }}
              />
              <Typography>-</Typography>
              <TextField
                InputProps={{
                  sx: { height: "30px", fontSize: "13px" },
                }}
              />
              <IconButton
                sx={{ backgroundColor: "#ffeaec", borderRadius: 1, height: 32 }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography sx={{ fontSize: "18px", pb: 1 }}>คะแนน</Typography>
            <Stack alignItems="flex-start" spacing={0.5}>
              {[...rateArray].map((item, i) => (
                <ButtonBase key={i}>
                  <Rating defaultValue={item} readOnly size="small" />
                  {item !== 5 && (
                    <Typography sx={{ fontSize: 16, ml: 1 }}>ขึ้นไป</Typography>
                  )}
                </ButtonBase>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Box padding={5} flexGrow={1}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="space-between"
            paddingBottom={5}
          >
            <Typography>เจอสินค้า {sortedProducts.length} ชิ้น</Typography>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Typography>เรียงโดย:</Typography>
              <TextField
                size="small"
                select
                value={sortOption}
                sx={{ minWidth: "120px" }}
                inputProps={{
                  sx: {
                    height: "7px",
                    fontSize: "14px",
                  },
                }}
                onChange={handleChangeSort}
              >
                <MenuItem key="ล่าสุด" value="ล่าสุด">
                  ล่าสุด
                </MenuItem>
                <MenuItem key="ราคาสูงสุด" value="ราคาสูงสุด">
                  ราคาสูงสุด
                </MenuItem>
                <MenuItem key="ราคาต่ำสุด" value="ราคาต่ำสุด">
                  ราคาต่ำสุด
                </MenuItem>
              </TextField>
            </Stack>
          </Stack>
          <Divider />
          <Grid container spacing={3} alignContent="space-evenly" pt={3}>
            {sortedProducts &&
              sortedProducts.map((item, i) => (
                <ItemCard product={item} key={i} />
              ))}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
