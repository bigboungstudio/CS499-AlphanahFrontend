import {
  Stack,
  Typography,
  Box,
  Button,
  // Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import FacebookIcon from "@mui/icons-material/Facebook";
import SellerNavBar from "../../common/SellerNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sellerRegister } from "../../../redux/actions/authActions";
import CircleIcon from "@mui/icons-material/Circle";

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
      dispatch(sellerRegister(formValues)).then(setFormValues(initialValues));
    }
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
                {...(errors.email && { error: true, helperText: errors.email })}
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
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
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
                {...(errors.confirmPassword && {
                  error: true,
                  helperText: errors.confirmPassword,
                })}
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
              {/* <Box>
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
              </Button> */}
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
}
