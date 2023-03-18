import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Tabs,
  Tab,
  Menu,
  Pagination,
  CardMedia,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserDetail } from "../../../redux/actions/authActions";
import {
  deleteProduct,
  loadProductByMerchant,
} from "../../../redux/actions/productActions";
import FormatPrice from "../../common/FormatPrice";
import { format } from "date-fns";

export default function SellerProductsPage() {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.seller);
  const products = useSelector((state) => state.products.merchantProducts.data);
  const [sortedProducts, setSortedProducts] = useState(
    [...products].sort((a, b) => Date(b.createDate) - Date(a.createDate)) ?? []
  );
  useEffect(() => {
    seller.isAuthentication && dispatch(loadUserDetail("seller", seller.token));
    seller.currentUser.accountUUID &&
      dispatch(loadProductByMerchant(seller.currentUser.accountUUID));
  }, [
    dispatch,
    seller.currentUser.accountUUID,
    seller.isAuthentication,
    seller.token,
  ]);
  useEffect(() => {
    products &&
      setSortedProducts(
        [...products].sort((a, b) => {
          return (
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
          );
        })
      );
  }, [products]);
  const [value, setValue] = useState("all");
  const [sortOption, setSortOption] = useState("ล่าสุด");
  const outOfStockProducts = [
    ...products.filter((product) => product.outOfStock > 0),
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

  function ProductsTableHeadCell({ text }) {
    return (
      <TableCell>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {text}
          </Typography>
        </Stack>
      </TableCell>
    );
  }

  function ProductsTableBody({ product }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleDelete = () => {
      setAnchorEl(null);
      dispatch(deleteProduct(product.productUUID, seller.token));
    };
    var date = new Date(product.createDate);
    return (
      <TableRow>
        <TableCell align="center" sx={{ width: 120 }}>
          <Stack direction="row" pl={5} alignItems="center">
            <CardMedia
              component="img"
              src={product.mainImage.path}
              alt={product.name}
              sx={{ objectFit: "contain", width: 100, height: 100 }}
            />
          </Stack>
        </TableCell>
        <TableCell align="center">
          {product.options.length > 1 ? (
            <Stack sx={{ ml: 1 }} spacing={1}>
              {product.options.map((option, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                >
                  <Typography sx={{ fontSize: "20px" }}>
                    {product.name}
                  </Typography>
                  <Typography sx={{ fontSize: "20px", color: "#ababab" }}>
                    ({option.name})
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "20px", ml: 1 }}>
              {product.name}
            </Typography>
          )}
        </TableCell>
        <TableCell align="center">
          {product.options.length > 1 ? (
            <Stack spacing={1}>
              {product.options.map((option, index) => (
                <Typography
                  key={index}
                  sx={{ fontSize: "20px", color: "#01bfa6" }}
                >
                  {FormatPrice(option.price)}
                </Typography>
              ))}
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "20px", color: "#01bfa6" }}>
              {FormatPrice(product.options[0].price)}
            </Typography>
          )}
        </TableCell>
        <TableCell align="center">
          {product.options.length > 1 ? (
            <Stack spacing={1}>
              {product.options.map((option, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "20px",
                    color: parseInt(option.quantity) === 0 && "red",
                  }}
                >
                  {option.quantity}
                </Typography>
              ))}
            </Stack>
          ) : (
            <Typography
              sx={{
                fontSize: "20px",
                color: parseInt(product.options[0].quantity) === 0 && "red",
              }}
            >
              {product.options[0].quantity}
            </Typography>
          )}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          {product.saleCount}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          {format(date, "dd/MM/yyyy hh:mm")}
        </TableCell>
        <TableCell>
          <Stack>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                getcontentanchorel={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem
                  component={Link}
                  to={"/seller/products/edit/" + product.productUUID}
                >
                  แก้ไขสินค้า
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={"/products/detail/" + product.productUUID}
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={handleClose}
                >
                  ดูหน้าร้านค้า
                </MenuItem>
                <MenuItem onClick={handleDelete}>ลบสินค้า</MenuItem>
              </Menu>
            </Box>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Box bgcolor="white" py={5}>
      <Box mx={4}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography sx={{ fontSize: "30px" }}>สินค้าของคุณ</Typography>
          <Button
            component={Link}
            to={"/seller/products/add"}
            variant="contained"
            sx={{ fontSize: 20 }}
          >
            เพิ่มสินค้าใหม่
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography>หมวดหมู่:</Typography>
            <TextField
              size="small"
              select
              defaultValue="ทั้งหมด"
              sx={{ minWidth: "200px" }}
              inputProps={{
                sx: {
                  height: "7px",
                  fontSize: "14px",
                },
              }}
            >
              <MenuItem key="ทั้งหมด" value="ทั้งหมด">
                ทั้งหมด
              </MenuItem>
            </TextField>
          </Stack>
          <TextField
            sx={{ width: "30%" }}
            placeholder="ค้นหาสินค้า"
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
            InputProps={{
              startadornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Tabs
          sx={{ py: 2 }}
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="all" label={`ทั้งหมด (${products.length})`} />
          <Tab value="out" label={`หมดสต็อก (${outOfStockProducts.length})`} />
        </Tabs>

        <Stack alignItems="center" direction="row" py={2} justifyContent="end">
          <Typography pr={2}>เรียงโดย:</Typography>
          <TextField
            size="small"
            select
            value={sortOption}
            onChange={handleChangeSort}
            sx={{ minWidth: "120px" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120 }} />
              <ProductsTableHeadCell text="สินค้า" />
              <ProductsTableHeadCell text="ราคา" />
              <ProductsTableHeadCell text="เหลือสินค้า" />
              <ProductsTableHeadCell text="ขายไปแล้ว" />
              <ProductsTableHeadCell text="เพิ่มตั้งแต่" />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {value === "all"
              ? sortedProducts &&
                sortedProducts.map((product, index) => (
                  <ProductsTableBody product={product} key={index} />
                ))
              : outOfStockProducts &&
                outOfStockProducts.map((product, index) => (
                  <ProductsTableBody product={product} key={index} />
                ))}
          </TableBody>
        </Table>
        {sortedProducts && sortedProducts.length > 5 && (
          <Stack mt={4} direction="row" justifyContent="space-between">
            <div></div>
            <Pagination
              count={Math.ceil(sortedProducts.length / 5)}
              alignself="end"
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
}
