import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export function ViewMinted(props) {
  const cols = [
    { field: "cbdcid", headerName: "CBDC ID", width: 85 },
    { field: "uid", headerName: "Unique ID", width: 200 },
    { field: "value", headerName: "Denomination", width: 150 },
    { field: "createdtimestamp", headerName: "Date Created", width: 250 },
    { field: "owner", headerName: "Owner", width: 100 },
    { field: "timestamp", headerName: "Date of Transaction", width: 250 },
    { field: "validuntil", headerName: "Valid Until", width: 250 },
    { field: "currency", headerName: "Currency", width: 75 },
    { field: "issuedbyentity", headerName: "Issued By", width: 100 },
    { field: "issuedtoentity", headerName: "Issued To", width: 100 },
  ];

  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  if (!props.data) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ margin: "150px" }}
      >
        {loading && <span className="spinner-border "></span>}
      </div>
    );
  } else {
    return (
      <div className="table">
        <DataGrid
          getRowId={(row) => row.cbdcid}
          rows={props.data}
          columns={cols}
          // pagination
          // pageSize={pageSize}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // rowsPerPageOptions={[5, 10, 20]}
          autoHeight
        />
      </div>
    );
  }
}
