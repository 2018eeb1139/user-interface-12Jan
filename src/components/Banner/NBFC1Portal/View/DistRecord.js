import React from "react";
import { DataGrid } from '@mui/x-data-grid';

export function DistRecord(){

    const cols = [
        {field: 'cbdcid', headerName: 'CBDC ID', width: 85},
        {field: 'createdtimestamp', headerName: 'Date Created', width: 150},
        {field: 'currency', headerName: 'Currency', width: 100},
        // {field: 'issuedbyentity', headerName: 'Issued By', width: 150},
        {field: 'issuedtoentity', headerName: 'Issued To', width: 150},
        {field: 'owner', headerName: 'Owner', width: 150},
        {field: 'timestamp', headerName: 'Date of Transaction', width: 150},
        {field: 'uid', headerName: 'Unique ID', width: 100},
        {field: 'validuntil', headerName: 'Valid Until', width: 100},
        {field: 'denomination', headerName: 'Denomination', width: 150},
        {field: 'amount', headerName: 'Amount of Tokens', width: 150},
        {field: 'value', headerName: 'Total Value', width: 150},
    ];

    const rows = [
        {id: 1, value: 2000, denomination: 100, amount: 20, timestamp: '28/11/2022', currency: 'USD', issuedtoentity: 'Bank 1', owner: 'Bank 1'},
        {id: 2, value: 2000, denomination: 100, amount: 20, timestamp: '28/11/2022' ,currency: 'USD', issuedtoentity: 'Bank 1', owner: 'Bank 1'},
        {id: 3, value: 2000, denomination: 100, amount: 20, timestamp: '28/11/2022' ,currency: 'USD', issuedtoentity: 'Bank 1', owner: 'Bank 1'},
    ];

    return(
        <div className='table'>
            <DataGrid
                rows={rows}
                columns={cols}
                rowsPerPageOptions={[2]}
                autoHeight />
        </div>
    )

}