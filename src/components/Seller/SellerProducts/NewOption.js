import { Box, Stack, Typography, TextField } from "@mui/material";

export default function NewOption({ option, handleOptionChange }) {
  return (
    <Box width="95%">
      <Stack direction="row" alignItems="center" spacing={2} pb={3}>
        <Typography>รายละเอียดตัวเลือก *</Typography>
        <TextField
          id={option.id}
          type="text"
          name="name"
          onChange={handleOptionChange}
          placeholder="ระบุรายละเอียดตัวเลือก"
          value={option.name}
          sx={{ minWidth: "50%", bgcolor: "white" }}
          inputProps={{
            maxLength: 120,
            sx: {
              height: "7px",
              fontSize: "14px",
            },
          }}
        />
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>ราคา *</Typography>
          <TextField
            id={option.id}
            name="price"
            onChange={handleOptionChange}
            placeholder="ระบุราคาตัวเลือก"
            value={option.price}
            sx={{ bgcolor: "white" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>จำนวน *</Typography>
          <TextField
            id={option.id}
            name="quantity"
            onChange={handleOptionChange}
            placeholder="ระบุจำนวนตัวเลือก"
            value={option.quantity}
            sx={{ bgcolor: "white" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
