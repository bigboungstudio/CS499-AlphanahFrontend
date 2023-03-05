import React, { useState } from "react";
import {
  Typography,
  Rating,
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useTheme } from "@mui/material/styles";

export default function WriteReviewPage({
  open,
  handleClose,
  handleCreateReview,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [formValues, setFormValues] = useState({ rating: 0, message: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };

  return (
    <Dialog
      maxWidth="xl"
      fullScreen={fullScreen}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle
        sx={{ px: 8, pt: 5, pb: 3, fontSize: 35, fontWeight: "bold" }}
      >
        เขียนคำวิจารณ์
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 8 }}>
        <Stack direction="row">
          <Box pr={5}>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              คะแนนสินค้านี้
            </Typography>
            <Rating
              sx={{ pt: 1, fontSize: 50 }}
              value={formValues.rating}
              name="rating"
              precision={1}
              onChange={handleInputChange}
            />
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }} pt={2}>
              ความคิดเห็น
            </Typography>
            <TextField
              name="message"
              multiline={true}
              rows={6}
              value={formValues.message}
              placeholder="เล่าประสบการณ์ที่ได้จากสินค้านี้"
              sx={{ width: 400, mt: 1 }}
              inputProps={{
                maxLength: 255,
              }}
              onChange={handleInputChange}
            />
            <Box py={3} display="flex">
              <Button
                variant="contained"
                sx={{ borderRadius: 5, mr: 2 }}
                onClick={() => {
                  if (formValues.rating !== 0 && formValues.message !== "") {
                    handleCreateReview(formValues);
                    setFormValues({ rating: 0, message: "" });
                    handleClose();
                  }
                }}
              >
                <Typography px={3} py={0.5}>
                  ส่ง
                </Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: 5 }}
                onClick={handleClose}
              >
                <Typography px={3} py={0.5}>
                  ยกเลิก
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              อัพโหลดรูป
            </Typography>
            <Card
              sx={{
                mt: 1,
                borderStyle: "dashed",
                borderWidth: 1,
                backgroundColor: "#f5f5f5",
                width: 350,
                height: 180,
              }}
            >
              <CardContent>
                <Stack alignItems="center" mt={5}>
                  <Typography>ลากและวางไฟล์รูปหรือคลิก</Typography>
                  <CloudUploadOutlinedIcon
                    sx={{
                      fontSize: 40,
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
