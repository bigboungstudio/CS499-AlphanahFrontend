import React from "react";
import { TableRow, TableCell, Avatar, Stack, Typography } from "@mui/material";

export default function HistoryTableBody() {
  return (
    <TableRow>
      <TableCell align="center">
        <Stack>
          <Stack direction="row" alignItems="center" px={3}>
            <Avatar
              alt="yamato"
              src="/yamato.png"
              sx={{
                width: 80,
                height: 80,
                pr: 5,
              }}
            />
            <Stack flexGrow={1} direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: "20px" }}>Yamato sword</Typography>
              <Typography sx={{ fontSize: "20px" }}>x2</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" px={3}>
            <Avatar
              alt="arm"
              src="/arm.png"
              sx={{
                width: 80,
                height: 80,
                pr: 5,
              }}
            />
            <Stack flexGrow={1} direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: "20px" }}>Nero's arm</Typography>
              <Typography sx={{ fontSize: "20px" }}>x1</Typography>
            </Stack>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="center" sx={{ fontSize: "20px" }}>
        12/12/2565 02:22 น.
      </TableCell>
      <TableCell align="center" sx={{ fontSize: "20px", color: "#01bfa6" }}>
        ฿96.00
      </TableCell>
    </TableRow>
  );
}
