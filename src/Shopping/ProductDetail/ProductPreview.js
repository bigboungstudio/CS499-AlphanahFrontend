import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ProductImage from "./ProductImage";
import { Link } from "react-router-dom";

export default function ProductPreview() {
  const [quantity, setQuantity] = useState(1);
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
      }}
    >
      <Box px={6} py={9} width="30%">
        <ProductImage />
      </Box>
      <Box flexDirection="column" padding={10}>
        <Typography variant="h4" component="div">
          Diamond sword
        </Typography>
        <Typography
          paddingTop={5}
          fontWeight="bold"
          variant="h4"
          component="div"
          color="primary"
        >
          ฿99.99
        </Typography>
        <Box
          sx={{
            py: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating defaultValue={2.5} precision={0.5} readOnly size="small" />
          <Box sx={{ ml: 2 }}>(666)</Box>
        </Box>
        <Divider />
        <Box
          sx={{
            pt: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ pr: 3 }}>จำนวน</Typography>
          <IconButton
            disabled={quantity === 1}
            sx={{
              borderRadius: 0,
              backgroundColor: "#f5f5f5",
            }}
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            type="tel"
            inputProps={{
              style: {
                height: "7px",
                width: "30px",
                textAlign: "center",
              },
            }}
            value={quantity}
          />
          <IconButton
            sx={{
              borderRadius: 0,
              backgroundColor: "#f5f5f5",
            }}
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography ml={3} color="#ababab">
            เหลือสินค้า 2 ชิ้น
          </Typography>
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#faaf00",
                },
                "&:hover fieldset": {
                  borderColor: "#faaf00",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#faaf00",
                },
              },
            }}
            InputProps={{
              style: { height: "40px", fontSize: "16px" },
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    sx={{
                      color: "#faaf00",
                      "&:hover": {
                        backgroundColor: "#fff7d1",
                      },
                    }}
                    variant="text"
                  >
                    ใช้งาน
                  </Button>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumberIcon sx={{ color: "#faaf00" }} />
                </InputAdornment>
              ),
            }}
            placeholder="กรอกคูปอง"
          /> */}
        </Box>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          size="large"
          component={Link}
          to={"/cart"}
        >
          เพิ่มในรถเข็น
        </Button>
      </Box>
    </Box>
  );
}
