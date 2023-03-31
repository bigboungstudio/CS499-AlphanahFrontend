import { Box, Stack, Typography, TextField } from "@mui/material";

export default function NewOption({
  option,
  handleOptionChange,
  error = null,
}) {
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
          FormHelperTextProps={{ style: { backgroundColor: "#f5f5f5" } }}
          {...(error &&
            error.name && {
              error: true,
              helperText: error.name,
            })}
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
            FormHelperTextProps={{ style: { backgroundColor: "#f5f5f5" } }}
            {...(error &&
              error.price && {
                error: true,
                helperText: error.price,
              })}
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
            FormHelperTextProps={{ style: { backgroundColor: "#f5f5f5" } }}
            {...(error &&
              error.quantity && {
                error: true,
                helperText: error.quantity,
              })}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
