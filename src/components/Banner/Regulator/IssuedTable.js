import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Select, MenuItem, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import "./reg.css";

export function IssuedTable(props) {
  const [TotalTransfer, setTotalTranfer] = useState(0);
  const [Entity, setEntity] = useState("");
  const [entityData, setEntityData] = useState([]);

  console.log(props.alldata);

  const entityHandler = (event) => {
    setEntity(event.target.value);
  };

  useEffect(() => {
    console.log(Entity);
    getData(props.alldata, Entity);
  }, [Entity]);

  //console.log(Entity);

  const getData = (rows, entity) => {
    console.log(entity);
    let entityIssue = [];
    if (entity == "all") {
      entityIssue = rows
        .filter(function (row) {
          return row.owner != "USFedBank";
        })
        .map(function (row) {
          return row;
        });
      setEntityData(entityIssue);
    } else {
      entityIssue = rows
        .filter(function (row) {
          return row.owner == entity;
        })
        .map(function (row) {
          return row;
        });
      setEntityData(entityIssue);
    }
    console.log(entityIssue);
    let total = 0;
    for (let i = 0; i < entityIssue.length; i++) {
      let temp = parseInt(entityIssue[i].value);
      total += temp;
      setTotalTranfer(total);
    }
  };

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

  // const rows = [
  //     {id: 1, value: 2000, denomination: 100, amount: 20, timestamp: '28/11/2022', currency: 'USD', issuedtoentity: 'Bank 1', issuedbyentity: 'US Federal Bank', owner: 'Bank 1'},
  //     {id: 2, value: 2000, denomination: 100, amount: 20, timestamp: '28/11/2022' ,currency: 'USD', issuedtoentity: 'NBFC 1', issuedbyentity: 'US Federal Bank', owner: 'NBFC 1'},
  //     {id: 3, value: 2000, denomination: 100, amount: 20, timestamp: '28/11/2022' ,currency: 'USD', issuedtoentity: 'NBFC 1', issuedbyentity: 'Bank 2', owner: 'NBFC 1'},
  // ];

  return (
    <>
      <div className="view">
        Entity:
        <Select
          sx={{ width: 150 }}
          variant="standard"
          label="Entity"
          value={Entity}
          onChange={entityHandler}
          autoWidth
        >
          <MenuItem value={"all"}> All </MenuItem>
          <MenuItem value={"Bank1"}> Bank 1 </MenuItem>
          <MenuItem value={"Bank2"}> Bank 2 </MenuItem>
          <MenuItem value={"NBFC1"}> NBFC 1 </MenuItem>
        </Select>
      </div>

      <div className="view">
        <h5>
          Total Issued Value to Entity :{" "}
          <Chip
            sx={{ width: 160, bgcolor: "#013DF0", color: "#FFFFFF" }}
            label={TotalTransfer}
          />{" "}
          $
        </h5>
      </div>

      <div className="table">
        <DataGrid
          getRowId={(row) => row.cbdcid}
          rows={entityData}
          columns={cols}
          rowsPerPageOptions={[2]}
          autoHeight
        />
      </div>
    </>
  );
}
