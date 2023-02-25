import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Avatar,
  Pagination,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SellerOrderDetail from "./SellerOrderDetail";

export default function SellerOrdersPage() {
  const [value, setValue] = React.useState("all");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function ProductsTableHeadCell({ text }) {
    return (
      <TableCell>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {text}
          </Typography>
        </Stack>
      </TableCell>
    );
  }

  function HistoryTableBody() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <TableRow>
        <TableCell align="center">
          <Stack>
            <Stack direction="row" alignItems="center" px={3}>
              <Avatar
                alt="yamato"
                src="/yamato.png"
                sx={{
                  width: 80,
                  height: 80,
                  pr: 5,
                }}
              />
              <Stack
                flexGrow={1}
                direction="row"
                justifyContent="space-between"
              >
                <Typography sx={{ fontSize: "20px" }}>Yamato sword</Typography>
                <Typography sx={{ fontSize: "20px" }}>x2</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" px={3}>
              <Avatar
                alt="arm"
                src="/arm.png"
                sx={{
                  width: 80,
                  height: 80,
                  pr: 5,
                }}
              />
              <Stack
                flexGrow={1}
                direction="row"
                justifyContent="space-between"
              >
                <Typography sx={{ fontSize: "20px" }}>Nero's arm</Typography>
                <Typography sx={{ fontSize: "20px" }}>x1</Typography>
              </Stack>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
          ฿96.00
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#FB6376" }}>
          รอจัดส่ง
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={handleClickOpen}
            sx={{ fontSize: "20px", color: "black" }}
          >
            ดูรายละเอียด
          </Button>
          <SellerOrderDetail open={open} handleClose={handleClose} />
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "blue" }}>
          จัดส่ง
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Box bgcolor="white" py={5}>
      <Box mx={4}>
        <Typography sx={{ fontSize: "30px", mb: 3 }}>
          คำสั่งซื้อของลูกค้า
        </Typography>

        <Stack direction="row" alignItems="center">
          <TextField
            sx={{ width: "30%" }}
            placeholder="ค้นหาสินค้า"
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Tabs
          sx={{ pt: 2 }}
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="all" label="ทั้งหมด (10)" />
          <Tab value="needship" label="รอจัดส่ง (4)" />
          <Tab value="shipping" label="กำลังจัดส่ง (4)" />
          <Tab value="done" label="เสร็จสมบูรณ์ (2)" />
        </Tabs>

        <Stack alignItems="center" direction="row" py={2} justifyContent="end">
          <Typography pr={2}>เรียงโดย:</Typography>
          <TextField
            size="small"
            select
            defaultValue="เลือก"
            sx={{ minWidth: "120px" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <ProductsTableHeadCell text="สินค้า" />
              <ProductsTableHeadCell text="ราคารวม" />
              <ProductsTableHeadCell text="สถานะ" />
              <ProductsTableHeadCell text="รายละเอียดลูกค้า" />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <HistoryTableBody />
            <HistoryTableBody />
          </TableBody>
        </Table>
        <Stack mt={4} direction="row" justifyContent="space-between">
          <div></div>
          <Pagination count={5} alignself="end" />
        </Stack>
      </Box>
    </Box>
  );
}
