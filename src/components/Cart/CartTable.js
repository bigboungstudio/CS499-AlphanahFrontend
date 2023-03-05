import React, { useState } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Stack,
  Box,
  Typography,
  IconButton,
  TextField,
  Avatar,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FormatPrice from "../common/FormatPrice";

function Item({ item, handleRemoveItem, handleUpdateItem }) {
  const [quantity, setQuantity] = useState(parseInt(item.quantity));
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (parseInt(value) > item.option.quantity) {
      handleUpdateItem({
        quantity: item.option.quantity,
        productUUID: item.product.productUUID,
        optionUUID: item.option.optionUUID,
        orderItemUUID: item.orderItemUUID,
      });
      setQuantity(item.option.quantity);
    } else if (parseInt(value) < 1) {
      handleUpdateItem({
        quantity: "1",
        productUUID: item.product.productUUID,
        optionUUID: item.option.optionUUID,
        orderItemUUID: item.orderItemUUID,
      });
      setQuantity(1);
    } else if (value === "") {
      setQuantity(value);
    } else {
      handleUpdateItem({
        quantity: value,
        productUUID: item.product.productUUID,
        optionUUID: item.option.optionUUID,
        orderItemUUID: item.orderItemUUID,
      });
      setQuantity(value);
    }
  };
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Stack direction="row" pl={10} alignItems="center">
            <Avatar
              alt={item.product.name}
              src={item.product.mainImage.path}
              sx={{
                width: 120,
                height: 120,
                pr: 10,
              }}
            />

            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                {item.product.name}
              </Typography>
              <Typography sx={{ fontSize: "18px" }}>
                ({item.option.name})
              </Typography>

              <Typography sx={{ color: "#ababab" }}>
                {item.product.creator.firstname +
                  " " +
                  item.product.creator.lastname}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
          <Stack direction="row" alignItems="center">
            <IconButton
              disabled={parseInt(quantity) === 1}
              sx={{
                borderRadius: 0,
                backgroundColor: "#f5f5f5",
              }}
              onClick={() => {
                handleUpdateItem({
                  quantity: parseInt(quantity) - 1,
                  productUUID: item.product.productUUID,
                  optionUUID: item.option.optionUUID,
                  orderItemUUID: item.orderItemUUID,
                });
                setQuantity(parseInt(quantity) - 1);
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
              onChange={handleChange}
              value={quantity}
            />
            <IconButton
              disabled={parseInt(quantity) === parseInt(item.option.quantity)}
              sx={{
                borderRadius: 0,
                backgroundColor: "#f5f5f5",
              }}
              onClick={() => {
                handleUpdateItem({
                  quantity: parseInt(quantity) + 1,
                  productUUID: item.product.productUUID,
                  optionUUID: item.option.optionUUID,
                  orderItemUUID: item.orderItemUUID,
                });
                setQuantity(parseInt(quantity) + 1);
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
          {FormatPrice(item.option.price)}
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() =>
              handleRemoveItem({
                productUUID: item.product.productUUID,
                optionUUID: item.option.optionUUID,
              })
            }
          >
            <CloseIcon color="primary" sx={{ fontSize: 35 }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default function CartTable({
  items,
  handleRemoveItem,
  handleUpdateItem,
}) {
  return (
    <Table>
      {items.map((item, i) => (
        <Item
          key={i}
          item={item}
          handleRemoveItem={handleRemoveItem}
          handleUpdateItem={handleUpdateItem}
        />
      ))}
    </Table>
  );
}
