import React from "react";
import { Box, Grid } from "@mui/material";
import Cards from "./Cards/Cards";
import "./dashboard.css";
import LatestTrends from "./Cards/LatestTrends";
import TrafficByEntities from "./Cards/TrafficByEntities";
import { useState } from "react";

const Dashboard = (props) => {
  const [issuedTotal, setIssuedTotal] = useState();

  const filterIssued = (cbdc) => {
    return (
      cbdc.issuedbyentity === "USFedBank" && cbdc.issuedtoentity !== "USFedBank"
    );
  };

  const filterCentralBank = (cbdc) => {
    return cbdc.owner === "USFedBank";
  };

  const filterDeno100 = (cbdc) => {
    return cbdc.value === "100";
  };

  const filterDeno500 = (cbdc) => {
    return cbdc.value === "500";
  };

  const filterBank1 = (cbdc) => {
    return cbdc.owner === "Bank1";
  };
  const filterBank2 = (cbdc) => {
    return cbdc.owner === "Bank2";
  };
  const filterNBFC1 = (cbdc) => {
    return cbdc.owner === "NBFC1";
  };

  const allData = props.data;
  const mintedTokens = allData.length;

  const token100 = allData.filter(filterDeno100);
  const token500 = allData.filter(filterDeno500);
  const pc100 = Math.round((token100.length / mintedTokens) * 100);
  const pc500 = Math.round((token500.length / mintedTokens) * 100);

  const issuedTokensDetail = allData.filter(filterIssued);
  const issuedTokens = issuedTokensDetail.length;

  let totalIssuedValue = 0;
  for (let i = 0; i < issuedTokens; i++) {
    totalIssuedValue += parseInt(issuedTokensDetail[i].value);
  }

  const pcIssued = Math.round((issuedTokens / mintedTokens) * 100);
  console.log(issuedTokensDetail);

  const issuedBank1 = issuedTokensDetail.filter(filterBank1);
  const issuedBank2 = issuedTokensDetail.filter(filterBank2);
  const issuedNBFC1 = issuedTokensDetail.filter(filterNBFC1);
  const holdCentralBank = allData.filter(filterCentralBank);

  return (
    <div className="tiles">
      <Cards
        mintedTotal={props.total}
        mNumber={mintedTokens}
        iNumber={issuedTokens}
        issuedTotal={totalIssuedValue}
        pc={pcIssued}
        token100={token100.length}
        token500={token500.length}
        pc100={pc100}
        pc500={pc500}
      />
      <Grid container spacing={2} sx={{ display: "flex" }}>
        <LatestTrends />
        <TrafficByEntities
          issuedCentralBank={Math.round(
            (holdCentralBank.length / mintedTokens) * 100
          )}
          issuedBank1={Math.round((issuedBank1.length / mintedTokens) * 100)}
          issuedBank2={Math.round((issuedBank2.length / mintedTokens) * 100)}
          issuedNBFC1={Math.round((issuedNBFC1.length / mintedTokens) * 100)}
        />
      </Grid>
    </div>
  );
};

export default Dashboard;
