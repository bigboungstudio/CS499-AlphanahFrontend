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
export default function ReviewCard({ review }) {
  return (
    <Box display="flex">
      <Avatar
        alt={review.creator.firstname}
        src={review.creator.image}
        sx={{
          width: 45,
          height: 45,
          mr: 2,
        }}
      />
      <Box flexGrow={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 13 }}>
            {review.creator.firstname} {review.creator.lastname}
          </Typography>
          {/* <Typography sx={{ fontSize: 13 }}>1 วันก่อน</Typography> */}
        </Stack>
        <Rating
          defaultValue={parseInt(review.rating)}
          precision={0.5}
          readOnly
          size="small"
        />
        <Typography sx={{ fontSize: 16, pt: 1 }}>{review.message}</Typography>
        <ImageList
          sx={{
            width: 200,
            height: 100,
            transform: "translateZ(0)",
            flexWrap: "nowrap",
          }}
          rowHeight={100}
        >
          {review.images.map((item, i) => (
            <ImageListItem key={i}>
              <img src={item.path} alt={item.imageUUID} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <Divider sx={{ pb: 1 }} />
      </Box>
    </Box>
  );
}
