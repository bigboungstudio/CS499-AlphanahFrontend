import React from "react";
import { CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function ProductImage() {
  return (
    <Carousel
      IndicatorIcon={[
        <img alt="item1" src="/diasword.png" height="30" />,
        <img alt="item1" src="/dante.jpg" height="30" />,
      ]}
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
      <CardMedia
        sx={{ objectFit: "contain" }}
        component="img"
        image="/diasword.png"
        alt="item1"
        height="300"
        width="350"
      />
      <CardMedia
        sx={{ objectFit: "contain" }}
        component="img"
        image="/dante.jpg"
        alt="item1"
        height="300"
        width="350"
      />
    </Carousel>
  );
}
