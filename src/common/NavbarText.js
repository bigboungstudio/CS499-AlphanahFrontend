import React from "react";
import Typography from "@mui/material/Typography";
export default function NavBarText({ text }) {
  return (
    <Typography sx={{ fontSize: "13px" }} component="div" color="common.black">
      {text}
    </Typography>
  );
}
