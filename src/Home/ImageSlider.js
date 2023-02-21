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
      src: "/home/home2.jpg",
      alt: "home2",
    },
    {
      src: "/home/home3.jpg",
      alt: "home3",
    },
    {
      src: "/home/home4.png",
      alt: "home4",
    },
  ];
  return (
    <Carousel sx={{ bgcolor: "#ffeaec", pb: 2 }}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
