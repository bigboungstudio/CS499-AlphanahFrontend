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
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SellerOrderDetail from "./SellerOrderDetail";
import { useSelector, useDispatch } from "react-redux";
import {
  loadSalesOrder,
  updateSalesOrder,
} from "../../../redux/actions/orderActions";
import FormatPrice from "../../common/FormatPrice";

export default function SellerOrdersPage() {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.seller);
  const salesOrders = useSelector((state) => state.order.salesOrder);
  const [value, setValue] = useState("all");
  useEffect(() => {
    dispatch(loadSalesOrder(seller.token));
  }, [dispatch, seller.token]);
  const [sortedOrders, setSortedOrders] = useState([]);
  useEffect(() => {
    Object.keys(salesOrders).length !== 0 &&
    salesOrders !== undefined &&
    value === "all"
      ? setSortedOrders(
          [...salesOrders.data].sort((a, b) => {
            return (
              new Date(b.order.checkoutDate).getTime() -
              new Date(a.order.checkoutDate).getTime()
            );
          })
        )
      : setSortedOrders(
          [...salesOrders.data]
            .filter((order) => order.deliveryStatus === value)
            .sort((a, b) => {
              return (
                new Date(b.order.checkoutDate).getTime() -
                new Date(a.order.checkoutDate).getTime()
              );
            })
        );
  }, [salesOrders, value]);
  const [sortOption, setSortOption] = useState("ล่าสุด");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSortOption("ล่าสุด");
    if (newValue === "all") {
      setSortedOrders(
        [...salesOrders.data].sort((a, b) => {
          return (
            new Date(b.order.checkoutDate).getTime() -
            new Date(a.order.checkoutDate).getTime()
          );
        })
      );
    } else {
      setSortedOrders(
        [...salesOrders.data]
          .filter((order) => order.deliveryStatus === newValue)
          .sort((a, b) => {
            return (
              new Date(b.order.checkoutDate).getTime() -
              new Date(a.order.checkoutDate).getTime()
            );
          })
      );
    }
  };
  const handleChangeSort = (event) => {
    setSortOption(event.target.value);
    if (event.target.value === "ล่าสุด") {
      setSortedOrders(
        [...sortedOrders].sort((a, b) => {
          return (
            new Date(b.order.checkoutDate).getTime() -
            new Date(a.order.checkoutDate).getTime()
          );
        })
      );
    } else if (event.target.value === "ราคาสูงสุด") {
      setSortedOrders([...sortedOrders].sort((a, b) => b.price - a.price));
    } else if (event.target.value === "ราคาต่ำสุด") {
      setSortedOrders([...sortedOrders].sort((a, b) => a.price - b.price));
    }
  };
  const formatStatus = (value) => {
    if (value === "PENDING") {
      return "รอจัดส่ง";
    } else if (value === "SHIPPED") {
      return "จัดส่งแล้ว";
    } else {
      return "ได้รับสินค้าแล้ว";
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
    const [loading, setLoading] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleChangeStatus = () => {
      setLoading(true);
      dispatch(
        updateSalesOrder(order.orderItemUUID, seller.token, () =>
          setLoading(false)
        )
      );
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
            <Box>
              <Typography sx={{ fontSize: "20px" }}>
                {order.product.name}
              </Typography>
              {order.product.options.length !== 1 && (
                <Typography sx={{ fontSize: "18px" }}>
                  ({order.option.name})
                </Typography>
              )}
            </Box>
            <Typography sx={{ fontSize: "20px" }}>x{order.quantity}</Typography>
          </Stack>
        </TableCell>

        <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
          {FormatPrice(order.price)}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#FB6376" }}>
          {formatStatus(order.deliveryStatus)}
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
        <TableCell>
          {order.deliveryStatus !== "DELIVERED" && (
            <Button
              disabled={loading}
              onClick={handleChangeStatus}
              type="text"
              sx={{ fontSize: "20px", color: "blue" }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : order.deliveryStatus === "PENDING" ? (
                "จัดส่ง"
              ) : (
                "ได้รับสินค้าแล้ว"
              )}
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }
  return (
    <>
      {Object.keys(salesOrders).length !== 0 && salesOrders !== undefined ? (
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
              <Tab value="all" label={`ทั้งหมด (${salesOrders.data.length})`} />
              <Tab
                value="PENDING"
                label={`รอจัดส่ง (${
                  salesOrders.data.filter(
                    (order) => order.deliveryStatus === "PENDING"
                  ).length
                })`}
              />
              <Tab
                value="SHIPPED"
                label={`จัดส่งแล้ว (${
                  salesOrders.data.filter(
                    (order) => order.deliveryStatus === "SHIPPED"
                  ).length
                })`}
              />
              <Tab
                value="DELIVERED"
                label={`ได้รับสินค้าแล้ว (${
                  salesOrders.data.filter(
                    (order) => order.deliveryStatus === "DELIVERED"
                  ).length
                })`}
              />
            </Tabs>

            <Stack
              alignItems="center"
              direction="row"
              py={2}
              justifyContent="end"
            >
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
                {sortedOrders.map((salesOrder, index) => (
                  <HistoryTableBody key={index} order={salesOrder} />
                ))}
              </TableBody>
            </Table>
            {sortedOrders.length > 5 && (
              <Stack mt={4} direction="row" justifyContent="space-between">
                <div></div>
                <Pagination
                  count={Math.ceil(sortedOrders.length / 5)}
                  alignself="end"
                />
              </Stack>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress
            sx={{ alignSelf: "center", justifySelf: "center" }}
          />
        </Box>
      )}
    </>
  );
}
