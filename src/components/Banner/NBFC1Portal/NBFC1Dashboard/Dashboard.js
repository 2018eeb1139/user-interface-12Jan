import React from "react";
import { Box, Grid } from "@mui/material";
import Cards from "./Cards/Cards";
import "./dashboard.css";
import LatestTrends from "./Cards/LatestTrends";
import TrafficByEntities from "./Cards/TrafficByEntities";
import { useState } from "react";

const Dashboard = ({ alldata }) => {
  const filterNBFC1 = (cbdc) => {
    return cbdc.issuedtoentity === "NBFC1";
  };

  const filterDeno100 = (cbdc) => {
    return cbdc.value === "100";
  };

  const filterDeno500 = (cbdc) => {
    return cbdc.value === "500";
  };

  const issuedNBFC1 = alldata.filter(filterNBFC1);

  let totalIssuedNBFC1 = 0;
  for (let i = 0; i < issuedNBFC1.length; i++) {
    totalIssuedNBFC1 += parseInt(issuedNBFC1[i].value);
  }

  const token100 = issuedNBFC1.filter(filterDeno100);
  const token500 = issuedNBFC1.filter(filterDeno500);
  const pc100 = Math.round((token100.length / issuedNBFC1.length) * 100);
  const pc500 = Math.round((token500.length / issuedNBFC1.length) * 100);
  return (
    <div className="tiles">
      <Cards
        totalValue={totalIssuedNBFC1}
        count={issuedNBFC1.length}
        token100={token100.length}
        token500={token500.length}
        pc100={pc100}
        pc500={pc500}
      />

      <LatestTrends />
    </div>
  );
};

export default Dashboard;
