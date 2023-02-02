import React from "react";
import '../bankPortal.css'
import {Box, Tab, Tabs} from '@mui/material'
import { IssuedDCTable } from "./IssuedDCTable";
import { useState, useEffect } from "react";
import { DistRecord } from "./DistRecord";


const ViewMenu = (props) => {

    const [tabIndex, setTab] = useState(0);
    const [filteredData, setFilteredData] = useState();

    const tabChangeHandler = (event, newTabIndex) => {
        setTab(newTabIndex);
    };
    let entityIssue = [];
    let total = 0;
    const getData = (rows, entity) => {
        console.log(entity);
        entityIssue = (rows).filter(function (row) {
            return row.owner == entity;
        }).map(function (row) {
            return row;
        })
        //setFilteredData(entityIssue);
        console.log(entityIssue);
        
        for (let i=0; i<entityIssue.length; i++){
            let temp = parseInt(entityIssue[i].value);
            total += temp;
        }
        //updateIssuedValue(total);
    }

    const updateIssue = (value) => {
        props.getTotalIssue(value);
    };

    if(!props.data){
        console.log("Waiting...")
    }
    else{
        getData(props.data, "NBFC1");
        updateIssue(total);
    }

    return(
    <div className='BankMenu'>
            <Box>
                <Box>
                    <Tabs value={tabIndex} onChange={tabChangeHandler}>
                        <Tab label = {<span style={{color: '#013DF0'}}><b>View Received</b></span>} />
                        <Tab label = {<span style={{color: '#013DF0'}}><b>View Distributed</b></span>} />    
                    </Tabs>
                </Box>
                <Box>
                    { tabIndex === 0 && (
                        <div>   
                            <div className='TableMenu'>
                                <IssuedDCTable table={entityIssue}/>
                            </div>
                        </div>
                    )}
                    {tabIndex === 1 && (
                        <div className='TableMenu'>
                            <DistRecord />
                        </div>
                    )}
            </Box>
            </Box>
            </div>
    )
}

export default ViewMenu