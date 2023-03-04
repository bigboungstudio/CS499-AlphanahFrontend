import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextFieldForm } from "../AuthComponents";
import { buyerRegister, buyerLogin } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BuyerRegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyer = useSelector((state) => state.auth.buyer);

  React.useEffect(() => {
    const goHomePage = () => navigate("/");
    buyer.isAuthentication && goHomePage();
  }, [buyer, navigate]);
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(buyerRegister(formValues)).then(
      dispatch(
        buyerLogin({ email: formValues.email, password: formValues.password })
      ).then(setFormValues(initialValues))
    );
  };

  return (
    <Stack spacing={3} px="20%" pt={10} bgcolor="#f5f5f5" height="100vh">
      <Typography sx={{ fontSize: "30px" }}>สร้างบัญชี Alphanah</Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={8} sx={{ p: 4, bgcolor: "white" }}>
          <Stack width="50%" spacing={3}>
            <TextFieldForm
              head="อีเมล"
              placeholder="ระบุอีเมลของคุณ"
              name="email"
              value={formValues.email}
              type="email"
              handleOnchange={handleInputChange}
              maxLength={128}
            />
            <TextFieldForm
              head="รหัสผ่าน"
              placeholder="ระบุรหัสผ่านของคุณ"
              name="password"
              value={formValues.password}
              type="password"
              handleOnchange={handleInputChange}
              maxLength={256}
            />
            <TextFieldForm
              head="ยืนยันรหัสผ่าน"
              placeholder="ยืนยันรหัสผ่านของคุณใหม่"
              name="confirmPassword"
              value={formValues.confirmPassword}
              type="password"
              handleOnchange={handleInputChange}
              maxLength={256}
            />
          </Stack>
          <Stack width="40%" spacing={3}>
            <Button
              sx={{ height: 50, fontSize: 18, mt: 3 }}
              variant="contained"
              type="submit"
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
                "&:hover": {
                  borderColor: "#1877f2",
                  backgroundColor: "#91e2ff",
                },
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
      </form>
    </Stack>
  );
}
