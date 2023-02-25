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
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProfilePage() {
  function EditForm({ value, head, placeholder }) {
    return (
      <Box>
        <Typography sx={{ fontSize: "16px", pb: 1 }}>{head}</Typography>
        <TextField
          sx={{ width: "50%" }}
          placeholder={placeholder}
          value={value}
          inputProps={{
            sx: {
              height: "7px",
              fontSize: "14px",
            },
          }}
        />
      </Box>
    );
  }
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
          alt="Vergil"
          src="/vergil.jpg"
          sx={{
            my: 5,
            width: 140,
            height: 140,
          }}
        />
        <Stack spacing={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              height: 35,
              fontSize: 16,
            }}
          >
            เปลี่ยนรูป
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              height: 35,
              fontSize: 16,
            }}
          >
            ลบรูป
          </Button>
        </Stack>
      </Stack>
      {/* <Badge
        sx={{ left: "45%" }}
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        }
        justifyContent="center"
        alignItems="center"
      ></Badge> */}

      <Stack spacing={3}>
        <Box>
          <Typography sx={{ fontSize: "16px", pb: 1 }}>อีเมล</Typography>
          {/* <Stack direction="row" spacing={5} alignItems="center"> */}
          <TextField
            disabled
            sx={{ width: "50%" }}
            value="vergilnumberone@gmail.com"
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
          {/* <Button
              variant="contained"
              color="secondary"
              sx={{
                height: 35,
                fontSize: 16,
              }}
            >
              เปลี่ยนอีเมล
            </Button>
          </Stack> */}
        </Box>
        <EditForm
          head="ชื่อ-สกุล"
          value="Vergil Sparda"
          placeholder="ระบุชื่อ-สกุลใหม่"
        />
        <EditForm head="เบอร์โทรศัพท์" placeholder="ระบุเบอร์โทรศัพท์ติดต่อ" />
        <Box>
          <Typography sx={{ fontSize: "16px", pb: 1 }}>ที่อยู่</Typography>
          <TextField
            multiline={true}
            rows={3}
            sx={{ width: "50%" }}
            placeholder="ระบุที่อยู่"
            inputProps={{
              sx: {
                height: "40px",
                fontSize: "14px",
              },
            }}
          />
        </Box>
        <EditForm head="รหัสผ่านใหม่" placeholder="ระบุรหัสผ่านใหม่" />
        <EditForm
          head="รหัสผ่านปัจจุบัน*"
          placeholder="ระบุรหัสผ่านปัจจุบันเพื่อแก้ไข"
        />
      </Stack>
      <Box spacing={2} mt={5} pb={5}>
        <Button sx={{ height: 40, fontSize: 18, px: 2 }} variant="contained">
          <Typography px={2}>แก้ไข</Typography>
        </Button>
      </Box>
    </Box>
  );
}