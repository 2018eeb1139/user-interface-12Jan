import React from "react";
import { Box, Grid } from "@mui/material";
import Cards from "./Cards/Cards";
import "./dashboard.css";
import LatestTrends from "./Cards/LatestTrends";
import TrafficByEntities from "./Cards/TrafficByEntities";
import { useState } from "react";

const Dashboard = ({ alldata }) => {
  const filterBank2 = (cbdc) => {
    return cbdc.issuedtoentity === "Bank2";
  };

  const filterDeno100 = (cbdc) => {
    return cbdc.value === "100";
  };

  const filterDeno500 = (cbdc) => {
    return cbdc.value === "500";
  };

  const issuedBank2 = alldata.filter(filterBank2);

  let totalIssuedBank2 = 0;
  for (let i = 0; i < issuedBank2.length; i++) {
    totalIssuedBank2 += parseInt(issuedBank2[i].value);
  }

  const token100 = issuedBank2.filter(filterDeno100);
  const token500 = issuedBank2.filter(filterDeno500);
  const pc100 = Math.round((token100.length / issuedBank2.length) * 100);
  const pc500 = Math.round((token500.length / issuedBank2.length) * 100);
  return (
    <div className="tiles">
      <Cards
        totalValue={totalIssuedBank2}
        count={issuedBank2.length}
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
