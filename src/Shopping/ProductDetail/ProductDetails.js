import React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function ProductDetails() {
  return (
    <Box bgcolor="white" padding={5}>
      <Typography sx={{ fontSize: "24px" }}>รายละเอียดสินค้า</Typography>
      <Divider />
      <Box mt={3} flexGrow={1}>
        <Typography whiteSpace="pre-line">
          {` Diamond sword is a sword that made with 1 stick and 2 diamonds which is rare.
          So this make it's to be the most powerful sword in minecraft.

          Official Minecraft Store
          Made in: China`}
        </Typography>
      </Box>
    </Box>
  );
}
