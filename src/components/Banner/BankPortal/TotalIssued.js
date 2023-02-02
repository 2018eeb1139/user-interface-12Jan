import React from "react";
import { useState } from "react";
import { Chip, Box } from "@mui/material";

export function TotalIssued(props){
    if(!props.valueIssued){
        return (
            <h4>
              Digital Currency Balance :{" "}
              <Chip
                sx={{ width: 160, bgcolor: "#013DF0", color: "#FFFFFF" }}
                label={<span className="spinner-border spinner-border-sm"></span>}
              />{" "}
              $
            </h4>
          );
    }
    else{
        return(
            <h4>Digital Currency Balance : <Chip sx={{width:160, bgcolor: '#013DF0', color: '#FFFFFF'}} label ={props.valueIssued} /> $</h4>
        )
    }
}