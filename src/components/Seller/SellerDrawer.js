import React from "react";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
const drawerWidth = 250;

export default function SellerDrawer({ location }) {
  const DrawerList = [
    {
      text: "จัดการสินค้า",
      icon: <InventoryIcon />,
      link: "/seller/products",
      color: location.pathname.includes("product") ? "#01bfa6" : "",
    },
    {
      text: "คำสั่งซื้อ",
      icon: <EventNoteIcon />,
      link: "/seller/orders",
      color: location.pathname.includes("order") ? "#01bfa6" : "",
    },
    {
      text: "จัดการคูปอง",
      icon: <ConfirmationNumberIcon />,
      link: "/seller/coupons",
      color: location.pathname.includes("coupon") ? "#01bfa6" : "",
    },
    {
      text: "บัญชีของคุณ",
      icon: <ManageAccountsIcon />,
      link: "/seller/profile",
      color: location.pathname.includes("profile") ? "#01bfa6" : "",
    },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Button component={Link} to={"/seller/home"} sx={{ mt: 2 }}>
        <Stack>
          <Stack direction="row">
            <img height="45px" src="/a.png" alt="logo" />
            <Typography variant="h4" component="div" color="#FB6376" pr={1}>
              lphanah
            </Typography>
          </Stack>
          <Typography pl={15} variant="h4" component="div" color="#FB6376">
            Seller
          </Typography>
        </Stack>
      </Button>
      <Divider />
      <List>
        {DrawerList.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{ color: item.color }}
              component={Link}
              to={item.link}
            >
              <ListItemIcon sx={{ color: item.color }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key="ลงชื่อออก" disablePadding>
          <ListItemButton component={Link} to={"/seller/login"}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="ลงชื่อออก" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
