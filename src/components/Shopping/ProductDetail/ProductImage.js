import React from "react";
import { CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function ProductImage({ product }) {
  const imagesIcons = [
    <img
      key={1}
      alt={product.mainImage.imageUUID}
      src={product.mainImage.path}
      height="30"
    />,
  ];
  product.images.map((item, i) =>
    imagesIcons.push(
      <img key={i + 1} alt={item.imageUUID} src={item.path} height="30" />
    )
  );

  const imagesCard = [
    <CardMedia
      key={1}
      sx={{ objectFit: "contain" }}
      component="img"
      image={product.mainImage.path}
      alt={product.mainImage.imageUUID}
      height="300"
      width="350"
    />,
  ];
  product.images.map((item, i) =>
    imagesCard.push(
      <CardMedia
        sx={{ objectFit: "contain" }}
        component="img"
        image={item.path}
        alt={item.imageUUID}
        height="300"
        width="350"
        key={i + 1}
      />
    )
  );
  return (
    <Carousel
      IndicatorIcon={imagesIcons}
      indicatorIconButtonProps={{
        style: {
          padding: "10px",
          borderRadius: 3,
          borderWidth: 1,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: "#ffeaec", // 2
        },
      }}
      navButtonsAlwaysInvisible={true}
      autoPlay={false}
    >
      {imagesCard}
    </Carousel>
  );
}
