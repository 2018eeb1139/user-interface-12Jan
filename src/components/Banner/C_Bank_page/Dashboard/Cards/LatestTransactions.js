import React from "react";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import "./Cards.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const LatestTransactions = ({ recentTransactions }) => {
  return (
    <Card sx={{ marginTop: "1%", marginRight: "1%" }}>
      <CardHeader title="Latest Transaction" className="tx__cardHeader" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>CBDC ID</StyledTableCell>
              <StyledTableCell>Issued to Entity</StyledTableCell>
              <StyledTableCell>Date of Transaction</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
              <StyledTableCell>Valid Until</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow hover key={transaction.uid}>
                <TableCell>{transaction.cbdcid}</TableCell>
                <TableCell>{transaction.issuedtoentity}</TableCell>
                <TableCell>{transaction.timestamp}</TableCell>
                <TableCell>{transaction.value}</TableCell>
                <TableCell>{transaction.validuntil}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default LatestTransactions;
