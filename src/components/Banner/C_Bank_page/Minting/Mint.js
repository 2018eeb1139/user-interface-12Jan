import { Box, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import "./mint.css";
import { Generate } from "./Generate/Generate";
import { ViewMinted } from "./View_minted/ViewMinted";

import AuthService from "../../../../services/auth.service";
import getall from "../../../../services/getallcb.service";
import ViewMinted2 from "./View_minted/ViewMinted2";

export function Mint(props) {
  const [tabIndex, setTab] = useState(0);

  const tabChangeHandler = (event, newTabIndex) => {
    setTab(newTabIndex);
  };

  const currentUser = AuthService.getCurrentUser();
  const organization = currentUser.organization;
  // console.log(organization)
  let className = "";
  if (organization === "central bank") {
    className = "centralbank";
  } else if (organization === "bank 1") {
    className = "bank1";
  } else if (organization === "bank 2") {
    className = "bank2";
  } else if (organization === "nfbc 1") {
    className = "nfbc1";
  } else if (organization === "regulator") {
    className = "regulator";
  }

  // const [tableData, setTableData] = useState();
  // let userData = JSON.parse(localStorage.getItem("user"));
  // //console.log(userData.username);
  // let requester = userData.username;

  // //const [finalData, setFinalData] = useState();

  // useEffect(() => {
  //   getall
  //     .getallCB("mint", "centralbank", requester)
  //     .then((response) => {
  //       response = response.data.message.substring(69);
  //       let cbdcArray = response.split(/\t/g);
  //       for (let i = 0; i < cbdcArray.length; i++) {
  //         let temp = eval(cbdcArray[i]);
  //         cbdcArray[i] = temp;
  //       }
  //       response = cbdcArray[0];
  //       //console.log(response);
  //       setTableData(response);
  //       //console.log(typeof response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // let totalValue = 0;
  // if (tableData) {
  //   for (let i = 0; i < tableData.length; i++) {
  //     totalValue += parseInt(tableData[i].value);
  //   }
  // } else {
  //   console.log("Calculating...");
  // }
  // console.log(tableData);

  // if (tableData) {
  //   for (let i = 0; i < tableData.length; i++) {
  //     let temp = tableData[i].timestamp;
  //     let convertDate = new Date(temp);
  //     tableData[i].timestamp = convertDate.toISOString();
  //   }
  // }

  console.log(props.mintValue);

  return (
    <div style={{ width: "97%" }}>
      <Tabs value={tabIndex} onChange={tabChangeHandler}>
        <Tab label="Generate" />
        {/* {!totalValue ? <Tab label="View" disabled /> : } */}
        <Tab label="View" />
      </Tabs>

      {tabIndex === 0 && (
        <div className="mintMenu">
          <Generate />
        </div>
      )}
      {/* {tabIndex === 1 && <ViewMinted data={props.data} />} */}
      {tabIndex === 1 && <ViewMinted2 data={props.data} />}
    </div>
  );
}
