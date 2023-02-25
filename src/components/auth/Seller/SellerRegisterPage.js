import {
  Stack,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import SellerNavBar from "../../common/SellerNavBar";

export default function SellerRegisterPage() {
  return (
    <>
      <SellerNavBar />
      <Box pt={20} bgcolor="#f5f5f5" height="100vh">
        <Box
          alignSelf="center"
          sx={{
            p: 4,
            bgcolor: "white",
            width: "30%",
            mx: "35%",
            borderRadius: 5,
          }}
        >
          <Typography sx={{ fontSize: "30px", pb: 3 }}>
            สร้างบัญชีผู้ขาย Alphanah
          </Typography>
          <Stack spacing={3}>
            <TextField
              placeholder="อีเมล"
              fullWidth
              inputProps={{
                sx: {
                  height: "10px",
                  fontSize: "16px",
                },
              }}
            />
            <TextField
              placeholder="รหัสผ่าน"
              fullWidth
              inputProps={{
                sx: {
                  height: "10px",
                  fontSize: "16px",
                },
              }}
            />
            <TextField
              placeholder="ยืนยันรหัสผ่าน"
              fullWidth
              inputProps={{
                sx: {
                  height: "10px",
                  fontSize: "16px",
                },
              }}
            />

            <Stack spacing={1}>
              <Button
                sx={{ height: 50, fontSize: 18 }}
                variant="contained"
                component={Link}
                to={"/seller/home"}
              >
                สร้างบัญชี
              </Button>
              <Button
                sx={{ alignSelf: "end" }}
                variant="text"
                component={Link}
                to={"/seller/login"}
                size="large"
              >
                เข้าสู่ระบบ
              </Button>
            </Stack>
            <Box>
              <Divider spacing={1}>
                <Typography sx={{ fontSize: "16px" }}>หรือ</Typography>
              </Divider>
            </Box>
            <Button
              size="large"
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{
                height: 50,
                fontSize: 18,
                color: "#1877f2",
                borderColor: "#1877f2",
                "&:hover": {
                  borderColor: "#1877f2",
                  backgroundColor: "#91e2ff",
                },
              }}
            >
              Facebook
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
