import React from "react";
import "./reg.css";
import { Autocomplete, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import getDatabyid from "../../../services/getbyid.service.js";

const TrackCBDC = (props) => {
  const [show, setShow] = useState(0);
  const [tableData, setTableData] = useState([]);
  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData.username);
  let requester = userData.username;

  let getIds = [];
  let records = [];
  let tablerow = [];

  const inputID = (event, values) => {
    getIds = [];
    console.log(values);
    if (values) {
      for (let i = 0; i < values.length; i++) {
        getIds.push(values[i].cbdcid);
      }
      console.log(getIds);
      //setIds(getIds);
    }
    console.log(getIds);
  };

  const fetchData = async () => {
    //let records = [];
    setShow(1);
    for (let i = 0; i < getIds.length; i++) {
      let body = await getDatabyid
        .getbyid("mint", "regulator", requester, getIds[i])
        .then((response) => {
          response = response.data.message.substring(78);
          let cbdcArray = response.split(/\t/g);
          for (let i = 0; i < cbdcArray.length; i++) {
            let temp = eval(cbdcArray[i]);
            cbdcArray[i] = temp;
          }
          response = cbdcArray[0];
          console.log(response);
          records.push(response);
          //console.log(response);
          //setTableData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShow(2);
    console.log(records);
    for (let i = 0; i < records.length; i++) {
      for (let j = 0; j < records[i].length; j++) {
        tablerow.push(records[i][j]);
      }
    }

    for (let i = 0; i < tablerow.length; i++) {
      let temp = tablerow[i].timestamp;
      let convertDate = new Date(temp);
      tablerow[i].timestamp = convertDate.toISOString();
    }

    console.log(tablerow);
    setTableData(tablerow);
  };

  // const createRows = (r) => {
  //     for(let i=0; i<r.length; i++){
  //         for(let j=0; j<r[i].length; j++){
  //             row.push(records[i][j]);
  //         }
  //     }
  // }

  // const getData = () => {
  //     let apiData = fetchData();
  //     createRows(apiData);
  //     console.log(apiData);
  // }

  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const cols = [
    { field: "cbdcid", headerName: "CBDC ID", width: 85 },
    { field: "uid", headerName: "Unique ID", width: 200 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "issuedbyentity", headerName: "Issued By", width: 150 },
    { field: "issuedtoentity", headerName: "Issued To", width: 150 },
    { field: "timestamp", headerName: "Date of Transaction", width: 200 },
    { field: "validuntil", headerName: "Valid Until", width: 200 },
    { field: "value", headerName: "Denomination", width: 150 },
  ];

  return (
    <div>
      <div className="track">
        <Autocomplete
          multiple
          id="tags-standard"
          options={props.data}
          getOptionLabel={(option) => option.cbdcid}
          onChange={inputID}
          renderInput={(params) => (
            <TextField
              sx={{ width: 300 }}
              {...params}
              // variant="filled"
              label="CBDC ID(s)"
              placeholder="CBDC ID(s)"
            />
          )}
        />
        <br />
        <br />
        <Button
          style={{ backgroundColor: "green", color: "#FFFFFF" }}
          onClick={fetchData}
        >
          GET
        </Button>
        {show == 1 && (
          <div
            className="d-flex justify-content-center text-success"
            style={{ margin: "100px" }}
          >
            <span className="spinner-border "></span>
          </div>
        )}
        {show == 2 && (
          <DataGrid
            className="trackcbdc__datagrid"
            getRowId={(row) => generateRandom()}
            rows={tableData}
            columns={cols}
            rowsPerPageOptions={[2]}
            autoHeight
          />
        )}
      </div>
    </div>
  );
};

export default TrackCBDC;
