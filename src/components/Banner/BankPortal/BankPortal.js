import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { TotalIssued } from "./TotalIssued";
import "./bankPortal.css";
import { TotalDist } from "./TotalDist";
import ViewMenu from "./View/ViewMenu";
import DistributeDC from "./DistributeDC";
import Banner from "../Banner";
import getall from "../../../services/getallcb.service";
import Footer from "../../Footer";
import Dashboard from "./Bank1Dashboard/Dashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProgrammableMoneyTransfer from "./ProgrammableMoneyTransfer";

const BankPortal = () => {
  const [tabIndex, setTab] = useState(0);
  const [issuedValue, updateIssuedValue] = useState(0);
  const [distValue, updateDistValue] = useState(0);
  const [tableData, setTableData] = useState();

  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData.username);
  let requester = userData.username;

  useEffect(() => {
    getall
      .getallCB("mint", "bank1", requester)
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

  if (tableData) {
    for (let i = 0; i < tableData.length; i++) {
      let temp = tableData[i].timestamp;
      let convertDate = new Date(temp);
      tableData[i].timestamp = convertDate.toISOString();
    }
  }
  //updateMintedValue(totalValue);
  console.log(tableData);

  const tabChangeHandler = (event, newTabIndex) => {
    setTab(newTabIndex);
  };

  const updateIssue = (value) => {
    updateIssuedValue(value);
  };

  if (tableData) {
    return (
      <>
        <Banner />
        {/* <div className='totals'>
                <TotalIssued valueIssued = {issuedValue} />
                <TotalDist valueDist = {distValue} />
            </div> */}
        <div className="bank1__menu">
          <Tabs
            className="bank1__sidebar"
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
                  className="dashboard__icon"
                >
                  {/* <DashboardIcon /> */}
                  Dashboard
                </span>
              }
            />
            <Tab
              label={
                <span style={{ color: "white", fontWeight: "500" }}>
                  <b>Records</b>
                </span>
              }
            />
            {issuedValue <= 0 ? (
              <Tab label="Distribute Digital Currency" disabled />
            ) : (
              <Tab
                label={
                  <span style={{ color: "white", fontWeight: "500" }}>
                    <b>Distribute Digital Currency</b>
                  </span>
                }
              />
            )}
            <Tab
              label={
                <span style={{ color: "white", fontWeight: "500" }}>
                  <b>Programmable Money</b>
                </span>
              }
            />
          </Tabs>

          <div className="bank1__mainbar">
            {tabIndex === 0 && (
              <div>
                <Dashboard alldata={tableData} />
              </div>
            )}
            {tabIndex === 1 && (
              <ViewMenu data={tableData} getTotalIssue={updateIssue} />
            )}
            {tabIndex === 2 && <DistributeDC />}
            {tabIndex === 3 && <ProgrammableMoneyTransfer />}
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
};
export default BankPortal;
