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
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryTableBody from "./HistoryTableBody";

export default function HistoryPage({ histories }) {
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
      <Box sx={{ marginTop: "8%", px: "5%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <HistoryTableHeadCell text="สินค้า" />
              <HistoryTableHeadCell text="วันที่" />
              <HistoryTableHeadCell text="ราคารวม" />
            </TableRow>
          </TableHead>
          <TableBody>
            {histories.map((history, index) => (
              <HistoryTableBody key={index} history={history} />
            ))}
          </TableBody>
        </Table>
        {histories && histories.length > 5 && (
          <Stack mt={5} direction="row" justifyContent="space-between">
            <div></div>
            <Pagination
              count={Math.ceil(histories.length / 5)}
              alignself="end"
            />
          </Stack>
        )}
      </Box>
    </>
  );
}
