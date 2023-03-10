import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, TextField, Typography, Box } from "@mui/material";

export default function SellerCouponDatePicker({
  formValues,
  handleStartDateChange,
  handleEndDateChange,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row">
        <Box sx={{ width: "15%" }}></Box>
        <Stack direction="row" alignItems="center" spacing={3}>
          <DateTimePicker
            ampm={false}
            label="วันเริ่มใช้งาน"
            disablePast
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            value={formValues.startDate}
            showDaysOutsideCurrentMonth
          />

          <Typography>ถึง</Typography>
          <DateTimePicker
            ampm={false}
            minDate={formValues.startDate}
            label="วันหมดอายุ"
            disablePast
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
            value={formValues.endDate}
            showDaysOutsideCurrentMonth
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}
