import { Box, Avatar, Typography, Button, Stack, Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
        <Button
          variant="outlined"
          component={Link}
          to={`/merchant/${product.creator.accountUUID}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          ดูร้านค้า
        </Button>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <StorefrontIcon />
          <Typography>รายการสินค้า: </Typography>
          <Typography color="primary" fontSize="20px">
            {product.creator.productCount}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <StarBorderIcon />
          <Typography>คะแนนสินค้า: </Typography>
          <Typography color="primary" fontSize="20px">
            {product.creator.reviewCount}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
