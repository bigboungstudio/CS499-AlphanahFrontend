import React from "react";
import {
  Typography,
  Rating,
  Box,
  Avatar,
  Stack,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

export default function ReviewCard({ review, handleDeleteReview }) {
  const buyer = useSelector((state) => state.auth.buyer);
  const userId = buyer.currentUser.accountUUID;
  return (
    <Box pt={2} display="flex">
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
          <Typography sx={{ fontSize: 14 }}>
            {review.creator.firstname} {review.creator.lastname}
          </Typography>
          {userId && userId === review.creator.accountUUID && (
            <IconButton
              sx={{ color: "#FB6376" }}
              onClick={() =>
                handleDeleteReview({ reviewUUID: review.reviewUUID })
              }
            >
              <DeleteIcon sx={{ fontSize: 22 }} />
            </IconButton>
          )}
        </Stack>
        <Rating
          value={parseInt(review.rating) ?? 5}
          precision={0.5}
          readOnly
          size="small"
        />
        <Typography sx={{ fontSize: 16, pt: 1 }}>{review.message}</Typography>
        {review.images.length !== 0 ? (
          <Grid
            my={2}
            spacing={1}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {review.images.map((item, i) => (
              <img
                key={i}
                src={item.path}
                alt={item.imageUUID}
                loading="lazy"
                style={{ height: 90, width: 150, objectFit: "contain" }}
              />
            ))}
          </Grid>
        ) : (
          <Box pb={1.5} />
        )}
        <Divider sx={{ pb: 1 }} />
      </Box>
    </Box>
  );
}
