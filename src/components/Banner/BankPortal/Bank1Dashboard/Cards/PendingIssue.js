import React from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  CardContent,
  LinearProgress,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";

const PendingIssue = (props) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        minWidth: 550,
        minHeight: 196,
        ":hover": { boxShadow: 20 },
        borderRadius: 2,
      }}
    >
      <CardHeader
        title="AVAILABLE CENTRAL BANK LIQUIDITY"
        disableTypography="true"
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          fontStyle: "italic",
          color: "darkslategray",
          paddingBottom: 0,
          paddingTop: "12px",
        }}
        action={
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        }
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Grid
          container
          direction="column"
          spacing={4}
          sx={{ justifyContent: "space-between" }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography color="primary" variant="h4" sx={{ fontWeight: "600" }}>
              {100 - props.percent}%
            </Typography>
          </Grid>
          <Grid item>
            <LinearProgress value={100 - props.percent} variant="determinate" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PendingIssue;
