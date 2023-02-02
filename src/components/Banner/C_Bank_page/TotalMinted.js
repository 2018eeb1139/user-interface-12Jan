import React from "react";
import { useState } from "react";
import { Chip, Box } from "@mui/material";

export function TotalMinted(props) {
  if (!props.mintValue) {
    return (
      <h4>
        Total Minted Value :{" "}
        <Chip
          sx={{ width: 160, bgcolor: "#013DF0", color: "#FFFFFF" }}
          label={<span className="spinner-border spinner-border-sm"></span>}
        />{" "}
        $
      </h4>
    );
  } else {
    return (
      <h4>
        Total Minted Value :{" "}
        <Chip
          sx={{ width: 160, bgcolor: "#013DF0", color: "#FFFFFF" }}
          label={props.mintValue}
        />{" "}
        $
      </h4>
    );
  }
}
