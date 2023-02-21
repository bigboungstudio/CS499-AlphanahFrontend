import React from "react";
import {
  Grid,
  Stack,
  TextField,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import ItemCard from "./ItemCard";

export default function ShoppingPage() {
  return (
    <>
      <Stack direction="row" spacing={2} height="100%">
        <Stack direction="column" padding={5} spacing={2}>
          <Typography sx={{ fontSize: "30px" }}>หมวดหมู่</Typography>
          <Typography sx={{ fontSize: "25px", color: "#01bfa6" }}>
            อาวุธ
          </Typography>
          <Divider />
          <Typography
            paddingTop={2}
            sx={{ fontWeight: "bold", fontSize: "20px" }}
          >
            ทั้งหมด
          </Typography>
          <Typography sx={{ fontSize: "20px" }}>Gun</Typography>
          <Typography sx={{ fontSize: "20px" }}>Sword</Typography>
          <Typography sx={{ fontSize: "20px" }}>Axe</Typography>
          <Typography sx={{ fontSize: "20px" }}>Lance</Typography>
        </Stack>
        <Box padding={5} flexGrow={1}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="space-between"
            paddingBottom={5}
          >
            <Typography>เจอสินค้า 322 ชิ้น</Typography>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Typography>เรียงโดย:</Typography>
              <TextField
                size="small"
                select
                defaultValue="เลือก"
                sx={{ minWidth: "120px" }}
                inputProps={{
                  sx: {
                    height: "7px",
                    fontSize: "14px",
                  },
                }}
              />
            </Stack>
          </Stack>
          <Divider />
          <Grid container spacing={3} alignContent="space-evenly" pt={3}>
            <ItemCard
              image="/diasword.png"
              alt="item1"
              name="Diamond sword"
              price="99.99"
              star={2.5}
              review={666}
              sold={300}
            />
            <ItemCard
              image="/gun2.jpg"
              alt="item2"
              name="Kitchen gun"
              price="0.45"
              star={4.5}
              review={45}
              sold={112}
            />
            <ItemCard
              image="/light.png"
              alt="item3"
              name="Youngling slayer"
              price="9000"
              star={5}
              review={2000}
              sold={9000}
            />
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
