import React from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Checkbox,
  FormControlLabel,
  Box,
  Card,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

export default function SellerAddProductPage() {
  const newOption = (
    <Box width="95%">
      <Stack direction="row" alignItems="center" spacing={2} pb={3}>
        <Typography>รายละเอียดตัวเลือก *</Typography>
        <TextField
          placeholder="ระบุรายละเอียดตัวเลือก"
          sx={{ minWidth: "50%", bgcolor: "white" }}
          inputProps={{
            sx: {
              height: "7px",
              fontSize: "14px",
            },
          }}
        />
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>ราคา *</Typography>
          <TextField
            placeholder="ระบุราคาตัวเลือก"
            sx={{ bgcolor: "white" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>จำนวน *</Typography>
          <TextField
            placeholder="ระบุจำนวนตัวเลือก"
            sx={{ bgcolor: "white" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
  const [isOne, setIsOne] = React.useState(true);
  const [productOptions, setProductOptions] = React.useState([newOption]);

  const handleChange = (event) => {
    if (event.target.value === "1") {
      setIsOne(true);
    } else {
      setIsOne(false);
    }
  };
  const handleAdd = (event) => {
    const newList = productOptions.concat(newOption);
    setProductOptions(newList);
  };
  function handleRemove(i) {
    setProductOptions([
      ...productOptions.slice(0, i),
      ...productOptions.slice(i + 1),
    ]);
  }

  function OneOption() {
    return (
      <>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>ราคา *</Typography>
          <TextField
            placeholder="ระบุราคาสินค้า"
            sx={{ minWidth: "50%" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>จำนวนสินค้า *</Typography>
          <TextField
            placeholder="ระบุจำนวนสินค้า"
            sx={{ minWidth: "50%" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
      </>
    );
  }

  function MoreThanOneOptions() {
    return productOptions.map((option, i) => {
      return (
        <Stack direction="row" key={i} pb={2} bgcolor="#f5f5f5" padding={3}>
          {option}
          {productOptions.length !== 1 && (
            <IconButton onClick={() => handleRemove(i)}>
              <RemoveCircleIcon color="error" />
            </IconButton>
          )}
        </Stack>
      );
    });
  }
  return (
    <Stack spacing={4}>
      <Stack bgcolor="white" padding={5} spacing={4}>
        <Typography sx={{ fontSize: "30px", py: 2 }}>ข้อมูลทั่วไป</Typography>

        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>ชื่อสินค้า *</Typography>
          <TextField
            placeholder="ระบุชื่อสินค้า"
            sx={{ minWidth: "50%" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "15%", pt: 2 }}>
            รายละเอียดสินค้า *
          </Typography>
          <TextField
            multiline={true}
            rows={6}
            placeholder="ระบุรายละเอียดสินค้า"
            sx={{ minWidth: "50%" }}
            inputProps={{
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>หมวดหมู่สินค้า *</Typography>
          <Typography color="#ababab">เลือกหมวดหมู่สินค้า</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack bgcolor="white" padding={5} spacing={4}>
        <Typography sx={{ fontSize: "30px", py: 2 }}>ข้อมูลการขาย *</Typography>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>สินค้ามีกี่ตัวเลือก *</Typography>
          <FormControlLabel
            label="1 ตัวเลือก"
            control={
              <Checkbox
                checked={isOne}
                value="1"
                onChange={handleChange}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
            }
          />
          <FormControlLabel
            label="มากกว่า 1 ตัวเลือก"
            control={
              <Checkbox
                checked={!isOne}
                value="0"
                onChange={handleChange}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
            }
          />
        </Stack>
        {!isOne && (
          <>
            <Button
              onClick={handleAdd}
              variant="contained"
              sx={{ width: "20%" }}
            >
              เพิ่มตัวเลือกของสินค้า
            </Button>
          </>
        )}
        {isOne ? OneOption() : MoreThanOneOptions()}
      </Stack>

      <Stack bgcolor="white" padding={5}>
        <Typography sx={{ fontSize: "30px", py: 2 }}>ข้อมูลรูปภาพ</Typography>
        <Stack direction="row" spacing={2}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography>รูปหลักของสินค้า *</Typography>
              <ImageCard />
            </Stack>

            <Typography>รูปเพิ่มเติม</Typography>
            <Grid container alignContent="space-evenly">
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
              <ImageCard />
            </Grid>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ pb: 5 }}>
        <Button
          component={Link}
          to={"/seller/products"}
          variant="contained"
          sx={{ width: "15%", fontSize: 20, mr: 5 }}
        >
          เพิ่ม
        </Button>
        <Button
          component={Link}
          to={"/seller/products"}
          variant="outlined"
          sx={{ width: "15%", fontSize: 20 }}
        >
          ยกเลิก
        </Button>
      </Box>
    </Stack>
  );
  function ImageCard() {
    return (
      <Card
        sx={{
          display: "flex",
          borderStyle: "dashed",
          borderWidth: 1,
          backgroundColor: "#f5f5f5",
          width: 160,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
          mb: 2,
        }}
      >
        <AddCircleOutlineIcon
          sx={{
            fontSize: 40,
          }}
        />
      </Card>
    );
  }
}
