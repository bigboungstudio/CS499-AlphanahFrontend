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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sellerLogin } from "../../../redux/actions/authActions";

export default function SellerLoginPage() {
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
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [formValues, setFormValues] = React.useState(initialValues);
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(sellerLogin(formValues)).then(setFormValues(initialValues));
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
            เข้าสู่ระบบผู้ขาย Alphanah
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
              <Stack spacing={1}>
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
                {/* <Button sx={{ alignSelf: "start" }} variant="text">
                ลืมรหัสผ่าน?
              </Button> */}
              </Stack>
              <Stack spacing={1}>
                <Button
                  sx={{ height: 50, fontSize: 18 }}
                  variant="contained"
                  type="submit"
                >
                  เข้าสู่ระบบ
                </Button>
                <Button
                  sx={{ alignSelf: "end" }}
                  variant="text"
                  component={Link}
                  to={"/seller/register"}
                  size="large"
                >
                  สร้างบัญชี
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
