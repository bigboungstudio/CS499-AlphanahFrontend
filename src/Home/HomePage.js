import * as React from "react";
import ImageSlider from "./ImageSlider";
import Categories from "./Categories/Categories";
import { Box } from "@mui/system";

export default function HomePage() {
  return (
    <>
      <ImageSlider />
      <Box sx={{ bgcolor: "#f5f5f5", px: 25, flexGrow: 1 }}>
        <Categories />
      </Box>
    </>
  );
}
