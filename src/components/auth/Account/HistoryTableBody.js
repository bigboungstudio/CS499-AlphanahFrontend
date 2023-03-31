import React from "react";
import {
  TableRow,
  TableCell,
  Stack,
  Typography,
  Badge,
  CardMedia,
  Box,
} from "@mui/material";
import FormatPrice from "../../common/FormatPrice";
import { format } from "date-fns";

export default function HistoryTableBody({ history }) {
  var date = new Date(history.checkoutDate);
  return (
    <TableRow>
      <TableCell>
        <Stack>
          {history.orderItems.map((item, index) => (
            <Stack
              direction="row"
              alignItems="center"
              key={index}
              spacing={4}
              mb={history.orderItems.length - 1 === index ? 0 : 3}
            >
              <Badge
                badgeContent={
                  <Typography sx={{ color: "white" }}>
                    {item.quantity}
                  </Typography>
                }
                color="primary"
              >
                <CardMedia
                  component="img"
                  alt={item.product.name}
                  src={item.product.mainImage.path}
                  sx={{
                    objectFit: "contain",
                    width: 100,
                    height: 80,
                  }}
                />
              </Badge>
              <Box width="35%">
                <Typography sx={{ fontSize: "20px" }}>
                  {item.product.name}
                </Typography>
                {item.product.options.length !== 1 && (
                  <Typography sx={{ fontSize: "18px" }}>
                    ({item.option.name})
                  </Typography>
                )}
                <Typography sx={{ color: "#ababab" }}>
                  {item.product.creator.firstname +
                    " " +
                    item.product.creator.lastname}
                </Typography>
              </Box>
              <Box width="15%">
                <Typography
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  {FormatPrice(item.price)}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "20px", color: "#226CE0" }}>
                {item.deliveryStatus}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </TableCell>
      <TableCell align="center" sx={{ fontSize: "20px" }}>
        {format(date, "dd/MM/yyyy HH:mm")}
      </TableCell>
      <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
        {FormatPrice(history.totalPrice + history.deliveryFee)}
      </TableCell>
    </TableRow>
  );
}
