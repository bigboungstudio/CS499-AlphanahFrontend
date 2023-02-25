import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, TextField, Typography, Box } from "@mui/material";

export default function SellerCouponDatePicker() {
  const [startValue, setStartValue] = React.useState(new Date());
  const handleStartChange = (newValue) => {
    setStartValue(newValue);
  };
  const [endValue, setEndValue] = React.useState(new Date());
  const handleEndChange = (newValue) => {
    setEndValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row">
        <Box sx={{ width: "15%" }}></Box>
        <Stack direction="row" alignItems="center" spacing={3}>
          <DesktopDatePicker
            disablePast
            label="วันเริ่มใช้งาน"
            inputFormat="DD/MM/YYYY"
            value={startValue}
            onChange={handleStartChange}
            renderInput={(params) => <TextField {...params} />}
            showDaysOutsideCurrentMonth
            views={["month", "year", "day"]}
          />
          <Typography>ถึง</Typography>
          <DesktopDatePicker
            disablePast
            label="วันหมดอายุ"
            inputFormat="DD/MM/YYYY"
            value={endValue}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} />}
            showDaysOutsideCurrentMonth
            views={["month", "year", "day"]}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}
