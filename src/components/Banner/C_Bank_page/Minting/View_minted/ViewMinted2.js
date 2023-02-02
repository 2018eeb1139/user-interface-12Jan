import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

const ViewMinted2 = ({ data }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CBDC ID</TableCell>
              <TableCell>Unique ID</TableCell>
              <TableCell>Denomination</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Date of Transaction</TableCell>
              <TableCell>Valid Until</TableCell>
              <TableCell>Issued By</TableCell>
              <TableCell>Issued To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, limit).map((item) => (
              <TableRow
                hover
                key={item.cbdcid}
                selected={selectedCustomerIds.indexOf(item.cbdcid) !== -1}
              >
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography color="textPrimary" variant="body1">
                      {item.cbdcid}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.uid}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{item.createdtimestamp}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.timestamp}</TableCell>
                <TableCell>{item.validuntil}</TableCell>
                <TableCell>{item.issuedbyentity}</TableCell>
                <TableCell>{item.issuedtoentity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ViewMinted2.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ViewMinted2;
