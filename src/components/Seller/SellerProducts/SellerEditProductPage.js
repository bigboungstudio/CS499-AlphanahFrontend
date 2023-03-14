import React, { useEffect, useState } from "react";
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
  Badge,
  CardMedia,
  ButtonBase,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NewOption from "./NewOption";
import { loadCategories } from "../../../redux/actions/categoryActions";
import SelectCategoriesDrawer from "./SelectCategoriesDrawer";
import CancelIcon from "@mui/icons-material/Cancel";
import { updateProduct } from "../../../redux/actions/productActions";

export default function SellerEditProductPage() {
  const params = useParams().UUID;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seller = useSelector((state) => state.auth.seller);
  const products = useSelector((state) => state.products.merchantProducts.data);
  const product = {
    ...products.find((product) => product.productUUID === params),
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  const [isOne, setIsOne] = useState(product.options.length === 1);
  const initialValues = {
    productUUID: product.productUUID ?? "",
    name: product.name ?? "",
    description: product.description ?? "",
    category:
      {
        ...product.categories.find((category) => category.level === 1),
      } ?? {},
    options:
      [
        ...product.options.map((option, index) => {
          return { ...option, id: index.toString() };
        }),
      ] ?? [],
    mainImage: product.mainImage ?? {},
    images: product.images ?? [],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [deleteValues, setDeleteValues] = useState({
    category: {},
    options: [],
    mainImage: {},
    images: [],
  });

  const handleOptionTypeChange = (event) => {
    if (event.target.value === "1") {
      setIsOne(true);
      const deleteOptions = [...deleteValues.options];
      formValues.options.map(
        (option) => option.optionUUID && deleteOptions.push(option)
      );
      setDeleteValues({ ...deleteValues, options: deleteOptions });
      setFormValues({
        ...formValues,
        options: [{ id: "0", name: "default", price: "", quantity: "" }],
      });
    } else {
      setIsOne(false);
      formValues.options === initialValues.options &&
        setDeleteValues({ ...deleteValues, options: initialValues.options });
      setFormValues({
        ...formValues,
        options: [{ id: "0", name: "", price: "", quantity: "" }],
      });
    }
  };
  const handleAddOption = () => {
    const newOption = {
      id: formValues.options.length.toString(),
      name: "",
      price: "",
      quantity: "",
    };
    const newOptionlist = [...formValues.options.concat(newOption)];
    setFormValues({ ...formValues, options: newOptionlist });
  };
  function handleRemoveOption(i) {
    const deleteOptions = [...deleteValues.options];
    formValues.options[i].optionUUID &&
      deleteOptions.push(formValues.options[i]);
    setDeleteValues({ ...deleteValues, options: deleteOptions });
    const newOptions = [
      ...formValues.options.slice(0, i),
      ...formValues.options.slice(i + 1),
    ];

    setFormValues({
      ...formValues,
      options: newOptions.map((option, index) => {
        return { ...option, id: index.toString() };
      }),
    });
  }

  const [open, setOpen] = useState(false);
  function toggleDrawer(newOpen) {
    setOpen(newOpen);
  }
  const handleSelectCategory = (e) => {
    if (e.categoryUUID !== initialValues.category.categoryUUID) {
      setDeleteValues({
        ...deleteValues,
        category: {
          ...product.categories.find((category) => category.level === 0),
        },
      });
    } else if (e.categoryUUID === initialValues.category.categoryUUID) {
      setDeleteValues({ ...deleteValues, category: {} });
    }
    setFormValues({ ...formValues, category: e });
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleOptionChange = (e) => {
    let { name, value, id } = e.target;
    if (name === "price" || name === "quantity") {
      value = value.replace(/\D/g, "");
      if (parseInt(value) > 1000000) {
        value = "1000000";
      } else if (parseInt(value) < 1) {
        value = "1";
      }
    }
    const newOption = { ...formValues.options[id], [name]: value };
    setFormValues({
      ...formValues,
      options: [
        ...formValues.options.map((option) =>
          option.id === id ? newOption : option
        ),
      ],
    });
  };

  const handleUploadMainImage = (event) => {
    if (event.target.files.length !== 0) {
      event.preventDefault();
      setFormValues({
        ...formValues,
        mainImage: {
          file: event.target.files[0],
          path: URL.createObjectURL(event.target.files[0]),
        },
      });
    }
  };
  const handleRemoveMainImage = () => {
    formValues.mainImage.imageUUID &&
      setDeleteValues({
        ...deleteValues,
        mainImage: { ...initialValues.mainImage },
      });
    setFormValues({
      ...formValues,
      mainImage: {},
    });
  };
  const handleUploadSecondaryImage = (event) => {
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
  const handleRemoveSecondaryImage = (index) => {
    const deleteImages = [...deleteValues.images];
    formValues.images[index].imageUUID &&
      deleteImages.push(formValues.images[index]);
    setDeleteValues({ ...deleteValues, images: deleteImages });
    const newImages = [...formValues.images];
    newImages.splice(index, 1);
    setFormValues({
      ...formValues,
      images: newImages,
    });
  };

  function MoreThanOneOptions() {
    return formValues.options.map((option, i) => {
      return (
        <Stack direction="row" key={i} pb={2} bgcolor="#f5f5f5" padding={3}>
          <NewOption option={option} handleOptionChange={handleOptionChange} />
          {formValues.options.length !== 1 && (
            <IconButton onClick={() => handleRemoveOption(i)}>
              <RemoveCircleIcon color="error" />
            </IconButton>
          )}
        </Stack>
      );
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      updateProduct(
        formValues,
        deleteValues,
        seller.token,
        () => navigate("/seller/products"),
        () => setLoading(false)
      )
    );
  };

  function OneOption() {
    return (
      <>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>ราคา *</Typography>
          <TextField
            id="0"
            name="price"
            onChange={handleOptionChange}
            value={formValues.options[0].price}
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
            id="0"
            name="quantity"
            onChange={handleOptionChange}
            value={formValues.options[0].quantity}
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

  return (
    <Stack spacing={4}>
      <Stack bgcolor="white" padding={5} spacing={4}>
        <Typography sx={{ fontSize: "30px", py: 2 }}>ข้อมูลทั่วไป</Typography>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>ชื่อสินค้า *</Typography>
          <TextField
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="ระบุชื่อสินค้า"
            sx={{ minWidth: "50%" }}
            inputProps={{
              maxLength: 120,
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
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            multiline={true}
            rows={6}
            placeholder="ระบุรายละเอียดสินค้า"
            sx={{ minWidth: "50%" }}
            inputProps={{
              maxLength: 255,
              sx: {
                height: "7px",
                fontSize: "14px",
              },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ width: "15%" }}>หมวดหมู่สินค้า *</Typography>
          <Typography color="#ababab">{formValues.category.name}</Typography>
          <IconButton onClick={() => toggleDrawer(true)}>
            <EditIcon />
          </IconButton>
          <SelectCategoriesDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            handleSelectCategory={handleSelectCategory}
          />
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
                onChange={handleOptionTypeChange}
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
                onChange={handleOptionTypeChange}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
            }
          />
        </Stack>
        {!isOne && (
          <>
            <Button
              onClick={handleAddOption}
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
              <Box alignItems="start">
                {Object.keys(formValues.mainImage).length === 0 ? (
                  <ImageCardMain />
                ) : (
                  <Badge
                    sx={{ mr: 2, mb: 2 }}
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={
                      <IconButton color="error" onClick={handleRemoveMainImage}>
                        <CancelIcon sx={{ fontSize: 26 }} />
                      </IconButton>
                    }
                  >
                    <CardMedia
                      component="img"
                      src={formValues.mainImage.path}
                      alt="main"
                      sx={{ objectFit: "contain", width: 160, height: 100 }}
                    />
                  </Badge>
                )}
              </Box>
            </Stack>

            <Typography>รูปเพิ่มเติม (สูงสุด 8 รูป)</Typography>
            <Grid container alignContent="space-evenly">
              {formValues.images.length > 0 &&
                formValues.images.map((image, index) => (
                  <Badge
                    sx={{ mr: 2, mb: 2 }}
                    key={index}
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveSecondaryImage(index)}
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
                ))}
              {formValues.images.length <= 7 && <ImageCardSecondary />}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ pb: 5 }}>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "15%", fontSize: 20, mr: 5 }}
        >
          {loading ? <CircularProgress size={24} /> : "แก้ไข"}
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

  function ImageCardMain() {
    return (
      <ButtonBase component="label" sx={{ mr: 2, mb: 2 }}>
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
          <AddCircleOutlineIcon
            sx={{
              fontSize: 40,
            }}
          />
        </Card>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleUploadMainImage}
        />
      </ButtonBase>
    );
  }

  function ImageCardSecondary() {
    return (
      <ButtonBase component="label" sx={{ mr: 2, mb: 2 }}>
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
          <AddCircleOutlineIcon
            sx={{
              fontSize: 40,
            }}
          />
        </Card>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleUploadSecondaryImage}
        />
      </ButtonBase>
    );
  }
}
