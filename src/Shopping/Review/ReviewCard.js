import React from "react";
import {
  Typography,
  Rating,
  Box,
  Avatar,
  Stack,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
export default function ReviewCard() {
  return (
    <Box display="flex">
      <Avatar
        alt="dante"
        src="/dante.jpg"
        sx={{
          width: 45,
          height: 45,
          mr: 2,
        }}
      />
      <Box flexGrow={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 13 }}>DanteZa007</Typography>
          <Typography sx={{ fontSize: 13 }}>1 วันก่อน</Typography>
        </Stack>
        <Rating defaultValue={5} precision={0.5} readOnly size="small" />
        <Typography sx={{ fontSize: 16, pt: 1 }}>
          Nice new sword for my collection
        </Typography>
        <ImageList
          sx={{
            width: 200,
            height: 100,
            transform: "translateZ(0)",
            flexWrap: "nowrap",
          }}
          rowHeight={100}
        >
          <ImageListItem>
            <img src="diasword.png" alt="dia" loading="lazy" />
          </ImageListItem>
          <ImageListItem>
            <img src="dante.jpg" alt="dan" loading="lazy" />
          </ImageListItem>
        </ImageList>
        <Divider sx={{ pb: 1 }} />
      </Box>
    </Box>
  );
}
