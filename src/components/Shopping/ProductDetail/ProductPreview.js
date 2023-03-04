import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  Divider,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ProductImage from "./ProductImage";
import { Link } from "react-router-dom";
import FormatPrice from "../../common/FormatPrice";

export default function ProductPreview({ product, isAuthentication }) {
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState(0);
  const handleOption = (event, newOption) => {
    if (newOption !== null) {
      setOption(newOption);
      setQuantity(1);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (parseInt(value) > product.options[option].quantity) {
      setQuantity(product.options[option].quantity);
    } else if (parseInt(value) < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
      }}
    >
      <Box px={6} py={9} width="30%">
        <ProductImage product={product} />
      </Box>
      <Box flexDirection="column" padding={10}>
        <Typography variant="h4" component="div">
          {product.name}
        </Typography>
        <Typography
          paddingTop={5}
          fontWeight="bold"
          variant="h4"
          component="div"
          color="primary"
        >
          {FormatPrice(product.options[option].price)}
        </Typography>
        <Box
          sx={{
            py: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            defaultValue={parseInt(product.reviewScore)}
            precision={0.5}
            readOnly
            size="small"
          />
          <Box sx={{ ml: 2 }}>({product.reviews.length})</Box>
        </Box>
        <Divider />
        {product.options.length === 1 ? (
          <></>
        ) : (
          <ToggleButtonGroup
            sx={{ mt: 2 }}
            value={option}
            onChange={handleOption}
            exclusive
          >
            {product.options.map((item, i) => (
              <ToggleButton key={i} value={i}>
                {item.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
        <Box
          sx={{
            pt: 3,
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
            onChange={handleChange}
          />
          <IconButton
            disabled={quantity >= parseInt(product.options[option].quantity)}
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
            เหลือสินค้า {product.options[option].quantity} ชิ้น
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
          to={isAuthentication ? "/cart" : "/buyer/login"}
        >
          เพิ่มในรถเข็น
        </Button>
      </Box>
    </Box>
  );
}
