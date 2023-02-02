import React from "react";
import "./reg.css";
import { Box, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import { TotalMinted } from "../C_Bank_page/TotalMinted";
import { TotalIssued } from "./TotalIssued";
import { MintedTable } from "./MintedTable";
import { IssuedTable } from "./IssuedTable";
import TrackCBDC from "./TrackCBDC";
import Banner from "../Banner";
import getall from "../../../services/getallcb.service";
import Footer from "../../Footer";
import Dashboard from "./RegulatorDashboard/Dashboard";

export function RegHome() {
  const [tabIndex, setTab] = useState(0);
  const [mintedValue, updateMintedValue] = useState(0);
  const [issuedValue, updateIssuedValue] = useState(0);
  const [tableData, setTableData] = useState();

  const tabChangeHandler = (event, newTabIndex) => {
    setTab(newTabIndex);
  };

  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData.username);
  let requester = userData.username;

  //const [finalData, setFinalData] = useState();

  useEffect(() => {
    getall
      .getallCB("mint", "regulator", requester)
      .then((response) => {
        response = response.data.message.substring(69);
        let cbdcArray = response.split(/\t/g);
        for (let i = 0; i < cbdcArray.length; i++) {
          let temp = eval(cbdcArray[i]);
          cbdcArray[i] = temp;
        }
        response = cbdcArray[0];
        //console.log(response);
        setTableData(response);
        //console.log(typeof response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let totalValue = 0;
  if (tableData) {
    for (let i = 0; i < tableData.length; i++) {
      totalValue += parseInt(tableData[i].value);
    }
    for (let i = 0; i < tableData.length; i++) {
      let temp = tableData[i].timestamp;
      let convertDate = new Date(temp);
      tableData[i].timestamp = convertDate.toISOString();
    }
  } else {
    console.log("Calculating...");
  }
  //updateMintedValue(totalValue);
  console.log(tableData);
  let finalValue = 0;
  if (totalValue) {
    finalValue = totalValue;
  }

  if (tableData) {
    return (
      <>
        <Banner />
        {/* <div className='totals'>
                    <TotalMinted mintValue = {totalValue} />  
                    <TotalIssued issueValue = {issuedValue} />
            </div>  */}

        <div className="reg__menu">
          <Tabs
            className="reg__sidebar"
            value={tabIndex}
            onChange={tabChangeHandler}
            orientation="vertical"
          >
            <Tab
              label={
                <span
                  style={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "right",
                  }}
                >
                  Dashboard
                </span>
              }
            />
            <Tab
              label={
                <span style={{ color: "white", fontWeight: "500" }}>
                  <b>Audit Minted Currency</b>
                </span>
              }
            />
            {!totalValue ? (
              <Tab label="Audit Issued Currency" disabled />
            ) : (
              <Tab
                label={
                  <span style={{ color: "white", fontWeight: "500" }}>
                    <b>Audit Issued Currency</b>
                  </span>
                }
              />
            )}
            {!totalValue ? (
              <Tab label="Audit Transactions" disabled />
            ) : (
              <Tab
                label={
                  <span style={{ color: "white", fontWeight: "500" }}>
                    <b>Audit Transactions</b>
                  </span>
                }
              />
            )}
          </Tabs>
          <div className="reg__mainbar">
            {tabIndex === 0 && (
              <Dashboard data={tableData} total={totalValue} />
            )}
            {tabIndex === 1 && <MintedTable data={tableData} />}
            {tabIndex === 2 && <IssuedTable alldata={tableData} />}
            {tabIndex === 3 && <TrackCBDC data={tableData} />}
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ margin: "150px" }}
      >
        <span style={{ marginRight: "20px", fontSize: "21px", color: "blue" }}>
          Please Wait...
        </span>{" "}
        {<span className="spinner-border "></span>}
      </div>
    );
  }
}
