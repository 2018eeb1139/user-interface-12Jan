import React from "react";
import { Grid, Card, Box } from "@mui/material";
import MintedCard from "./MintedCard";
import IssueingCard from "./IssueingCard";
import PendingIssue from "./PendingIssue";
import Denominations from "./Denominations";
import TrafficByEntities from "./TrafficByEntities";

const Cards = (props) => {
  return (
    <>
      <Grid
        container
        spacing={6}
        sx={{ marginLeft: "-39px", paddingBottom: "10px" }}
      >
        <Grid item>
          <MintedCard value={props.mintedTotal} count={props.mNumber} />
        </Grid>
        <Grid item>
          <Denominations
            token100={props.token100}
            token500={props.token500}
            pc100={props.pc100}
            pc500={props.pc500}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} sx={{ marginLeft: "-39px" }}>
        <Grid item>
          <IssueingCard value={props.issuedTotal} count={props.iNumber} />
        </Grid>
        <Grid item>
          <PendingIssue percent={props.pc} />
        </Grid>
      </Grid>
    </>
  );
};

export default Cards;
