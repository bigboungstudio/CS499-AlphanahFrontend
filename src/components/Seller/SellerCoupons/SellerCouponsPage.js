import React, { useEffect, useState } from "react";
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
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserDetail } from "../../../redux/actions/authActions";
import { loadCouponsByValue } from "../../../redux/actions/couponActions";
import { format } from "date-fns";
import { deleteCoupon } from "../../../redux/actions/couponActions";

export default function SellerCouponsPage() {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.seller);
  const coupons = useSelector((state) => state.coupons);
  const initialValues = {
    type: "all",
    type2: "all",
  };
  const [formValues, setFormValues] = useState(initialValues);
  useEffect(() => {
    seller.isAuthentication && dispatch(loadUserDetail("seller", seller.token));
  }, [dispatch, seller.isAuthentication, seller.token]);
  useEffect(() => {
    seller.currentUser.accountUUID &&
      dispatch(
        loadCouponsByValue(
          formValues.type === "all" ? "" : `&type=${formValues.type}`,
          formValues.type2 === "all" ? "" : formValues.type2,
          seller.currentUser.accountUUID,
          seller.token
        )
      );
  }, [
    dispatch,
    formValues.type,
    formValues.type2,
    seller.currentUser.accountUUID,
    seller.token,
  ]);

  const handleChange = (event, newValue) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleChangeType2 = (event, newValue) => {
    setFormValues({ ...formValues, type2: newValue });
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

  function ProductsTableBody({ coupon }) {
    var startDate = new Date(coupon.startDate);
    var endDate = new Date(coupon.endDate);
    const handleDelete = () => {
      dispatch(deleteCoupon(coupon.couponCode, seller.token));
    };
    return (
      <TableRow>
        <TableCell align="center">
          <Typography sx={{ fontSize: "20px" }}>{coupon.couponCode}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#FB6376" }}>
          {coupon.type === "PERCENTAGE_DISCOUNT"
            ? "คูปองส่วนลด"
            : coupon.type === "GIFT_CARD"
            ? "คูปองเงินสด"
            : "ฟรีค่าส่ง"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
          {coupon.type === "FREE_SHIPPING"
            ? "FREE"
            : coupon.type === "GIFT_CARD"
            ? `฿${coupon.value}`
            : `${coupon.value}%`}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          {coupon.maxUse ?? "ไม่จำกัด"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          {coupon.endDate
            ? format(startDate, "dd/MM/yyyy hh:mm")
            : "ไม่จำกัดเวลา"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          {coupon.endDate
            ? format(endDate, "dd/MM/yyyy hh:mm")
            : "ไม่จำกัดเวลา"}
        </TableCell>
        <TableCell>
          <Stack>
            <IconButton onClick={handleDelete} sx={{ color: "#FB6376" }}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <Box bgcolor="white" py={5}>
      <Box mx={4}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography sx={{ fontSize: "30px" }}>คูปองของคุณ</Typography>
          <Button
            component={Link}
            to={"/seller/coupons/add"}
            variant="contained"
            sx={{ fontSize: 20 }}
          >
            เพิ่มคูปองใหม่
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography>ประเภท:</Typography>
            <TextField
              name="type"
              size="small"
              select
              value={formValues.type}
              onChange={handleChange}
              sx={{ minWidth: "200px" }}
              inputProps={{
                sx: {
                  height: "7px",
                  fontSize: "14px",
                },
              }}
            >
              <MenuItem key="ทั้งหมด" value="all">
                ทุกประเภท
              </MenuItem>
              <MenuItem key="ส่วนลด" value="PERCENTAGE_DISCOUNT">
                คูปองส่วนลด
              </MenuItem>
              <MenuItem key="เงินสด" value="GIFT_CARD">
                คูปองเงินสด
              </MenuItem>
              <MenuItem key="ค่าส่ง" value="FREE_SHIPPING">
                ฟรีค่าส่ง
              </MenuItem>
            </TextField>
          </Stack>
          <TextField
            sx={{ width: "30%" }}
            placeholder="ค้นหารหัสคูปอง"
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
          name="type2"
          value={formValues.type2}
          onChange={handleChangeType2}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="all" label="ทั้งหมด" />
          <Tab value="&started=true" label="ใช้งานได้แล้ว" />
          <Tab value="&expired=true" label="หมดอายุ" />
          <Tab value="&runOut=true" label="ถูกใช้หมด" />
        </Tabs>
        {Object.keys(coupons).length !== 0 && coupons !== undefined && (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <ProductsTableHeadCell text="รหัสคูปอง" />
                  <ProductsTableHeadCell text="ประเภท" />
                  <ProductsTableHeadCell text="ส่วนลด" />
                  <ProductsTableHeadCell text="จำนวนการใช้งาน" />
                  <ProductsTableHeadCell text="เริ่มใช้งานได้" />
                  <ProductsTableHeadCell text="หมดอายุ" />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.data &&
                  coupons.data.map(
                    (coupon, index) =>
                      !coupon.softDelete && (
                        <ProductsTableBody key={index} coupon={coupon} />
                      )
                  )}
              </TableBody>
            </Table>
            {coupons.data && coupons.data.length > 5 && (
              <Stack mt={4} direction="row" justifyContent="space-between">
                <div></div>
                <Pagination
                  count={Math.ceil(coupons.data.length / 5)}
                  alignself="end"
                />
              </Stack>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
