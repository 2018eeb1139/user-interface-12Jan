import React from "react";
import { Grid, Card, Box } from "@mui/material";
import MintedCard from "./MintedCard";
import IssueingCard from "./IssueingCard";
import PendingIssue from "./PendingIssue";
import Denominations from "./Denominations";
import TrafficByEntities from "./TrafficByEntities";

const Cards = ({ totalValue, count, token100, token500, pc100, pc500 }) => {
  return (
    <>
      <Grid
        container
        spacing={6}
        sx={{ marginLeft: "-39px", paddingBottom: "10px" }}
      >
        <Grid item>
          <MintedCard value={totalValue} count={count} />
        </Grid>
        <Grid item>
          <Denominations
            token100={token100}
            token500={token500}
            pc100={pc100}
            pc500={pc500}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} sx={{ marginLeft: "-39px" }}>
        <Grid item>
          <IssueingCard />
        </Grid>
        {/* <Grid item>
          <PendingIssue percent={props.pc} />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Cards;
