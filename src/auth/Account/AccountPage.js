import React from "react";
import { Button, Divider, Stack, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HistoryPage from "./HistoryPage";
import ProfilePage from "./ProfilePage";

export default function AccountPage() {
  const [isProfile, setIsProfile] = React.useState(true);
  const handleClick = (event) => {
    if (event.target.value === "true") {
      setIsProfile(true);
    } else {
      setIsProfile(false);
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
            component={Link}
            to={"/"}
          >
            ลงชื่อออก
          </Button>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: "1 1 auto", overflowY: "auto" }}>
          {isProfile ? <ProfilePage /> : <HistoryPage />}
        </Box>
      </Stack>
    </>
  );
}
