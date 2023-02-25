import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextFieldForm } from "../AuthComponents";

export default function BuyerRegisterPage() {
  // const [isBuyer, setIsBuyer] = React.useState(true);
  // const handleChange = (event) => {
  //   if (event.target.value === "buyer") {
  //     setIsBuyer(true);
  //   } else {
  //     setIsBuyer(false);
  //   }
  // };

  // function CheckForm() {
  //   return (
  //     <>
  //       <FormControlLabel
  //         control={
  //           <Checkbox checked={isBuyer} value="buyer" onChange={handleChange} />
  //         }
  //         label="BUYER"
  //       />
  //       <FormControlLabel
  //         control={
  //           <Checkbox
  //             checked={!isBuyer}
  //             value="seller"
  //             onChange={handleChange}
  //           />
  //         }
  //         label="SELLER"
  //       />
  //     </>
  //   );
  // }

  return (
    <Stack spacing={3} px="20%" pt={10} bgcolor="#f5f5f5" height="100vh">
      <Typography sx={{ fontSize: "30px" }}>สร้างบัญชี Alphanah</Typography>
      <Stack direction="row" spacing={8} sx={{ p: 4, bgcolor: "white" }}>
        <Stack width="50%" spacing={3}>
          <TextFieldForm head="อีเมล" placeholder="ระบุอีเมลของคุณ" />
          <TextFieldForm
            head="รหัสผ่าน"
            placeholder="ต้องมีตัวเลขและตัวอักษรอย่างน้อย 7 ตัว"
          />
          <TextFieldForm
            head="ยืนยันรหัสผ่าน"
            placeholder="ยืนยันรหัสผ่านของคุณใหม่"
          />
        </Stack>
        <Stack width="40%" spacing={3}>
          <Button
            sx={{ height: 50, fontSize: 18, mt: 3 }}
            variant="contained"
            component={Link}
            to={"/account"}
          >
            สร้างบัญชี
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
              "&:hover": { borderColor: "#1877f2", backgroundColor: "#91e2ff" },
            }}
          >
            Facebook
          </Button>
          <Box display="flex" alignItems="center">
            <Typography>มีบัญชีอยู่แล้วหรือ?</Typography>
            <Button variant="text" component={Link} to={"/buyer/login"}>
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
