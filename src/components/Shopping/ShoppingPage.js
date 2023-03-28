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
  Button,
} from "@mui/material";
import ItemCard from "./ItemCard";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

export default function ShoppingPage() {
  const params = useParams().UUID;
  const products = useSelector((state) => state.products.allProducts.data);
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState("ล่าสุด");
  const [isFiltered, setIsFiltered] = useState({ price: false, star: false });
  const [category, setCategory] = useState(
    params !== "all"
      ? [...categories].find((category) => category.categoryUUID === params)
      : {}
  );
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [starFilter, setStarFilter] = useState("");
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);
  const isAll = params === "all";

  useEffect(() => {
    setSortOption("ล่าสุด");
    setPriceFilter({ min: "", max: "" });
    setStarFilter("");
    setIsFiltered({ price: false, star: false });
    setFilteredProducts([]);
    if (params !== "all") {
      setCategory(
        [...categories].find((category) => category.categoryUUID === params)
      );
      category.products &&
        setSortedProducts(
          [...category.products].sort(
            (a, b) =>
              new Date(b.createDate).getTime() -
              new Date(a.createDate).getTime()
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

  const rateArray = ["5", "4", "3", "2", "1"];

  const handleChangeSort = (event) => {
    event.preventDefault();
    setSortOption(event.target.value);
    if (event.target.value === "ล่าสุด") {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => {
          return (
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
          );
        })
      );
      (isFiltered.price || isFiltered.star) &&
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => {
            return (
              new Date(b.createDate).getTime() -
              new Date(a.createDate).getTime()
            );
          })
        );
    } else if (event.target.value === "ราคาสูงสุด") {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => b.minPrice - a.minPrice)
      );
      (isFiltered.price || isFiltered.star) &&
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => b.minPrice - a.minPrice)
        );
    } else if (event.target.value === "ราคาต่ำสุด") {
      setSortedProducts(
        [...sortedProducts].sort((a, b) => a.minPrice - b.minPrice)
      );
      (isFiltered.price || isFiltered.star) &&
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => a.minPrice - b.minPrice)
        );
    }
  };
  const handlePriceChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    value = value.replace(/\D/g, "");
    if (parseInt(value) > 1000000) {
      value = "1000000";
    } else if (parseInt(value) < 1) {
      value = "1";
    }
    setPriceFilter({
      ...priceFilter,
      [name]: value,
    });
  };
  const handleFilterPrice = () => {
    const min =
      priceFilter.max === priceFilter.min || priceFilter.min < priceFilter.max
        ? parseInt(priceFilter.min)
        : parseInt(priceFilter.max);
    const max =
      priceFilter.max === priceFilter.min || priceFilter.min < priceFilter.max
        ? parseInt(priceFilter.max)
        : parseInt(priceFilter.min);
    isFiltered.star
      ? setFilteredProducts(
          [...filteredProducts].filter(
            (product) => product.minPrice >= min && product.minPrice <= max
          )
        )
      : setFilteredProducts(
          [...sortedProducts].filter(
            (product) => product.minPrice >= min && product.minPrice <= max
          )
        );
    setIsFiltered({ ...isFiltered, price: true });
  };
  const removeFilterPrice = () => {
    isFiltered.star
      ? setFilteredProducts(
          [...sortedProducts].filter(
            (product) => product.reviewScore >= parseInt(starFilter)
          )
        )
      : setFilteredProducts([...sortedProducts]);
    setPriceFilter({ min: "", max: "" });
    setIsFiltered({ ...isFiltered, price: false });
  };
  const handleFilterStar = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (starFilter === name) {
      setStarFilter("");
      setIsFiltered({ ...isFiltered, star: false });
      isFiltered.price
        ? setFilteredProducts(
            [...sortedProducts].filter(
              (product) =>
                product.minPrice >= priceFilter.min &&
                product.minPrice <= priceFilter.max
            )
          )
        : setFilteredProducts([...sortedProducts]);
    } else if (starFilter !== name) {
      setStarFilter(name);
      setIsFiltered({ ...isFiltered, star: true });
      const min =
        priceFilter.max === priceFilter.min || priceFilter.min < priceFilter.max
          ? parseInt(priceFilter.min)
          : parseInt(priceFilter.max);
      const max =
        priceFilter.max === priceFilter.min || priceFilter.min < priceFilter.max
          ? parseInt(priceFilter.max)
          : parseInt(priceFilter.min);
      isFiltered.price
        ? setFilteredProducts(
            [...sortedProducts].filter(
              (product) =>
                product.reviewScore >= parseInt(name) &&
                product.minPrice >= min &&
                product.minPrice <= max
            )
          )
        : setFilteredProducts(
            [...sortedProducts].filter(
              (product) => product.reviewScore >= parseInt(name)
            )
          );
    }
  };
  const parentUUID =
    category && category.level === 1
      ? category.parentCategory.categoryUUID
      : null;
  return (
    <>
      <Stack direction="row" height="100%">
        <Stack direction="column" p={5} spacing={2} sx={{ width: "15%" }}>
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
          <Divider />
          <Box>
            <Typography sx={{ fontSize: "18px", pb: 1 }}>ราคา</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <TextField
                name="min"
                value={priceFilter.min}
                onChange={handlePriceChange}
                InputProps={{
                  sx: { height: "30px", fontSize: "13px" },
                }}
              />
              <Typography>-</Typography>
              <TextField
                name="max"
                value={priceFilter.max}
                onChange={handlePriceChange}
                InputProps={{
                  sx: { height: "30px", fontSize: "13px" },
                }}
              />
              <IconButton
                disabled={priceFilter.max === "" || priceFilter.min === ""}
                onClick={handleFilterPrice}
                sx={{ backgroundColor: "#ffeaec", borderRadius: 1, height: 32 }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Stack>
            {isFiltered.price && (
              <Button onClick={removeFilterPrice} variant="text" color="error">
                ล้าง
              </Button>
            )}
          </Box>
          <Divider />
          <Box>
            <Typography sx={{ fontSize: "18px", pb: 1 }}>คะแนน</Typography>
            <Stack alignItems="flex-start" spacing={0.5}>
              {[...rateArray].map((item, i) => (
                <ButtonBase
                  sx={{ backgroundColor: starFilter === item && "#ffeaec" }}
                  onClick={handleFilterStar}
                  key={i}
                  name={item}
                >
                  <Rating value={parseInt(item)} readOnly size="small" />
                  {item !== "5" && (
                    <Typography sx={{ fontSize: 15, ml: 1 }}>ขึ้นไป</Typography>
                  )}
                </ButtonBase>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Box padding={5} flexGrow={1} width="75%">
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="space-between"
            paddingBottom={5}
          >
            <Typography>
              เจอสินค้า{" "}
              {isFiltered.price || isFiltered.star
                ? filteredProducts.length
                : sortedProducts.length}{" "}
              ชิ้น
            </Typography>
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
            {isFiltered.price || isFiltered.star
              ? filteredProducts.map((item, i) => (
                  <ItemCard product={item} key={i} />
                ))
              : sortedProducts.map((item, i) => (
                  <ItemCard product={item} key={i} />
                ))}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
