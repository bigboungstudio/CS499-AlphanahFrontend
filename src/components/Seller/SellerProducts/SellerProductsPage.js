import React, { useState } from "react";
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
  Avatar,
  Menu,
  Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function SellerProductsPage() {
  const [value, setValue] = useState("all");
  const [sortOption, setSortOption] = useState("ล่าสุด");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeSort = (event) => {
    setSortOption(event.target.value);
    if (event.target.value === "ล่าสุด") {
    } else if (event.target.value === "ราคาสูงสุด") {
    } else if (event.target.value === "ราคาต่ำสุด") {
    }
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <TableRow>
        <TableCell align="center">
          <Stack direction="row" pl={5} alignItems="center">
            <Avatar
              alt="yamato"
              src="/yamato.png"
              sx={{
                width: 80,
                height: 80,
                pr: 8,
              }}
            />
            <Typography sx={{ fontSize: "22px" }}>Yamato sword</Typography>
          </Stack>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          100
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
          ฿96.00
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          0
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "20px" }}>
          10/02/2566
        </TableCell>
        <TableCell>
          <Stack>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem component={Link} to={"/seller/products/edit"}>
                  แก้ไขสินค้า
                </MenuItem>
                <MenuItem onClick={handleClose}>ดูหน้าร้านค้า</MenuItem>
                <MenuItem onClick={handleClose}>ลบสินค้า</MenuItem>
              </Menu>
            </Box>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Box bgcolor="white" py={5}>
      <Box mx={4}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography sx={{ fontSize: "30px" }}>สินค้าของคุณ</Typography>
          <Button
            component={Link}
            to={"/seller/products/add"}
            variant="contained"
            sx={{ fontSize: 20 }}
          >
            เพิ่มสินค้าใหม่
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography>หมวดหมู่:</Typography>
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
                ทั้งหมด
              </MenuItem>
            </TextField>
          </Stack>
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
          sx={{ py: 2 }}
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="all" label="ทั้งหมด (10)" />
          <Tab value="out" label="หมดสต็อก (2)" />
        </Tabs>

        <Stack alignItems="center" direction="row" py={2} justifyContent="end">
          <Typography pr={2}>เรียงโดย:</Typography>
          <TextField
            size="small"
            select
            value={sortOption}
            onChange={handleChangeSort}
            sx={{ minWidth: "120px" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          >
            <MenuItem key="ล่าสุด" value="ล่าสุด">
              ล่าสุด
            </MenuItem>
            <MenuItem key="ราคาสูงสุด" value="ราคาสูงสุด">
              ราคาสูงสุด
            </MenuItem>
            <MenuItem key="ราคาต่ำสุด" value="ราคาต่ำสุด">
              ราคาต่ำสุด
            </MenuItem>
          </TextField>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <ProductsTableHeadCell text="สินค้า" />
              <ProductsTableHeadCell text="ขายไปแล้ว" />
              <ProductsTableHeadCell text="ราคา" />
              <ProductsTableHeadCell text="เหลือสินค้า" />
              <ProductsTableHeadCell text="เพิ่มตั้งแต่" />
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
