import * as React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent, CardMedia } from "@mui/material";

function Item(props) {
  return (
    <Card
      sx={{
        height: 425,
        bgcolor: "#ffeaec",
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", height: 425 }}
          image={props.item.src}
          alt={props.item.alt}
        />
      </CardContent>
    </Card>
  );
}

export default function ImageSlider() {
  var items = [
    {
      src: "/home/banner2.jpg",
      alt: "home1",
    },
    {
      src: "/home/banner3.png",
      alt: "home2",
    },
    {
      src: "/home/banner4.png",
      alt: "home3",
    },
    {
      src: "/home/banner5.png",
      alt: "home4",
    },
    {
      src: "/home/banner6.png",
      alt: "home5",
    },
  ];
  return (
    <Carousel interval={6000} sx={{ bgcolor: "#ffeaec", pb: 2 }}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
