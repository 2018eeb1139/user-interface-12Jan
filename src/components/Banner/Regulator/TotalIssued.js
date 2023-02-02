import React from "react";
import { useState } from "react";
import { Chip, Box } from "@mui/material";

export function TotalIssued(props){
    return(
        <h4>Total Issued Value : <Chip sx={{width:160, bgcolor: '#013DF0', color: '#FFFFFF'}} label ={props.issueValue} /> $</h4>
    )
}