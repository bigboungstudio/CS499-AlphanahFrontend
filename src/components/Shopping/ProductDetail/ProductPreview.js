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
  Stack,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ProductImage from "./ProductImage";
import FormatPrice from "../../common/FormatPrice";
import { useSelector } from "react-redux";

export default function ProductPreview({ isAuthentication, handleClick }) {
  const product = useSelector((state) => state.products.oneProduct);
  const cart = useSelector((state) => state.order.cart);
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
  const isInCart = cart.cartItems.find(
    (item) =>
      item.product.productUUID === product.productUUID &&
      item.option.optionUUID === product.options[option].optionUUID
  );
  const addDisable =
    !isAuthentication || (isAuthentication && isInCart ? true : false);
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
            value={parseInt(product.reviewScore) ?? 5}
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
        ></Box>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Button
            disabled={addDisable}
            variant="contained"
            size="large"
            onClick={() =>
              handleClick({
                productUUID: product.productUUID,
                optionUUID: product.options[option].optionUUID,
                quantity: quantity,
              })
            }
          >
            เพิ่มในรถเข็น
          </Button>
          {!isAuthentication && <Typography>กรุณาเข้าสู่ระบบก่อน</Typography>}
          {isAuthentication && isInCart && (
            <Typography>คุณมีสินค้านี้ในรถเข็นแล้ว</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
