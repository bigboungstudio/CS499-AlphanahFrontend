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
    <Card
      sx={{
        border: 1,
        borderColor: "#e6e6e6",
        borderRadius: 0,
        boxShadow: "none",
        width: 130,
        ":hover": {
          boxShadow: 5,
        },
      }}
    >
      <ButtonBase component={Link} to={"/shop"}>
        <CardContent>
          <CardMedia
            component="img"
            image={props.item.image}
            alt={props.item.alt}
            sx={{ objectFit: "contain", py: 1 }}
          />
          <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
            {props.item.name}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
}
