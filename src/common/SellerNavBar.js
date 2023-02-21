import React from "react";
import { AppBar, Toolbar, Box, Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SellerNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          justifyContent: "center",
          width: "100%",
          py: 1,
        }}
      >
        <Toolbar>
          <Stack flexGrow={1} direction="row" justifyContent="space-between">
            <Button>
              <img height="50px" src="/a.png" alt="logo" />
              <Typography variant="h4" component="div" color="#FB6376" pr={1}>
                lphanah
              </Typography>
              <Typography variant="h4" component="div" color="#FB6376">
                Seller
              </Typography>
            </Button>
            <Button component={Link} to={"/"} variant="text" size="large">
              กลับหน้าร้านค้า
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
