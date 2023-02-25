import * as React from "react";

import { Button, Box, Stack, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextFieldForm } from "../AuthComponents";

export default function BuyerLoginPage() {
  return (
    <Stack spacing={3} px="20%" pt={10} bgcolor="#f5f5f5" height="100vh">
      <Typography sx={{ fontSize: "30px" }}>เข้าสู่ระบบ Alphanah</Typography>
      <Stack direction="row" spacing={8} sx={{ p: 4, bgcolor: "white" }}>
        <Stack width="50%" spacing={3}>
          <TextFieldForm head="อีเมล" placeholder="ระบุอีเมลของคุณ" />
          <TextFieldForm head="รหัสผ่าน" placeholder="ระบุรหัสผ่านของคุณ" />
        </Stack>

        <Stack width="40%">
          {/* <Box alignSelf="end">
            <Button variant="text">ลืมรหัสผ่าน?</Button>
          </Box> */}
          <Stack mt={3} spacing={3}>
            <Button
              sx={{ height: 50, fontSize: 18 }}
              variant="contained"
              component={Link}
              to={"/account"}
            >
              เข้าสู่ระบบ
            </Button>
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
            <Box display="flex" alignItems="center">
              <Typography>เข้ามาใน Alphanah ครั้งแรก?</Typography>
              <Button variant="text" component={Link} to={"/buyer/register"}>
                สร้างบัญชี
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}