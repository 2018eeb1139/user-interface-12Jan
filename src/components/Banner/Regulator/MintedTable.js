import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import "./reg.css";

export function MintedTable(props) {
  const cols = [
    { field: "cbdcid", headerName: "CBDC ID", width: 85 },
    { field: "uid", headerName: "Unique ID", width: 200 },
    { field: "value", headerName: "Denomination", width: 100 },
    { field: "owner", headerName: "Owner", width: 100 },
    { field: "issuedbyentity", headerName: "Issued By", width: 100 },
    { field: "issuedtoentity", headerName: "Issued To", width: 100 },
    { field: "timestamp", headerName: "Date of Transaction", width: 200 },
    { field: "createdtimestamp", headerName: "Date Created", width: 200 },
    { field: "validuntil", headerName: "Valid Until", width: 150 },
  ];

  const [loading, setLoading] = useState(true);
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
          rowsPerPageOptions={[2]}
          autoHeight
        />
      </div>
    );
  }
}
