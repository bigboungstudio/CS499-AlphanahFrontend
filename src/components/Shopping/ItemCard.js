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
import FormatPrice from "../common/FormatPrice";

export default function ItemCard({ product }) {
  return (
    <Grid item>
      <ButtonBase
        component={Link}
        to={"/products/detail/" + product.productUUID}
      >
        <Card
          sx={{
            maxWidth: 200,
            border: "none",
            boxShadow: "none",
            ":hover": {
              boxShadow: 5,
            },
          }}
        >
          <CardContent>
            <CardMedia
              component="img"
              image={
                product.mainImage === null
                  ? "/vergil.jpg"
                  : product.mainImage.path
              }
              alt={product.name}
              sx={{ objectFit: "contain", height: 150 }}
            />
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
            <Typography color="#01bfa6" py={0.5} variant="h6" component="div">
              {FormatPrice(product.minPrice)}
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
                value={product.reviewScore ?? 0}
                precision={0.5}
                readOnly
                sx={{ fontSize: 12 }}
              />
              <Typography sx={{ fontSize: 12 }}>
                ({product.reviews.length})
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
}
