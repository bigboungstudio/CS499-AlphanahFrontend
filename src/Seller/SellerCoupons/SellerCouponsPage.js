import React from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function SellerCouponsPage() {
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

  function ProductsTableBody() {
    return (
      <TableRow>
        <TableCell align="center">
          <Typography sx={{ fontSize: "20px" }}>STEVEZA007</Typography>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#FB6376" }}>
          คูปองเงินสด
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
          ฿100
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          100
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          10/02/2566
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          11/02/2566
        </TableCell>
        <TableCell>
          <Stack>
            <IconButton sx={{ color: "#FB6376" }}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <Box bgcolor="white" py={5}>
      <Box mx={4}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography sx={{ fontSize: "30px" }}>คูปองของคุณ</Typography>
          <Button
            component={Link}
            to={"/seller/coupons/add"}
            variant="contained"
            sx={{ fontSize: 20 }}
          >
            เพิ่มคูปองใหม่
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography>ประเภท:</Typography>
            <TextField
              size="small"
              select
              defaultValue="ทั้งหมด"
              sx={{ minWidth: "200px" }}
              inputProps={{
                sx: {
                  height: "7px",
                  fontSize: "14px",
                },
              }}
            >
              <MenuItem key="ทั้งหมด" value="ทั้งหมด">
                ทุกประเภท
              </MenuItem>
              <MenuItem key="ส่วนลด" value="ส่วนลด">
                คูปองส่วนลด
              </MenuItem>
              <MenuItem key="เงินสด" value="เงินสด">
                คูปองเงินสด
              </MenuItem>
              <MenuItem key="ค่าส่ง" value="ค่าส่ง">
                คูปองค่าส่ง
              </MenuItem>
            </TextField>
          </Stack>
          <TextField
            sx={{ width: "30%" }}
            placeholder="ค้นหารหัสคูปอง"
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
          sx={{ py: 2 }}
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="all" label="ทั้งหมด (10)" />
          <Tab value="use" label="ใช้งานได้ (8)" />
          <Tab value="out" label="หมดอายุ (2)" />
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
              <ProductsTableHeadCell text="รหัสคูปอง" />
              <ProductsTableHeadCell text="ประเภท" />
              <ProductsTableHeadCell text="ส่วนลด" />
              <ProductsTableHeadCell text="จำนวนการใช้งาน" />
              <ProductsTableHeadCell text="เริ่มใช้งานได้" />
              <ProductsTableHeadCell text="หมดอายุ" />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <ProductsTableBody />
            <ProductsTableBody />
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
