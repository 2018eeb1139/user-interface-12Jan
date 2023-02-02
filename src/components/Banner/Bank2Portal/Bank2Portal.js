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
import Dashboard from "./Bank2Dashboard/Dashboard";

const Bank2Portal = () => {
  const [tabIndex, setTab] = useState(0);
  const [issuedValue, updateIssuedValue] = useState(0);
  const [distValue, updateDistValue] = useState(0);
  const [tableData, setTableData] = useState();

  let userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData.username);
  let requester = userData.username;

  useEffect(() => {
    getall
      .getallCB("mint", "bank2", requester)
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
        <div className="bank2__menu">
          <Tabs
            className="bank2__sidebar"
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
          </Tabs>
          <div className="bank2__mainbar">
            {tabIndex === 0 && (
              <div>
                <Dashboard alldata={tableData} />
              </div>
            )}
            {tabIndex === 1 && (
              <ViewMenu data={tableData} getTotalIssue={updateIssue} />
            )}
            {tabIndex === 2 && <DistributeDC />}
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
export default Bank2Portal;
