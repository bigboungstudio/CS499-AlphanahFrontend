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

export default function ItemCard({
  image,
  alt,
  name,
  price,
  star,
  review,
  sold,
}) {
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
        <ButtonBase component={Link} to={"/products"}>
          <CardContent>
            <CardMedia
              component="img"
              image={image}
              alt={alt}
              sx={{ objectFit: "contain", height: 200, py: 1 }}
            />
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography color="#01bfa6" py={0.5} variant="h5" component="div">
              ฿{price}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 13 }}>ขายแล้ว {sold}</Typography>
              <Divider orientation="vertical" flexItem />
              <Rating
                defaultValue={star}
                precision={0.5}
                readOnly
                sx={{ fontSize: 12 }}
              />
              <Typography sx={{ fontSize: 12 }}>({review})</Typography>
            </Stack>
          </CardContent>
        </ButtonBase>
      </Card>
    </Grid>
  );
}
