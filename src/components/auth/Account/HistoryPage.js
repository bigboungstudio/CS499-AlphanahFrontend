import React from "react";
import {
  TextField,
  InputAdornment,
  Table,
  Box,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryTableBody from "./HistoryTableBody";
import { Stack } from "@mui/system";

export default function HistoryPage({ history }) {
  function HistoryTableHeadCell({ text }) {
    return (
      <TableCell>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {text}
          </Typography>
          <KeyboardArrowDownIcon />
        </Stack>
      </TableCell>
    );
  }
  return (
    <>
      <TextField
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
        sx={{ display: "block", position: "absolute", right: "5%" }}
      />
      <Box sx={{ marginTop: "8%", px: "10%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <HistoryTableHeadCell text="สินค้า" />
              <HistoryTableHeadCell text="วันที่" />
              <HistoryTableHeadCell text="ราคารวม" />
            </TableRow>
          </TableHead>
          <TableBody>
            <HistoryTableBody />
            <HistoryTableBody />
          </TableBody>
        </Table>
        <Stack mt={5} direction="row" justifyContent="space-between">
          <div></div>
          <Pagination count={5} alignself="end" />
        </Stack>
      </Box>
    </>
  );
}
