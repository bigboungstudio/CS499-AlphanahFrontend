import React from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import SellerCouponDatePicker from "./SellerCouponDatePicker";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Link } from "react-router-dom";

export default function SellerAddCouponPage() {
  const [isUnlimitedUsage, setIsUnlimitedUsage] = React.useState(true);
  const handleUnlimitedUsageChange = (event) => {
    if (event.target.value === "1") {
      setIsUnlimitedUsage(true);
    } else {
      setIsUnlimitedUsage(false);
    }
  };
  const [isNoExpireDate, setNoExpireDate] = React.useState(true);
  const handleNoExpireDateChange = (event) => {
    if (event.target.value === "1") {
      setNoExpireDate(true);
    } else {
      setNoExpireDate(false);
    }
  };
  const [couponType, setCouponType] = React.useState("0");
  const handleCouponTypeChange = (event) => {
    setCouponType(event.target.value);
  };

  return (
    <Stack spacing={4}>
      <Stack bgcolor="white" padding={5} spacing={3}>
        <Typography sx={{ fontSize: "30px", py: 2 }}>เพิ่มคูปองใหม่</Typography>

        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>รหัสคูปอง *</Typography>
          <TextField
            placeholder="ระบุรหัสคูปอง"
            sx={{ minWidth: "50%" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>ประเภทของคูปอง *</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FormControlLabel
              label="คูปองส่วนลด"
              control={
                <Checkbox
                  checked={couponType === "0"}
                  value="0"
                  onChange={handleCouponTypeChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
            <FormControlLabel
              label="คูปองเงินสด"
              control={
                <Checkbox
                  checked={couponType === "1"}
                  value="1"
                  onChange={handleCouponTypeChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
            <FormControlLabel
              label="คูปองค่าส่ง"
              control={
                <Checkbox
                  checked={couponType === "2"}
                  value="2"
                  onChange={handleCouponTypeChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Box sx={{ width: "15%" }} />
          <TextField
            placeholder={
              couponType === "0"
                ? "ระบุส่วนลด (เปอร์เซ็นต์)"
                : couponType === "1"
                ? "ระบุจำนวนเงินที่ลด (บาท)"
                : "ระบุค่าส่งที่ลด (บาท)"
            }
            type="tel"
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>จำนวนการใช้งาน *</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FormControlLabel
              label="ไม่จำกัด"
              control={
                <Checkbox
                  checked={isUnlimitedUsage}
                  value="1"
                  onChange={handleUnlimitedUsageChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
            <FormControlLabel
              label="จำกัด"
              control={
                <Checkbox
                  checked={!isUnlimitedUsage}
                  value="0"
                  onChange={handleUnlimitedUsageChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
          </Stack>
        </Stack>
        {!isUnlimitedUsage && (
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: "15%" }} />
            <TextField
              placeholder="ระบุจำนวนการใช้งาน"
              type="tel"
              inputProps={{
                sx: {
                  height: "7px",
                  fontSize: "14px",
                },
              }}
            />
          </Stack>
        )}
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>ระยะเวลาที่ใช้งานได้ *</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FormControlLabel
              label="ไม่จำกัด"
              control={
                <Checkbox
                  checked={isNoExpireDate}
                  value="1"
                  onChange={handleNoExpireDateChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
            <FormControlLabel
              label="จำกัด"
              control={
                <Checkbox
                  checked={!isNoExpireDate}
                  value="0"
                  onChange={handleNoExpireDateChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
          </Stack>
        </Stack>
        {!isNoExpireDate && <SellerCouponDatePicker />}
      </Stack>

      <Box sx={{ pb: 5 }}>
        <Button
          component={Link}
          to={"/seller/coupons"}
          variant="contained"
          sx={{ width: "15%", fontSize: 20, mr: 5 }}
        >
          เพิ่ม
        </Button>
        <Button
          component={Link}
          to={"/seller/coupons"}
          variant="outlined"
          sx={{ width: "15%", fontSize: 20 }}
        >
          ยกเลิก
        </Button>
      </Box>
    </Stack>
  );
}
