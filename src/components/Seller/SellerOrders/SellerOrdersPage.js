import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CardMedia,
  Pagination,
  Button,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SellerOrderDetail from "./SellerOrderDetail";
import { useSelector, useDispatch } from "react-redux";
import { loadSalesOrder } from "../../../redux/actions/orderActions";
import FormatPrice from "../../common/FormatPrice";

export default function SellerOrdersPage() {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.seller);
  const salesOrders = useSelector((state) => state.order.salesOrder.data);
  const [value, setValue] = useState("all");
  const [sortOption, setSortOption] = useState("ล่าสุด");
  useEffect(() => {
    dispatch(loadSalesOrder(seller.token));
  }, [dispatch, seller.token]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeSort = (event) => {
    setSortOption(event.target.value);
    if (event.target.value === "ล่าสุด") {
    } else if (event.target.value === "ราคาสูงสุด") {
    } else if (event.target.value === "ราคาต่ำสุด") {
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

  function HistoryTableBody({ order }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <TableRow>
        <TableCell align="center">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <CardMedia
              component="img"
              alt={order.product.name}
              src={order.product.mainImage.path}
              sx={{
                objectFit: "contain",
                width: 100,
                height: 80,
              }}
            />

            <Typography sx={{ fontSize: "20px" }}>
              {order.product.name}
            </Typography>
            <Typography sx={{ fontSize: "20px" }}>x{order.quantity}</Typography>
          </Stack>
        </TableCell>

        <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
          {FormatPrice(order.price)}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#FB6376" }}>
          {order.deliveryStatus}
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={handleClickOpen}
            sx={{ fontSize: "20px", color: "black" }}
          >
            ดูรายละเอียด
          </Button>
          <SellerOrderDetail
            order={order.order}
            open={open}
            handleClose={handleClose}
          />
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "blue" }}>
          จัดส่ง
        </TableCell>
      </TableRow>
    );
  }
  return (
    <Box bgcolor="white" py={5}>
      <Box mx={4}>
        <Typography sx={{ fontSize: "30px", mb: 3 }}>
          คำสั่งซื้อของลูกค้า
        </Typography>

        <Stack direction="row" alignItems="center">
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
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Tabs
          sx={{ pt: 2 }}
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="all" label="ทั้งหมด (10)" />
          <Tab value="needship" label="รอจัดส่ง (4)" />
          <Tab value="shipping" label="กำลังจัดส่ง (4)" />
          <Tab value="done" label="เสร็จสมบูรณ์ (2)" />
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
              <ProductsTableHeadCell text="สินค้า" />
              <ProductsTableHeadCell text="ราคารวม" />
              <ProductsTableHeadCell text="สถานะ" />
              <ProductsTableHeadCell text="รายละเอียดลูกค้า" />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {salesOrders &&
              salesOrders.map((salesOrder, index) => (
                <HistoryTableBody key={index} order={salesOrder} />
              ))}
          </TableBody>
        </Table>
        {salesOrders && salesOrders.length > 5 && (
          <Stack mt={4} direction="row" justifyContent="space-between">
            <div></div>
            <Pagination
              count={Math.ceil(salesOrders.length / 5)}
              alignself="end"
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
}
