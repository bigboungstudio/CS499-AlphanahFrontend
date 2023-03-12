import React, { useEffect, useState } from "react";
import { Button, Divider, Stack, Typography, Box } from "@mui/material";
import HistoryPage from "./HistoryPage";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadUserDetail,
  logout,
  updateUserDetail,
  updateUserImage,
} from "../../../redux/actions/authActions";
import { loadPurchaseHistory } from "../../../redux/actions/orderActions";

export default function AccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyer = useSelector((state) => state.auth.buyer);
  const history = useSelector((state) => state.order.purchaseHistory);
  useEffect(() => {
    const goHomePage = () => navigate("/");
    !buyer.isAuthentication && goHomePage();
  }, [buyer, navigate]);

  useEffect(() => {
    buyer.isAuthentication && dispatch(loadUserDetail("buyer", buyer.token));
    buyer.isAuthentication && dispatch(loadPurchaseHistory(buyer.token));
    typeof buyer.currentUser.accountUUID !== "undefined" &&
      setFormValues({
        firstname: buyer.currentUser.firstname,
        lastname: buyer.currentUser.lastname,
        address: buyer.currentUser.address ?? "",
        phone: buyer.currentUser.phone ?? "",
      });
  }, [
    buyer.token,
    buyer.isAuthentication,
    dispatch,
    buyer.currentUser.accountUUID,
    buyer.currentUser.firstname,
    buyer.currentUser.lastname,
    buyer.currentUser.address,
    buyer.currentUser.phone,
  ]);

  const [isProfile, setIsProfile] = useState(true);
  const handleClick = (event) => {
    if (event.target.value === "true") {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  };

  const handleLogOut = () => {
    dispatch(logout("buyer"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [formValues, setFormValues] = React.useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateUserDetail("buyer", formValues, buyer.token));
  };
  const handleUpload = async (event) => {
    if (event.target.files.length !== 0) {
      event.preventDefault();
      dispatch(updateUserImage("buyer", event.target.files[0], buyer.token));
    }
  };

  return (
    <>
      <Typography pt={5} px={5} sx={{ fontSize: "25px" }}>
        บัญชีของคุณ
      </Typography>
      <Stack direction="row" spacing={2} flexGrow={1}>
        <Stack
          direction="column"
          spacing={3}
          width="8%"
          padding={5}
          alignItems="start"
        >
          <Button
            color={isProfile ? "primary" : "secondary"}
            sx={{ fontSize: "16px" }}
            value="true"
            onClick={handleClick}
          >
            ข้อมูลบัญชี
          </Button>
          <Button
            color={!isProfile ? "primary" : "secondary"}
            sx={{ fontSize: "16px" }}
            value="false"
            onClick={handleClick}
          >
            ประวัติการสั่งซื้อ
          </Button>
          <Button
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={handleLogOut}
          >
            ลงชื่อออก
          </Button>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: "1 1 auto", overflowY: "auto" }}>
          {typeof buyer.currentUser.accountUUID !== "undefined" && isProfile ? (
            <ProfilePage
              buyer={buyer}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              formValues={formValues}
              handleUpload={handleUpload}
            />
          ) : (
            typeof history !== "undefined" && (
              <HistoryPage histories={history.data} />
            )
          )}
        </Box>
      </Stack>
    </>
  );
}
