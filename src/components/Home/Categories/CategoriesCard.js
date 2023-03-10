import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  ButtonBase,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CategoriesCard(props) {
  return (
    <ButtonBase component={Link} to={"/products/categories/all"}>
      <Card
        sx={{
          border: 1,
          borderColor: "#e6e6e6",
          borderRadius: 0,
          boxShadow: "none",
          px: 1,
          width: 120,
          ":hover": {
            boxShadow: 5,
          },
        }}
      >
        <CardMedia
          component="img"
          image={props.item.image}
          alt={props.item.alt}
          sx={{ pt: 2, display: "contain", height: 120 }}
        />
        <CardContent>
          <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
            {props.item.name}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
