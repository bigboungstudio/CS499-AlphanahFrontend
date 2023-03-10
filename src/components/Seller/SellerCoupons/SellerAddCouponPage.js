import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCoupon } from "../../../redux/actions/couponActions";

export default function SellerAddCouponPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seller = useSelector((state) => state.auth.seller);
  const now = new Date();
  now.setSeconds(0);
  const initialValues = {
    code: "",
    type: "PERCENTAGE_DISCOUNT",
    value: "",
    startDate: null,
    endDate: null,
    maxUse: null,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isUnlimitedUsage, setIsUnlimitedUsage] = React.useState(true);
  const handleUnlimitedUsageChange = (event) => {
    if (event.target.value === "1") {
      setIsUnlimitedUsage(true);
      setFormValues({
        ...formValues,
        maxUse: null,
      });
    } else {
      setIsUnlimitedUsage(false);
      setFormValues({
        ...formValues,
        maxUse: "",
      });
    }
  };
  const [isNoExpireDate, setNoExpireDate] = React.useState(true);
  const handleNoExpireDateChange = (event) => {
    if (event.target.value === "1") {
      setNoExpireDate(true);
      setFormValues({
        ...formValues,
        startDate: null,
        endDate: null,
      });
    } else {
      setNoExpireDate(false);
      setFormValues({
        ...formValues,
        startDate: now,
        endDate: now,
      });
    }
  };
  const handleCouponTypeChange = (event) => {
    setFormValues({
      ...formValues,
      type: event.target.value,
      value: event.target.value === "FREE_SHIPPING" ? null : "",
    });
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "value" || name === "maxUse") {
      value = value.replace(/\D/g, "");
      if (formValues.type === "PERCENTAGE_DISCOUNT") {
        if (parseInt(value) > 100) {
          value = "100";
        } else if (parseInt(value) < 1) {
          value = "1";
        }
      } else if (formValues.type === "GIFT_CARD" || name === "maxUse") {
        if (parseInt(value) > 1000000) {
          value = "1000000";
        } else if (parseInt(value) < 1) {
          value = "1";
        }
      }
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleStartDateChange = (e) => {
    setFormValues({
      ...formValues,
      startDate: e,
    });
  };
  const handleEndDateChange = (e) => {
    setFormValues({
      ...formValues,
      endDate: e,
    });
  };
  const handleSubmit = () => {
    const formatDate = (value) => {
      const date = new Date(value.toISOString());
      const offsetMinutes = date.getTimezoneOffset();
      const offsetHours = Math.abs(offsetMinutes / 60);
      const offsetSign = offsetMinutes > 0 ? "-" : "+";
      const offsetString = `${offsetSign}${String(offsetHours).padStart(
        2,
        "0"
      )}:${String(Math.abs(offsetMinutes % 60)).padStart(2, "0")}`;

      const isoString = date.toISOString().replace("Z", offsetString);
      return isoString;
    };
    // console.log(formatDate(formValues.startDate));
    // console.log(formatDate(formValues.endDate));

    const newFormValues = {
      ...formValues,
      startDate: formValues.startDate ? formatDate(formValues.startDate) : null,
      endDate: formValues.endDate ? formatDate(formValues.endDate) : null,
    };
    newFormValues.value === null && delete newFormValues.value;
    newFormValues.startDate === null && delete newFormValues.startDate;
    newFormValues.endDate === null && delete newFormValues.endDate;
    newFormValues.maxUse === null && delete newFormValues.maxUse;
    dispatch(
      addCoupon(newFormValues, seller.token, () => navigate("/seller/coupons"))
    );
  };

  return (
    <Stack spacing={4}>
      <Stack bgcolor="white" padding={5} spacing={3}>
        <Typography sx={{ fontSize: "30px", py: 2 }}>เพิ่มคูปองใหม่</Typography>

        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>รหัสคูปอง *</Typography>
          <TextField
            type="text"
            name="code"
            value={formValues.code}
            onChange={handleInputChange}
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
                  checked={formValues.type === "PERCENTAGE_DISCOUNT"}
                  value="PERCENTAGE_DISCOUNT"
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
                  checked={formValues.type === "GIFT_CARD"}
                  value="GIFT_CARD"
                  onChange={handleCouponTypeChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
            <FormControlLabel
              label="ฟรีค่าส่ง"
              control={
                <Checkbox
                  checked={formValues.type === "FREE_SHIPPING"}
                  value="FREE_SHIPPING"
                  onChange={handleCouponTypeChange}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />
              }
            />
          </Stack>
        </Stack>
        {formValues.type !== "FREE_SHIPPING" && (
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: "15%" }} />
            <TextField
              placeholder={
                formValues.type === "PERCENTAGE_DISCOUNT"
                  ? "ระบุส่วนลด (เปอร์เซ็นต์)"
                  : formValues.type === "GIFT_CARD" &&
                    "ระบุจำนวนเงินที่ลด (บาท)"
              }
              value={formValues.value}
              name="value"
              onChange={handleInputChange}
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
              name="maxUse"
              value={formValues.maxUse}
              onChange={handleInputChange}
              placeholder="ระบุจำนวนการใช้งาน"
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
        {!isNoExpireDate && (
          <SellerCouponDatePicker
            formValues={formValues}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
          />
        )}
      </Stack>

      <Box sx={{ pb: 5 }}>
        <Button
          onClick={handleSubmit}
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
