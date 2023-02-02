import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
export function IssuedDCTable(props){

    const cols = [
        {field: 'cbdcid', headerName: 'CBDC ID', width: 85},
        {field: 'uid', headerName: 'Unique ID', width: 100},
        {field: 'value', headerName: 'Denomination', width: 150},
        {field: 'currency', headerName: 'Currency', width: 100},
        {field: 'owner', headerName: 'Owner', width: 150},
        {field: 'timestamp', headerName: 'Date of Transaction', width: 150},
        {field: 'issuedbyentity', headerName: 'Issued By', width: 150},
        {field: 'issuedtoentity', headerName: 'Issued To', width: 150},
        {field: 'validuntil', headerName: 'Valid Until', width: 100},
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