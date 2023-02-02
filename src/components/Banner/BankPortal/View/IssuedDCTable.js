import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
export function IssuedDCTable(props){

    const cols = [
        {field: 'cbdcid', headerName: 'CBDC ID', width: 85},
        {field: 'uid', headerName: 'Unique ID', width: 200},
        {field: 'value', headerName: 'Denomination', width: 110},
        {field: 'currency', headerName: 'Currency', width: 80},
        {field: 'owner', headerName: 'Owner', width: 100},
        {field: 'timestamp', headerName: 'Date of Transaction', width: 200},
        {field: 'issuedbyentity', headerName: 'Issued By', width: 100},
        {field: 'issuedtoentity', headerName: 'Issued To', width: 100},
        {field: 'validuntil', headerName: 'Valid Until', width: 250},
    ];

    console.log(props.table);

    const [loading, setLoading] = useState(true);
    if (!props.table) {
        return <div>{loading && <span className="spinner-border spinner-border-sm"></span>}</div>;
    } 
    else {
        return (
        <div className="table">
            <DataGrid
            getRowId={(row) => row.cbdcid}
            rows={props.table}
            columns={cols}
            rowsPerPageOptions={[2]}
            autoHeight
            />
        </div>
        )
    }
}