import React from "react";
import { Stack, TextField, Typography, Divider, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { AuthButton } from "../auth/AuthComponents";

export default function CheckoutPage() {
  return (
    <>
      <Typography pt={5} px={5} sx={{ fontSize: "30px" }}>
        ชำระเงิน
      </Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2} padding={5} width="50%">
          <Typography sx={{ fontSize: "16px" }}>หมายเลขบัตร</Typography>
          <TextField placeholder="ระบุหมายเลขบัตร" />
          <Stack
            pt={3}
            spacing={5}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography sx={{ fontSize: "16px", pb: 2 }}>
                วันหมดอายุ
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    placeholder="ดด"
                    InputProps={{
                      sx: {
                        "& input": {
                          textAlign: "center",
                        },
                      },
                    }}
                  />
                  <Typography>/</Typography>
                  <TextField
                    placeholder="ปป"
                    InputProps={{
                      sx: {
                        "& input": {
                          textAlign: "center",
                        },
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "16px", pb: 2 }}>
                รหัสการรักษาความปลอดภัย
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  placeholder="CVV"
                  InputProps={{
                    sx: {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <HelpOutlineIcon />
              </Stack>
            </Box>
          </Stack>

          {/* <FormControlLabel control={<Checkbox />} label="จำข้อมูลบัตรไว้" /> */}
          <Typography
            pt={5}
            variant="h5"
            noWrap
            component="div"
            color="black"
            fontWeight="bold"
          >
            ราคารวม: ฿96.00
          </Typography>
          <AuthButton label="ชำระทันที" />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack
          flexGrow={1}
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            หรือ สแกนจ่ายด้วยแอปพลิเคชันธนาคาร :
          </Typography>
          <img src="/qr.png" alt="qr" width="200px" display="block" />
        </Stack>
      </Stack>
    </>
  );
}
