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

function Item(props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Stack direction="row" pl={10} alignItems="center">
            <Avatar
              alt={props.item.alt}
              src={props.item.src}
              sx={{
                width: 120,
                height: 120,
                pr: 10,
              }}
            />

            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
                {props.item.name}
              </Typography>
              <Typography sx={{ color: "#ababab" }}>
                {props.item.seller}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
          <Stack direction="row" alignItems="center">
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
          </Stack>
        </TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
          ฿{props.item.price}
        </TableCell>
        <TableCell>
          <CloseIcon color="primary" sx={{ fontSize: 35 }} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default function CartTable(props) {
  return (
    <Table>
      {props.items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Table>
  );
}
