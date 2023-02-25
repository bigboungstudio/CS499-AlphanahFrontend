import { Box, Avatar, Typography, Button, Stack, Divider } from "@mui/material";
import React from "react";
export default function ProductOwner({ product }) {
  return (
    <Stack bgcolor="white" direction="row" padding={5} spacing={4}>
      <Avatar
        alt={product.creator.firstname}
        src={product.creator.image}
        sx={{
          width: 70,
          height: 70,
        }}
      />
      <Box>
        <Typography color="#ababab" fontSize="12px">
          ขายโดย
        </Typography>
        <Typography
          mb={1}
        >{`${product.creator.firstname} ${product.creator.lastname}`}</Typography>
        <Button variant="outlined">ดูร้านค้า</Button>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Stack spacing={2}>
        <Box display="flex" alignItems="center">
          <Typography pr={1}>รายการสินค้า: </Typography>
          <Typography color="primary" fontSize="20px">
            100
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography pr={1}>คะแนนสินค้า: </Typography>
          <Typography color="primary" fontSize="20px">
            2,000
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
