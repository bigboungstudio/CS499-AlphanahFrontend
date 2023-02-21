import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";

export default function SellerHomePage() {
  function ToDoItem({ num, text }) {
    return (
      <Box>
        <Typography
          sx={{
            color: "#01bfa6",
            fontSize: 24,
            textAlign: "center",
            pb: 1,
          }}
        >
          {num}
        </Typography>
        <Typography
          sx={{ color: "#ababab", fontSize: 18, textAlign: "center" }}
        >
          {text}
        </Typography>
      </Box>
    );
  }
  return (
    <>
      <Box mx="15%" bgcolor="white" py={5} my={10}>
        <Typography sx={{ fontSize: 24, px: 4, pb: 5 }}>
          สิ่งที่ต้องจัดการ
        </Typography>
        <Stack direction="row" mx={12} spacing={8} justifyContent="center">
          <ToDoItem num={0} text="สินค้าที่ต้องจัดส่ง" />
          <Divider orientation="vertical" flexItem />
          <ToDoItem num={0} text="สินค้าหมดคลัง" />
        </Stack>
      </Box>
    </>
  );
}
