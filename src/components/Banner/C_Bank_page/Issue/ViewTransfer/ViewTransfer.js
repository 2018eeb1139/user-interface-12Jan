import React, { useEffect } from 'react';
import '../issueTab.css';
import { useState} from 'react';
import { Box, Chip, Select, MenuItem, TextField, Button, Modal} from '@mui/material'
import {EntityData} from './EntityData'

export function ViewIssued(props){

    const [TotalTransfer, setTotalTranfer] = useState(0);
    const [Entity, setEntity] = useState("");
    const [entityData, setEntityData] = useState([]);
    
    //console.log(props.tableData);

    const entityHandler = (event) => {
        setEntity(event.target.value); 
    }

    useEffect(() => {
        console.log(Entity);
        getData(props.tableData, Entity);},[Entity]
    );
    
    //console.log(Entity);

    const getData = (rows, entity) => {
        console.log(entity);
        let entityIssue = (rows).filter(function (row) {
            return row.owner == entity;
        }).map(function (row) {
            return row;
        })
        setEntityData(entityIssue);
        console.log(entityIssue);
        let total = 0;
        for (let i=0; i<entityIssue.length; i++){
            let temp = parseInt(entityIssue[i].value);
            total += temp;
        }
        setTotalTranfer(total);
    }

    return(
        <div className = 'IssueTable'>
             <div className="EntityDetail">
                <div className="entityInput">Entity :  
                    <Select sx={{width: 150}}variant="standard" label="Entity" value={Entity} onChange={entityHandler} autoWidth>
                        <MenuItem value={"Bank1"}> Bank 1 </MenuItem>
                        <MenuItem value={"Bank2"}> Bank 2 </MenuItem>
                        <MenuItem value={"NBFC1"}> NBFC 1 </MenuItem>
                    </Select>
                </div> 
                <div className='totalTransfer'>
                    <h5>Total Issued Value to Entity : <Chip sx={{width:100, bgcolor: '#357339', color: '#FFFFFF'}} label ={TotalTransfer} /> $</h5>
                </div>
            </div>

            {(!Entity) ? <div> Select Entity to display records</div> : <EntityData entityName= {Entity} data=
            {entityData}/>}

        </div>
    )
}