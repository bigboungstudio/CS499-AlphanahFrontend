import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Rating,
  ButtonBase,
  Divider,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ItemCard({ product }) {
  return (
    <Grid item>
      <Card
        sx={{
          border: "none",
          boxShadow: "none",
          ":hover": {
            boxShadow: 5,
          },
        }}
      >
        <ButtonBase component={Link} to={"/products/" + product.productUUID}>
          <CardContent>
            <CardMedia
              component="img"
              image={product.mainImage.path}
              alt={product.name}
              sx={{ objectFit: "contain", height: 200, py: 1 }}
            />
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
            <Typography color="#01bfa6" py={0.5} variant="h6" component="div">
              ฿{product.minPrice}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 13 }}>
                ขายแล้ว {product.saleCount}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Rating
                defaultValue={product.reviewScore}
                precision={0.5}
                readOnly
                sx={{ fontSize: 12 }}
              />
              <Typography sx={{ fontSize: 12 }}>
                ({product.reviews.length})
              </Typography>
            </Stack>
          </CardContent>
        </ButtonBase>
      </Card>
    </Grid>
  );
}
