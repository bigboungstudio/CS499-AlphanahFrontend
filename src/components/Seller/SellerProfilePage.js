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

export default function SellerProfilePage() {
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
    <Box bgcolor="white" py={5}>
      <Box mx={8}>
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
        </Stack>

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
            head="ชื่อร้าน"
            value="Vergil Sparda"
            placeholder="ระบุชื่อร้านใหม่"
          />
          <EditForm
            head="เบอร์โทรศัพท์"
            placeholder="ระบุเบอร์โทรศัพท์ติดต่อ"
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
              inputProps={{
                sx: {
                  height: "40px",
                  fontSize: "14px",
                },
              }}
            />
          </Box>
        </Stack>
        <Box spacing={2} mt={5}>
          <Button sx={{ height: 40, fontSize: 18, px: 2 }} variant="contained">
            <Typography px={2}>แก้ไข</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
