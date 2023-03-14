import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  ButtonBase,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoriesCard(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    const navigateCategory = () =>
      navigate(`/products/categories/${props.item.id}`);
    navigateCategory();
  };
  return (
    <ButtonBase onClick={handleClick}>
      <Card
        sx={{
          border: 1,
          borderColor: "#e6e6e6",
          borderRadius: 0,
          boxShadow: "none",
          px: 1,
          ":hover": {
            boxShadow: 5,
          },
        }}
      >
        <Box width={130} height={170}>
          <CardMedia
            component="img"
            image={props.item.image}
            alt={props.item.alt}
            sx={{ pt: 2, objectFit: "contain", height: "55%" }}
          />
          <CardContent>
            <Typography sx={{ fontSize: "13px", textAlign: "center" }}>
              {props.item.name}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </ButtonBase>
  );
}
