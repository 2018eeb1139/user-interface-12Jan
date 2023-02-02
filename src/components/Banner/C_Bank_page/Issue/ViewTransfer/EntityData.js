import React from "react";
import { DataGrid } from '@mui/x-data-grid';

export function EntityData(props){

    const cols = [
        {field: 'cbdcid', headerName: 'CBDC ID', width: 85},
	{field: 'uid', headerName: 'Unique ID', width: 200},
        {field: 'issuedtoentity', headerName: 'Issued To', width: 100},
        {field: 'timestamp', headerName: 'Date of Transaction', width: 200},
	{field: 'createdtimestamp', headerName: 'Date Created', width: 200},
        {field: 'value', headerName: 'Denomination', width: 150},
	{field: 'currency', headerName: 'Currency', width: 70},
	{field: 'validuntil', headerName: 'Valid Until', width: 200},
    ];

    // const rows = [
    //     {id: 1, value: 2000, denomination: 100, amount: 20, timestamp: 28/11/2022},
    //     {id: 2, value: 2000, denomination: 100, amount: 20, timestamp: 28/11/2022},
    // ];

    return(
        <div className='table'>
            <DataGrid
                getRowId={(row) => row.cbdcid}
                rows={props.data}
                columns={cols}
                rowsPerPageOptions={[2]}
                autoHeight />
        </div>
    )

}