import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  Pagination,
} from "@mui/material";
import ReviewCard from "./ReviewCard";
import StarRatingBar from "./StarRatingBar";
import WriteReviewPage from "./WriteReviewPage";

export default function ProductReview() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box bgcolor="white" padding={5}>
      <Typography sx={{ fontSize: "24px" }}>คะแนนสินค้า</Typography>
      <Divider />
      <Stack direction="row" spacing={8} py={2}>
        <Stack direction="row" pl={3} alignItems="center">
          <div
            style={{ fontSize: "60px", color: "#01bfa6", fontWeight: "bold" }}
          >
            2.5
          </div>
          <div style={{ fontSize: "30px", color: "#ababab" }}>/5</div>
        </Stack>

        <Stack spacing={1}>
          <StarRatingBar star={5} amount={60} value={60} />
          <StarRatingBar star={4} amount={10} value={10} />
          <StarRatingBar star={3} amount={10} value={10} />
          <StarRatingBar star={2} amount={10} value={10} />
          <StarRatingBar star={1} amount={10} value={10} />
          <Typography alignself="end" sx={{ color: "#ababab", fontSize: 14 }}>
            666 Ratings
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Box>
        <Button
          onClick={handleClickOpen}
          sx={{ mt: 5 }}
          variant="contained"
          size="large"
        >
          เขียนคำวิจารณ์
        </Button>
        <WriteReviewPage open={open} handleClose={handleClose} />
        <Box py={3}>
          <ReviewCard />
        </Box>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <div></div>
        <Pagination count={5} alignself="end" />
      </Stack>
    </Box>
  );
}
