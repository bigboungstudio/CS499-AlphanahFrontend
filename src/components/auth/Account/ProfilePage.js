import React from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditForm = ({
  value,
  head,
  placeholder,
  type,
  maxLength,
  onChange,
  name,
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
      />
    </Box>
  );
};

export default function ProfilePage({
  buyer,
  handleSubmit,
  handleInputChange,
  formValues,
  handleUpload,
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        px: "10%",
      }}
    >
      <Typography sx={{ fontSize: "30px" }}>ข้อมูลบัญชี</Typography>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Avatar
          alt={buyer.currentUser.firstname}
          src={buyer.currentUser.image}
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
          <input type="file" accept="image/*" hidden onChange={handleUpload} />
        </Button>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box>
            <Typography sx={{ fontSize: "16px", pb: 1 }}>อีเมล</Typography>
            <TextField
              disabled
              sx={{ width: "50%" }}
              value={buyer.currentUser.email}
              inputProps={{
                sx: {
                  height: "7px",
                  fontSize: "14px",
                },
              }}
            />
          </Box>

          <EditForm
            head="ชื่อ"
            name="firstname"
            value={formValues.firstname}
            placeholder="ระบุชื่อใหม่"
            type="text"
            maxLength={50}
            onChange={handleInputChange}
          />
          <EditForm
            head="นามสกุล"
            name="lastname"
            value={formValues.lastname}
            placeholder="ระบุนามสกุลใหม่"
            type="text"
            maxLength={50}
            onChange={handleInputChange}
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
            <Typography sx={{ fontSize: "16px", pb: 1 }}>ที่อยู่</Typography>
            <TextField
              multiline={true}
              rows={3}
              sx={{ width: "50%" }}
              type="text"
              name="address"
              placeholder="ระบุที่อยู่"
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
        <Box spacing={2} mt={5} pb={5}>
          <Button
            type="submit"
            sx={{ height: 40, fontSize: 18, px: 2 }}
            variant="contained"
          >
            <Typography px={2}>แก้ไข</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
}
