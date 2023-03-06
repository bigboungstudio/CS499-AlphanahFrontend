import {
  Stack,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import SellerNavBar from "../../common/SellerNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sellerRegister } from "../../../redux/actions/authActions";

export default function SellerRegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.seller);

  React.useEffect(() => {
    const goSellerHomePage = () => navigate("/seller/home");
    seller.isAuthentication && goSellerHomePage();
  }, [seller, navigate]);
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
    dispatch(sellerRegister(formValues));
    // .then(
    //   dispatch(
    //     sellerLogin({ email: formValues.email, password: formValues.password })
    //   ).then(setFormValues(initialValues))
    // );
  };
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="email"
                value={formValues.email}
                type="email"
                onChange={handleInputChange}
                placeholder="อีเมล"
                fullWidth
                inputProps={{
                  maxLength: 128,
                  sx: {
                    height: "10px",
                    fontSize: "16px",
                  },
                }}
              />
              <TextField
                name="password"
                value={formValues.password}
                type="password"
                onChange={handleInputChange}
                placeholder="รหัสผ่าน"
                fullWidth
                inputProps={{
                  maxLength: 256,
                  sx: {
                    height: "10px",
                    fontSize: "16px",
                  },
                }}
              />
              <TextField
                name="confirmPassword"
                value={formValues.confirmPassword}
                type="password"
                onChange={handleInputChange}
                placeholder="ยืนยันรหัสผ่าน"
                fullWidth
                inputProps={{
                  maxLength: 256,
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
                  type="submit"
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
          </form>
        </Box>
      </Box>
    </>
  );
}
