import React from "react";
import { Rating, Typography, LinearProgress, Stack } from "@mui/material";
export default function StarRatingBar({ star, amount, value }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
      }}
    >
      <Rating defaultValue={star} precision={0.5} readOnly size="small" />
      <LinearProgress
        sx={{
          width: 150,
          height: 12,
          mx: 2,
          backgroundColor: "#F0F0F0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#faaf00",
          },
        }}
        variant="determinate"
        value={value}
      />
      <Typography fontSize={12}>{amount}</Typography>
    </Stack>
  );
}
