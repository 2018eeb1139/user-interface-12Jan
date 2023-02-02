import React from "react";
import { useState } from "react";
import { Chip, Box } from "@mui/material";

export function TotalDist(props){
    return(
        <h4>Digital Currency Distributed : <Chip sx={{width:160, bgcolor: '#013DF0', color: '#FFFFFF'}} label ={props.valueDist} /> $</h4>
    )
}