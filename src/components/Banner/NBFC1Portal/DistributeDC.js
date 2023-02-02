import { Chip, MenuItem, Modal, Select, Button, Box, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import "./bankPortal.css"


const DistributeDC = () => {

    const [TotalTransfer, setTotalTranfer] = useState(0);
    const [Entity, setEntity] = useState();
    const [IssueDeno, setIssueDeno] = useState();
    const [IssueQuantity, setIssueQuantity] = useState(0);
    const [FinalAmount, setFinalAmount] = useState(0);

    const [open, setOpen] = useState(false);

    const denoChangeHandler = (event) => {
        setIssueDeno(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setIssueQuantity(event.target.value);

    };

    const entityHandler = (event) => {
        setEntity(event.target.value);
    }

    // console.log(IssueDeno);
    // console.log(IssueQuantity);
    // console.log(FinalAmount);
    // console.log(Entity);

    return (
        <div>
            <div className="EntityDetail">
                <div className="entityInput">Issue To :  <Select sx={{ width: 150 }} variant="standard" label="Entity" value={Entity} onChange={entityHandler} autoWidth>
                    <MenuItem value={"Bank 2"}> Bank 2 </MenuItem>
                    <MenuItem value={"NBFC 1"}> NBFC 1 </MenuItem>
                    <MenuItem value={"Bank 3"}> Bank 3 </MenuItem>
                    <MenuItem value={"Retail 1"}> Retail 1 </MenuItem>
                </Select>
                </div>
                <div className='totalTransfer'>
                    <h5>Total Issued Value to Entity : <Chip sx={{ width: 100, bgcolor: '#357339', color: '#FFFFFF' }} label={TotalTransfer} /> $</h5>
                </div>
            </div>


            <div className="assignMenu">
                <div>Denomination: <Select sx={{ width: 150 }} variant="standard" label="Denomination" value={IssueDeno} onChange={denoChangeHandler} autoWidth>
                    <MenuItem value={100}> $100 </MenuItem>
                    <MenuItem value={500}> $500 </MenuItem>
                </Select>
                </div>

                <div className="count"> Count :  <TextField variant="standard" type="number" id="outlined-name" onChange={amountChangeHandler} /></div>
            </div>

            <div className='transferAmount'>
                <h5>Total Transfer Amount : <Chip sx={{ width: 100, bgcolor: '#357339', color: '#FFFFFF' }} label={(IssueQuantity <= 0) ? 0 : (IssueDeno * IssueQuantity)} /> $</h5>
            </div>

            <div>
                <div className='issueButton'>
                {(IssueQuantity <= 0) ? <Button variant="contained" disabled> Issue </Button> :
                    <div>
                            <Button sx={{ bgcolor: '#013DF0' }} variant="contained" onClick={() => { setOpen(true); setFinalAmount(IssueDeno * IssueQuantity); }}> Issue </Button>
                        <Modal hideBackdrop open={open} onClose={() => setOpen(false)}>
                            <div className="prompt">
                                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, bgcolor: '#D8D9CF', boxShadow: 24, p: 4, borderRadius: '10px' }}>
                                    <p>
                                        {Entity} issued {IssueQuantity} CBDC token(s) of {IssueDeno}$ denomination totaling of value {FinalAmount}$
                                    </p>
                                    <Box>
                                        <Button sx={{ top: '50%', bgColor: '#013DF0' }} variant="contained" onClick={() => setOpen(false)}> OK </Button>
                                    </Box>
                                </Box>
                            </div>
                        </Modal>
                    </div>
                }
                </div>
            </div>


        </div>
    )

}

export default DistributeDC;

