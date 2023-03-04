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

export default function ProductReview({ product, isAuthentication }) {
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
            {product.reviewScore}
          </div>
          <div style={{ fontSize: "30px", color: "#ababab" }}>/5</div>
        </Stack>

        <Stack spacing={1}>
          <StarRatingBar
            star={5}
            amount={product.reviewFiveStar}
            value={(product.reviewFiveStar / product.reviews.length) * 100}
          />
          <StarRatingBar
            star={4}
            amount={product.reviewFourStar}
            value={(product.reviewFourStar / product.reviews.length) * 100}
          />
          <StarRatingBar
            star={3}
            amount={product.reviewThreeStar}
            value={(product.reviewThreeStar / product.reviews.length) * 100}
          />
          <StarRatingBar
            star={2}
            amount={product.reviewTwoStar}
            value={(product.reviewTwoStar / product.reviews.length) * 100}
          />
          <StarRatingBar
            star={1}
            amount={product.reviewOneStar}
            value={(product.reviewOneStar / product.reviews.length) * 100}
          />
          <Typography alignself="end" sx={{ color: "#ababab", fontSize: 14 }}>
            {product.reviews.length} Ratings
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Box>
        {isAuthentication && (
          <Button
            onClick={handleClickOpen}
            sx={{ mt: 5 }}
            variant="contained"
            size="large"
          >
            เขียนคำวิจารณ์
          </Button>
        )}
        <WriteReviewPage open={open} handleClose={handleClose} />
        <Box py={3}>
          {product.reviews.map((item, i) => (
            <ReviewCard review={item} key={i} />
          ))}
        </Box>
      </Box>
      <Stack direction="row" justifyContent="space-between">
        <div></div>
        <Pagination count={5} alignself="end" />
      </Stack>
    </Box>
  );
}
