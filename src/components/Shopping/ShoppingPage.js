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
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../../redux/actions/productActions";

export default function ShoppingPage() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  dispatch(loadProducts());
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
            <Typography>เจอสินค้า {products.data.length} ชิ้น</Typography>
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
            {products &&
              products.data.map((item, i) => (
                <ItemCard product={item} key={i} />
              ))}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
