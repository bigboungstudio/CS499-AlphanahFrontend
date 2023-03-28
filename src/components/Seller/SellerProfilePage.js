import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import {
  loadUserDetail,
  updateUserDetail,
  updateUserImage,
} from "../../redux/actions/authActions";

const EditForm = ({
  value,
  head,
  placeholder,
  type,
  maxLength,
  onChange,
  name,
  error = null,
}) => {
  return (
    <Box>
      <Typography sx={{ fontSize: "16px", pb: 1 }}>{head}</Typography>
      <TextField
        sx={{ width: "50%" }}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputProps={{
          maxLength: { maxLength },
          sx: {
            height: "7px",
            fontSize: "14px",
          },
        }}
        {...(error && { error: true, helperText: error })}
      />
    </Box>
  );
};

export default function SellerProfilePage() {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.seller);
  useEffect(() => {
    seller.isAuthentication && dispatch(loadUserDetail("seller", seller.token));
  }, [dispatch, seller.isAuthentication, seller.token]);
  useEffect(() => {
    seller.currentUser.accountUUID !== undefined &&
      setFormValues({
        firstname: seller.currentUser.firstname,
        lastname: seller.currentUser.lastname,
        address: seller.currentUser.address ?? "",
        phone: seller.currentUser.phone ?? "",
      });
  }, [
    seller.currentUser.accountUUID,
    seller.currentUser.address,
    seller.currentUser.firstname,
    seller.currentUser.lastname,
    seller.currentUser.phone,
  ]);
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({});
  const validate = () => {
    let temp = {};
    temp.firstname = formValues.firstname ? "" : "กรุณากรอกชื่อ";
    temp.lastname = formValues.lastname ? "" : "กรุณากรอกนามสกุล";
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      dispatch(
        updateUserDetail("seller", formValues, seller.token, () =>
          setLoading(false)
        )
      );
    }
  };
  const handleUpload = async (event) => {
    if (event.target.files.length !== 0) {
      event.preventDefault();
      dispatch(updateUserImage("seller", event.target.files[0], seller.token));
    }
  };

  return (
    <Box bgcolor="white" py={5}>
      <Box mx={8}>
        <Typography sx={{ fontSize: "30px" }}>ข้อมูลบัญชี</Typography>
        <Stack direction="row" alignItems="center" spacing={5}>
          <Avatar
            alt={seller.currentUser.firstname}
            src={seller.currentUser.image}
            sx={{
              my: 5,
              width: 140,
              height: 140,
            }}
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              height: 35,
              fontSize: 16,
            }}
          >
            เปลี่ยนรูป
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />
          </Button>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box>
              <Typography sx={{ fontSize: "16px", pb: 1 }}>อีเมล</Typography>
              <TextField
                disabled
                sx={{ width: "50%" }}
                value={seller.currentUser.email}
                inputProps={{
                  sx: {
                    height: "7px",
                    fontSize: "14px",
                  },
                }}
              />
            </Box>
            <EditForm
              head="ชื่อ *"
              name="firstname"
              value={formValues.firstname}
              placeholder="ระบุชื่อใหม่"
              type="text"
              maxLength={50}
              onChange={handleInputChange}
              error={errors.firstname}
            />
            <EditForm
              head="นามสกุล *"
              name="lastname"
              value={formValues.lastname}
              placeholder="ระบุนามสกุลใหม่"
              type="text"
              maxLength={50}
              onChange={handleInputChange}
              error={errors.lastname}
            />
            <EditForm
              head="เบอร์โทรศัพท์"
              name="phone"
              placeholder="ระบุเบอร์โทรศัพท์ติดต่อ"
              value={formValues.phone}
              type="tel"
              maxLength={19}
              onChange={handleInputChange}
            />
            <Box>
              <Typography sx={{ fontSize: "16px", pb: 1 }}>
                ที่อยู่ร้าน
              </Typography>
              <TextField
                multiline={true}
                rows={3}
                sx={{ width: "50%" }}
                placeholder="ระบุที่อยู่ร้าน"
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                inputProps={{
                  maxLength: 2048,
                  sx: {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
              />
            </Box>
          </Stack>
          <Box spacing={2} mt={5}>
            <Button
              disabled={loading}
              sx={{ height: 40, fontSize: 18, px: 2 }}
              variant="contained"
              type="submit"
            >
              <Typography px={2}>
                {loading ? <CircularProgress size={24} /> : "แก้ไข"}
              </Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
