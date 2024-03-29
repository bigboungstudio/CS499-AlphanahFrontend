import React, { useState, useEffect } from "react";
import { Button, Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import FacebookIcon from "@mui/icons-material/Facebook";
import { TextFieldForm } from "../AuthComponents";
import { useSelector, useDispatch } from "react-redux";
import { buyerLogin } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

export default function BuyerLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyer = useSelector((state) => state.auth.buyer);
  useEffect(() => {
    const goHomePage = () => navigate("/");
    buyer.isAuthentication && goHomePage();
  }, [buyer, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [formValues, setFormValues] = useState(initialValues);

  const [errors, setErrors] = useState({});
  const validate = () => {
    let temp = {};
    temp.email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      formValues.email
    )
      ? ""
      : "อีเมลไม่ถูกต้อง";
    temp.password = formValues.password.length >= 8 ? "" : "รหัสผ่านไม่ถูกต้อง";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch(buyerLogin(formValues)).then(setFormValues(initialValues));
    }
  };
  // const onFacebook = () => {
  //   window.location.replace(
  //     "https://auth.alphanah.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:3000/buyer/facebook&response_type=TOKEN&client_id=7hopjdad9ohj6n1v9h93c4eo3c&scope=aws.cognito.signin.user.admin+email+openid+profile"
  //   );
  // };
  return (
    <Stack spacing={3} px="20%" pt={10} bgcolor="#f5f5f5" height="100vh">
      <Typography sx={{ fontSize: "30px" }}>
        เข้าสู่ระบบผู้ซื้อ Alphanah
      </Typography>
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
              error={errors.email}
            />
            <TextFieldForm
              head="รหัสผ่าน"
              placeholder="ระบุรหัสผ่านของคุณ"
              name="password"
              value={formValues.password}
              type="password"
              handleOnchange={handleInputChange}
              maxLength={256}
              error={errors.password}
            />
          </Stack>
          <Stack width="40%">
            <Stack mt={3} spacing={3}>
              <Button
                type="submit"
                sx={{ height: 50, fontSize: 18 }}
                variant="contained"
              >
                เข้าสู่ระบบ
              </Button>
              {/* <Box>
                <Divider spacing={1}>
                  <Typography sx={{ fontSize: "16px" }}>หรือ</Typography>
                </Divider>
              </Box> */}
              {/* <Button
                onClick={onFacebook}
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
              </Button> */}
              <Box display="flex" alignItems="center">
                <Typography>เข้ามาใน Alphanah ครั้งแรก?</Typography>
                <Button variant="text" component={Link} to={"/buyer/register"}>
                  สร้างบัญชี
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
