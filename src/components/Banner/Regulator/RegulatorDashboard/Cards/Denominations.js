import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";

const Denominations = ({ token100, token500, pc100, pc500 }) => {
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
        title="MINTED TOKENS"
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
              backgroundColor: "#379237",
              height: 56,
              width: 56,
            }}
          >
            <LocalAtmOutlinedIcon />
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
          <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography
                color="darkslategray"
                variant="h6"
                sx={{ fontSize: "18px", fontWeight: "500" }}
              >
                $100 Tokens
              </Typography>
              <Typography
                color="warning.main"
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                {token100} ({pc100}% of Total Minted)
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <Typography
              color="darkslategray"
              variant="h6"
              sx={{ fontSize: "18px", fontWeight: "500" }}
            >
              $500 Tokens
            </Typography>
            <Typography
              color="warning.main"
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "16px" }}
            >
              {token500} ({pc500}% of Total Minted)
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Denominations;
