import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import TokenOutlinedIcon from "@mui/icons-material/TokenOutlined";

const IssueingCard = (props) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        minWidth: 550,
        minHeight: 175,
        ":hover": { boxShadow: 20 },
        borderRadius: 2,
      }}
    >
      <CardHeader
        title="TOTAL DISTRIBUTED CURRENCY"
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
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <TokenOutlinedIcon fontSize="large" />
          </Avatar>
        }
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Grid
          container
          spacing={1}
          sx={{ justifyContent: "space-between" }}
          direction="column"
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              color="error.main"
              variant="h4"
              sx={{ fontWeight: "600" }}
            >
              0
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              color="darkslategray"
              variant="h6"
              sx={{ fontSize: "18px", fontWeight: "700" }}
            >
              Tokens Distributed
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
              sx={{ fontWeight: "600" }}
            >
              0
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IssueingCard;
