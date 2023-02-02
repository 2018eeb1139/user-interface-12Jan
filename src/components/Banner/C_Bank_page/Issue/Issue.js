import { Box, Tab, Tabs} from '@mui/material'
import { useState } from 'react'
import React from 'react';
import './issueTab.css'
import {ViewIssued} from './ViewTransfer/ViewTransfer'
import {IssueDC} from './Transfer/IssueDC'
 
export function Issue(props){
    const [tabIndex, setTab] = useState(0);
    

    const tabChangeHandler = (event, newTabIndex) => {
        setTab(newTabIndex);
    };

    console.log(props.viewData);
    return(
        <div style={{ width: "97%" }}>
                <Tabs value={tabIndex} onChange={tabChangeHandler}>
                    <Tab label = {<span style={{color: '#013DF0'}}>Transfer</span>}  />
                    {(!props.mintValue) ? <Tab label = {<span style={{color: '#013DF0'}}>View</span>} disabled/> : <Tab label = {<span style={{color: '#013DF0'}}>View</span>}/>}
                </Tabs>

                { tabIndex === 0 && (
                    // <Box sx={{height:250}}>
                        <IssueDC data={props.viewData}/>
                    //</Box>
                )}
                {tabIndex === 1 && (
                    // <Box sx={{height:400}}>
                        <ViewIssued tableData={props.viewData} />
                    // </Box>
                )
                }
        </div>
    );
}
