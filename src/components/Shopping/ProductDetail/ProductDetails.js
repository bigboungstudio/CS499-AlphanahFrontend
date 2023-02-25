import React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function ProductDetails({ product }) {
  return (
    <Box bgcolor="white" padding={5}>
      <Typography sx={{ fontSize: "24px" }}>รายละเอียดสินค้า</Typography>
      <Divider />
      <Box mt={3} flexGrow={1}>
        <Typography whiteSpace="pre-line">{product.description}</Typography>
      </Box>
    </Box>
  );
}
