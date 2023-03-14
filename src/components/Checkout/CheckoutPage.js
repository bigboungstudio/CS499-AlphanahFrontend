import React, { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
  IconButton,
  CardMedia,
  Divider,
  Badge,
  CircularProgress,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import FormatPrice from "../common/FormatPrice";
import { loadUserDetail } from "../../redux/actions/authActions";
import {
  applyCouponToCart,
  removeCouponFromCart,
} from "../../redux/actions/orderActions";
import CancelIcon from "@mui/icons-material/Cancel";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { stripePaymentMethodHandler } from "../../api/stripeApi";

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      color: "black",
      fontFamily: ["Kanit", "sans-serif"].join(","),
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#ababab",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.order.cart);
  const buyer = useSelector((state) => state.auth.buyer);
  const dispatch = useDispatch();
  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    buyer.isAuthentication && dispatch(loadUserDetail("buyer", buyer.token));
  }, [buyer.isAuthentication, buyer.token, dispatch]);

  const [code, setCode] = useState(cart.coupon ? cart.coupon.couponCode : "");
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const handlePaymentComplete = () => {
    setIsPaymentComplete(true);
    setLoading(false);
  };

  const handleCouponChange = (e) => {
    setCode(e.target.value);
  };
  const handleApplyCoupon = () => {
    code !== "" && dispatch(applyCouponToCart(code, buyer.token));
  };
  const handleRemoveCoupon = () => {
    dispatch(removeCouponFromCart(buyer.token, () => setCode("")));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: formValues.firstname + " " + formValues.lastname,
      },
    });

    stripePaymentMethodHandler(
      stripe,
      result,
      formValues,
      buyer.token,
      handlePaymentComplete
    );
  };

  const handleUseProfile = (e) => {
    setIsChecked(e.target.checked);
    isChecked === false &&
      buyer.currentUser.accountUUID !== undefined &&
      setFormValues({
        ...formValues,
        firstname: buyer.currentUser.firstname,
        lastname: buyer.currentUser.lastname,
        address: buyer.currentUser.address ?? "",
        phone: buyer.currentUser.phone ?? "",
      });
    isChecked === true &&
      setFormValues({
        ...formValues,
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
      });
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (
      name === "number" ||
      name === "month" ||
      name === "year" ||
      name === "ccv" ||
      name === "phone"
    ) {
      value = value.replace(/\D/g, "");
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        {isPaymentComplete ? (
          <Stack
            spacing={2}
            sx={{
              pt: 15,
              alignItems: "center",
              width: "50%",
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 70, color: "#01bfa6" }} />
            <Typography sx={{ fontSize: 30 }}>
              ขอบคุณที่ซื้อสินค้ากับทางเรา
            </Typography>
            <Button
              sx={{ fontSize: "22px" }}
              startIcon={<KeyboardBackspaceIcon />}
              size="large"
              component={Link}
              to={"/"}
            >
              เลือกซื้อสินค้าต่อ
            </Button>
          </Stack>
        ) : (
          <Stack
            direction="column"
            spacing={1}
            px={10}
            pt={5}
            pb={5}
            width="45%"
          >
            <Typography pb={2} sx={{ fontSize: "28px" }}>
              ข้อมูลบัตร
            </Typography>
            <Divider />
            <Box py={1}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </Box>
            <Divider />
            {/* <Stack>
              <Typography pb={2} sx={{ fontSize: "28px" }}>
                ข้อมูลบัตร
              </Typography>
              <Box>
                <Typography sx={{ fontSize: "16px", pb: 2 }}>
                  หมายเลขบัตร *
                </Typography>
                <TextField
                  name="ccnumber"
                  required
                  sx={{ width: "100%" }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                      component: CardNumberElement,
                    },
                    sx: { height: "45px", fontSize: "16px" },
                  }}
                />
              </Box>
              <Stack pt={3} pb={5} direction="row">
                <Box width="30%">
                  <Typography sx={{ fontSize: "16px", pb: 2 }}>
                    วันหมดอายุ *
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                      required
                      name="ccexp"
                      sx={{ width: "50%" }}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        inputComponent: StripeInput,
                        inputProps: {
                          component: CardExpiryElement,
                        },
                        sx: {
                          height: "45px",
                          fontSize: "16px",
                          "& input": {
                            textAlign: "center",
                          },
                        },
                      }}
                    />
                  </Stack>
                </Box>
                <Box width="30%">
                  <Typography sx={{ fontSize: "16px", pb: 2 }}>
                    รหัสการรักษาความปลอดภัย *
                  </Typography>
                  <TextField
                    required
                    name="cvc"
                    sx={{ width: "50%" }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      inputComponent: StripeInput,
                      inputProps: {
                        component: CardCvcElement,
                      },
                      sx: {
                        height: "45px",
                        fontSize: "16px",
                        "& input": {
                          textAlign: "center",
                        },
                      },
                    }}
                  />
                </Box>
              </Stack>
            </Stack> */}

            <Stack spacing={1}>
              <Typography sx={{ fontSize: "28px" }}>ข้อมูลส่วนตัว</Typography>
              <FormControlLabel
                control={
                  <Checkbox checked={isChecked} onChange={handleUseProfile} />
                }
                label="ใช้ข้อมูลส่วนตัวจากในบัญชี"
              />
              <Stack direction="row" spacing={2} pb={2}>
                <Box width="50%">
                  <Typography sx={{ fontSize: "16px", pb: 2 }}>ชื่อ</Typography>
                  <TextField
                    name="firstname"
                    value={formValues.firstname}
                    onChange={handleInputChange}
                    placeholder="ระบุชื่อ"
                    sx={{ width: "100%" }}
                    InputProps={{
                      sx: { height: "45px", fontSize: "16px" },
                    }}
                  />
                </Box>
                <Box width="50%">
                  <Typography sx={{ fontSize: "16px", pb: 2 }}>
                    นามสกุล
                  </Typography>
                  <TextField
                    name="lastname"
                    value={formValues.lastname}
                    onChange={handleInputChange}
                    placeholder="ระบุนามสกุล"
                    sx={{ width: "100%" }}
                    InputProps={{
                      sx: { height: "45px", fontSize: "16px" },
                    }}
                  />
                </Box>
              </Stack>
              <Box pb={2} width="100%">
                <Typography sx={{ fontSize: "16px", pb: 2 }}>
                  เบอร์โทรศัพท์
                </Typography>
                <TextField
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  placeholder="ระบุเบอร์โทรศัพท์"
                  sx={{ width: "100%" }}
                  InputProps={{
                    sx: { height: "45px", fontSize: "16px" },
                  }}
                />
              </Box>
              <Box pb={2} width="100%">
                <Typography sx={{ fontSize: "16px", pb: 2 }}>
                  ที่อยู่
                </Typography>
                <TextField
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  multiline={true}
                  rows={3}
                  sx={{ width: "100%" }}
                  placeholder="ระบุที่อยู่"
                  InputProps={{
                    sx: { fontSize: "16px" },
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        )}
        <Box sx={{ bgcolor: "#f5f5f5", flexGrow: 1 }}>
          <Stack px={8} spacing={2} py={10}>
            {cart.cartItems.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Badge
                    badgeContent={
                      <Typography sx={{ color: "white" }}>
                        {item.quantity}
                      </Typography>
                    }
                    color="primary"
                  >
                    <CardMedia
                      component="img"
                      alt={item.product.name}
                      src={item.product.mainImage.path}
                      sx={{
                        objectFit: "contain",
                        width: 100,
                        height: 80,
                      }}
                    />
                  </Badge>
                  <Box>
                    <Typography sx={{ fontSize: "20px" }}>
                      {item.product.name}
                    </Typography>
                    {item.product.options.length !== 1 && (
                      <Typography sx={{ fontSize: "18px" }}>
                        ({item.option.name})
                      </Typography>
                    )}
                    <Typography sx={{ color: "#ababab" }}>
                      {item.product.creator.firstname +
                        " " +
                        item.product.creator.lastname}
                    </Typography>
                  </Box>
                </Stack>
                <Typography sx={{ fontSize: "20px" }}>
                  {FormatPrice(item.option.price)}
                </Typography>
              </Stack>
            ))}
            <Divider />
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <TextField
                disabled={isPaymentComplete}
                value={code}
                onChange={handleCouponChange}
                sx={{
                  flexGrow: 1,
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#faaf00",
                    },
                    "&:hover fieldset": {
                      borderColor: "#faaf00",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#faaf00",
                    },
                  },
                }}
                InputProps={{
                  style: { height: "45px", fontSize: "16px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <ConfirmationNumberIcon sx={{ color: "#faaf00" }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="กรอกคูปอง"
              />
              {cart.coupon ? (
                <IconButton
                  disabled={isPaymentComplete}
                  color="error"
                  onClick={handleRemoveCoupon}
                >
                  <CancelIcon />
                </IconButton>
              ) : (
                <Button
                  disabled={isPaymentComplete}
                  onClick={handleApplyCoupon}
                  sx={{
                    height: "40px",
                    width: 100,
                    bgcolor: "#faaf00",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ffe87d",
                    },
                  }}
                  variant="contained"
                >
                  ใช้งาน
                </Button>
              )}
            </Stack>
            <Divider />
            <Stack spacing={2}>
              <Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 20 }}>ค่าส่ง:</Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    {FormatPrice(cart.deliveryFee)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" pb={2}>
                  <Typography sx={{ fontSize: 20 }}>ค่าสินค้า:</Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    {FormatPrice(cart.totalPrice)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 20 }}>ราคารวม:</Typography>
                  <Typography sx={{ fontSize: 20 }}>
                    {FormatPrice(cart.totalPrice + cart.deliveryFee)}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              {!isPaymentComplete && (
                <Button
                  disabled={loading}
                  onClick={handleSubmit}
                  sx={{
                    maxWidth: "40%",
                    fontSize: 20,
                    alignSelf: "end",
                    width: "40%",
                  }}
                  variant="contained"
                >
                  {loading ? <CircularProgress size={24} /> : "ชำระเงิน"}
                </Button>
              )}

              {/* <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            หรือ สแกนจ่ายด้วยแอปพลิเคชันธนาคาร :
          </Typography>
          <img src="/qr.png" alt="qr" width="200px" display="block" /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
