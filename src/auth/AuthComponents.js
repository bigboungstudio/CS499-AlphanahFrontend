import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

export function AuthTextField({ label }) {
  return <TextField placeholder={label} sx={{ width: "100%" }}></TextField>;
}

export function AuthButton({ label, component, to }) {
  return (
    <Button
      sx={{ maxWidth: "40%", fontSize: 20 }}
      variant="contained"
      size="large"
      component={component}
      to={to}
    >
      {label}
    </Button>
  );
}
export function TextFieldForm({ head, placeholder }) {
  return (
    <Box>
      <Typography sx={{ fontSize: "16px", pb: 1 }}>{head}</Typography>
      <TextField
        placeholder={placeholder}
        fullWidth
        inputProps={{
          sx: {
            height: "7px",
            fontSize: "14px",
          },
        }}
      />
    </Box>
  );
}
