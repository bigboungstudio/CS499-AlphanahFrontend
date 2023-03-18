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
  Grid,
  ButtonBase,
  Stack,
  Badge,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";

function ImageCard({ handleUploadImage }) {
  return (
    <ButtonBase component="label">
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
        }}
      >
        <CloudUploadOutlinedIcon
          sx={{
            fontSize: 40,
          }}
        />
      </Card>
      <input type="file" accept="image/*" hidden onChange={handleUploadImage} />
    </ButtonBase>
  );
}

export default function WriteReviewPage({
  open,
  handleClose,
  handleCreateReview,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const initialValues = {
    rating: 0,
    message: "",
    images: [],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };
  const handleUploadImage = (event) => {
    const newImages = [...formValues.images];
    newImages.push({
      file: event.target.files[0],
      path: URL.createObjectURL(event.target.files[0]),
    });
    if (event.target.files.length !== 0) {
      event.preventDefault();
      setFormValues({
        ...formValues,
        images: newImages,
      });
    }
  };
  const handleRemoveImage = (index) => {
    const newImages = [...formValues.images];
    newImages.splice(index, 1);
    setFormValues({
      ...formValues,
      images: newImages,
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
                    setFormValues(initialValues);
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
            <Typography sx={{ fontSize: 16, fontWeight: "bold", pb: 3 }}>
              อัพโหลดรูป
            </Typography>
            <Grid container spacing={10}>
              {formValues.images.length > 0 &&
                formValues.images.map((image, index) => (
                  <Grid item key={index}>
                    <Badge
                      key={index}
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      badgeContent={
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <CancelIcon sx={{ fontSize: 26 }} />
                        </IconButton>
                      }
                    >
                      <CardMedia
                        component="img"
                        src={image.path}
                        alt="secondary"
                        sx={{ objectFit: "contain", width: 160, height: 100 }}
                      />
                    </Badge>
                  </Grid>
                ))}
              {formValues.images.length <= 2 && (
                <Grid item>
                  <ImageCard handleUploadImage={handleUploadImage} />
                </Grid>
              )}
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
