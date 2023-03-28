import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextFieldForm } from "../AuthComponents";
import { buyerRegister } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";

export default function BuyerRegisterPage() {
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
  const [errors, setErrors] = useState({});
  const validate = () => {
    let temp = {};
    temp.email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      formValues.email
    )
      ? ""
      : "อีเมลไม่ถูกต้อง";
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = formValues.password.length;
    const uppercasePassword = uppercaseRegExp.test(formValues.password);
    const lowercasePassword = lowercaseRegExp.test(formValues.password);
    const digitsPassword = digitsRegExp.test(formValues.password);
    const specialCharPassword = specialCharRegExp.test(formValues.password);
    const minLengthPassword = minLengthRegExp.test(formValues.password);
    let errMsg = "";
    if (passwordLength === 0) {
      errMsg = "กรุณากรอกรหัสผ่าน";
    } else if (!uppercasePassword) {
      errMsg = "ตัวอักษรตัวใหญ่อย่างน้อย 1 ตัว";
    } else if (!lowercasePassword) {
      errMsg = "ตัวอักษรตัวเล็กอย่างน้อย 1 ตัว";
    } else if (!digitsPassword) {
      errMsg = "ตัวเลขอย่างน้อย 1 ตัว";
    } else if (!specialCharPassword) {
      errMsg = "ตัวอักษรพิเศษอย่างน้อย 1 ตัว";
    } else if (!minLengthPassword) {
      errMsg = "ความยาวอย่างน้อย 8 ตัว";
    } else {
      errMsg = "";
    }
    temp.password = errMsg;

    temp.confirmPassword =
      formValues.confirmPassword === formValues.password
        ? ""
        : "รหัสผ่านไม่ตรงกัน";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch(buyerRegister(formValues)).then(setFormValues(initialValues));
    }
  };

  return (
    <Stack spacing={3} px="20%" pt={10} bgcolor="#f5f5f5" height="100vh">
      <Typography sx={{ fontSize: "30px" }}>
        สร้างบัญชีผู้ซื้อ Alphanah
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
            <TextFieldForm
              head="ยืนยันรหัสผ่าน"
              placeholder="ยืนยันรหัสผ่านของคุณใหม่"
              name="confirmPassword"
              value={formValues.confirmPassword}
              type="password"
              handleOnchange={handleInputChange}
              maxLength={256}
              error={errors.confirmPassword}
            />
            <Stack sx={{ color: "#8f8f8f" }}>
              <Typography sx={{ fontSize: 15 }}>รหัสผ่านจะต้อง :</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CircleIcon sx={{ fontSize: 12 }} />
                <Typography sx={{ fontSize: 15 }}>
                  ภาษาอังกฤษเท่านั้น
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CircleIcon sx={{ fontSize: 12 }} />
                <Typography sx={{ fontSize: 15 }}>
                  ความยาวอย่างน้อย 5 ตัว
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CircleIcon sx={{ fontSize: 12 }} />
                <Typography sx={{ fontSize: 15 }}>
                  จะต้องมีตัวอักษรเหล่านี้อย่างน้อย 1 ตัว
                </Typography>
              </Stack>
              <Box sx={{ ml: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircleIcon sx={{ fontSize: 6, color: "black" }} />
                  <Typography sx={{ fontSize: 15 }}>
                    ตัวอักษรตัวพิมพ์ใหญ่
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircleIcon sx={{ fontSize: 6, color: "black" }} />
                  <Typography sx={{ fontSize: 15 }}>
                    ตัวอักษรตัวพิมพ์เล็ก
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircleIcon sx={{ fontSize: 6, color: "black" }} />
                  <Typography sx={{ fontSize: 15 }}>ตัวอักษรพิเศษ</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircleIcon sx={{ fontSize: 6, color: "black" }} />
                  <Typography sx={{ fontSize: 15 }}>ตัวเลข</Typography>
                </Stack>
              </Box>
            </Stack>
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
