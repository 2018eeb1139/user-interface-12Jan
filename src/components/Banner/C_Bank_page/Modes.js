import { Box, Tab, Tabs, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import { Mint } from "./Minting/Mint";
import { Issue } from "./Issue/Issue";
import Dashboard from "./Dashboard/Dashboard";
import "./mainMenu.css";
import Banner from "../Banner";
import { TotalMinted } from "./TotalMinted.js";
import getall from "../../../services/getallcb.service";
import Footer from "../../Footer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

const Modes = () => {
  const [tabIndex, setTab] = useState(0);
  const [mintedValue, updateMintedValue] = useState(10);
  //const [mintedData, setMintedData] = useState([]);
  const [tableData, setTableData] = useState();
  let userData = JSON.parse(localStorage.getItem("user"));
  //console.log(userData.username);
  let requester = userData.username;

  //const [finalData, setFinalData] = useState();

  useEffect(() => {
    getall
      .getallCB("mint", "centralbank", requester)
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
    //updateMintedValue(totalValue);
    for (let i = 0; i < tableData.length; i++) {
      let temp = tableData[i].timestamp;
      let convertDate = new Date(temp);
      tableData[i].timestamp = convertDate.toISOString();
    }
  } else {
    console.log("Calculating...");
  }
  console.log(tableData);
  console.log(totalValue);

  // const updateTotal = (newValue) => {
  //   updateMintedValue(newValue);
  // };

  // const tableData = (data) => {
  //   setMintedData(data);
  // };

  // console.log(mintedData);

  const tabChangeHandler = (event, newTabIndex) => {
    setTab(newTabIndex);
  };

  if (tableData) {
    return (
      <div>
        <Banner />
        <div className="mainMenu">
          <Tabs
            className="sidebar__tab"
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
                    marginRight: "87px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="dashboard__icon"
                >
                  <DashboardIcon />
                  Dashboard
                </span>
              }
            />

            <Tab
              label={
                <span
                  style={{
                    color: "white",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="currencyExchange__icon"
                >
                  <PaidOutlinedIcon />
                  Mint Digital Currency
                </span>
              }
            />
            {!mintedValue ? (
              <Tab
                label={
                  <span style={{ color: "white" }}>Issue Digital Currency</span>
                }
                disabled
              />
            ) : (
              <Tab
                label={
                  <span
                    style={{
                      color: "white",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="paidOutline__icon"
                  >
                    <CurrencyExchangeIcon />
                    Issue Digital Currency
                  </span>
                }
              />
            )}
          </Tabs>

          {/* <h4
            style={{
              textAlign: "center",
            }}
          >
            <TotalMinted mintValue={mintedValue} />
          </h4> */}

          <div className="menus">
            {tabIndex === 0 && (
              <Dashboard data={tableData} total={totalValue} />
            )}
            {tabIndex === 1 && <Mint mintValue={totalValue} data={tableData} />}
            {tabIndex === 2 && (
              <Issue mintValue={totalValue} viewData={tableData} />
            )}
          </div>
        </div>
        <Footer />
      </div>
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
};

export default Modes;
