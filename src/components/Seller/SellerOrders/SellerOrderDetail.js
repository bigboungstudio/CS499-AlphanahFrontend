import React from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";

export default function SellerOrderDetail({ order, open, handleClose }) {
  var date = new Date(order.checkoutDate);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Dialog
      maxWidth="xl"
      fullScreen={fullScreen}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle
        sx={{ px: 8, pt: 5, pb: 3, fontSize: 30, fontWeight: "bold" }}
      >
        รายละเอียดลูกค้า
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 8 }}>
        <Stack spacing={3} pb={5}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={order.deliveryInformation.firstname}
              src={order.creator.image}
              sx={{
                width: 100,
                height: 100,
              }}
            />
            <Typography sx={{ fontSize: 20 }}>
              {order.deliveryInformation.firstname +
                " " +
                order.deliveryInformation.lastname}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={{ width: 100, fontSize: 20 }}>ที่อยู่:</Typography>
            <Typography whiteSpace="pre-line" sx={{ fontSize: 20 }}>
              {order.deliveryInformation.address}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={{ width: 100, fontSize: 20 }}>
              เบอร์มือถือ:
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              {order.deliveryInformation.phone}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={{ width: 100, fontSize: 20 }}>
              สั่งซื้อเมื่อ:
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              {format(date, "dd/MM/yyyy HH:mm")}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
