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

export default function SellerCouponDetail({ open, handleClose }) {
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
        สินค้าที่ร่วมรายการ
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
          <Stack direction="row" alignItems="center" spacing={5}>
            <Avatar
              alt="vergil"
              src="/vergil.jpg"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Typography sx={{ fontSize: 20 }}>VergilNumberOne</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Avatar
              alt="vergil"
              src="/vergil.jpg"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Typography sx={{ fontSize: 20 }}>VergilNumberOne</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Avatar
              alt="vergil"
              src="/vergil.jpg"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Typography sx={{ fontSize: 20 }}>VergilNumberOne</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Avatar
              alt="vergil"
              src="/vergil.jpg"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Typography sx={{ fontSize: 20 }}>VergilNumberOne</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Avatar
              alt="vergil"
              src="/vergil.jpg"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Typography sx={{ fontSize: 20 }}>VergilNumberOne</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
