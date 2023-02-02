import React from "react";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { Grid, Card, Box, Typography, CardContent } from "@mui/material";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const MintedCard = (props) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        minWidth: 550,
        minHeight: 200,
        ":hover": { boxShadow: 20 },
        borderRadius: 2,
      }}
    >
      <CardHeader
        title="TOTAL DIGITAL CURRENCY"
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
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <AccountBalanceWalletOutlinedIcon />
          </Avatar>
        }
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Grid
          container
          direction="column"
          spacing={1}
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
            <Typography color="green" variant="h4" sx={{ fontWeight: "600" }}>
              $ {props.value}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              color="darkslategray"
              variant="h6"
              sx={{ fontSize: "18px", fontWeight: "700" }}
            >
              Tokens Minted
            </Typography>
            <Typography color="green" variant="h5" sx={{ fontWeight: "600" }}>
              {props.count}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MintedCard;
