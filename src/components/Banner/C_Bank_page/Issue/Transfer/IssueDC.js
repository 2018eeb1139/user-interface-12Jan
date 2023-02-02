import React from "react";
import {
  Box,
  Chip,
  Select,
  MenuItem,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import "../issueTab.css";
import issuedc from "../../../../../services/issue.service";

export function IssueDC(props) {
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
  };

  function Issue(value, count, issueTo) {
    let userData = JSON.parse(localStorage.getItem("user"));
    //console.log(userData.username);
    let requester = userData.username;

    let today = new Date();
    // let year = today.getFullYear();
    // let month = today.getMonth();
    // let day = today.getDate();

    // let UTCDate = today.toISOString() + "[UTC]";
    // console.log(UTCDate);
    // let expiry = new Date(year + 3, month, day);
    let epoc = Math.floor(today.getTime());
    console.log(epoc);

    issuedc
      .issueDC(
        "mint",
        "centralbank",
        requester,
        value,
        issueTo,
        "USFedBank",
        count,
        epoc
      )
      .then((response) => {
        //response = response.data.message.substring(63);
        console.log(response);
        // let cbdcArray = response.split(/\t/g);
        // for(let i = 0; i<cbdcArray.length; i++){
        // let temp = eval(cbdcArray[i]);
        // cbdcArray[i] = temp;
        //         }
        // response = cbdcArray[0];
        //     //console.log(response);
        // setTableData(response);

        //console.log(typeof response);
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  }

  useEffect(() => {
    console.log(Entity);
    getData(props.data, Entity);
  }, [Entity]);

  //console.log(Entity);

  const getData = (rows, entity) => {
    console.log(entity);
    let entityIssue = rows
      .filter(function (row) {
        return row.owner == entity;
      })
      .map(function (row) {
        return row;
      });
    //setEntityData(entityIssue);
    console.log(entityIssue);
    let total = 0;
    for (let i = 0; i < entityIssue.length; i++) {
      let temp = parseInt(entityIssue[i].value);
      total += temp;
    }
    setTotalTranfer(total);
  };

  return (
    <div className="TransferMenu">
      <div className="transferHeight">
        <div className="EntityDetail">
          <div className="entityInput">
            Entity :{" "}
            <Select
              sx={{ width: 150 }}
              variant="standard"
              label="Entity"
              value={Entity}
              onChange={entityHandler}
              autoWidth
            >
              <MenuItem value={"Bank1"}> Bank 1 </MenuItem>
              <MenuItem value={"Bank2"}> Bank 2 </MenuItem>
              <MenuItem value={"NBFC1"}> NBFC 1 </MenuItem>
            </Select>
          </div>
          <div className="totalTransfer">
            <h5>
              Total Issued Value to Entity :{" "}
              <Chip
                sx={{ width: 100, bgcolor: "#357339", color: "#FFFFFF" }}
                label={TotalTransfer}
              />{" "}
              $
            </h5>
          </div>
        </div>

        <div className="assignMenu">
          <div className="denoInput">
            Denomination:{" "}
            <Select
              sx={{ width: 150 }}
              variant="standard"
              label="Denomination"
              value={IssueDeno}
              onChange={denoChangeHandler}
              autoWidth
            >
              <MenuItem value={100}> $100 </MenuItem>
              <MenuItem value={500}> $500 </MenuItem>
            </Select>
          </div>

          <div className="count">
            {" "}
            Count :{" "}
            <TextField
              variant="standard"
              type="number"
              id="outlined-name"
              onChange={amountChangeHandler}
            />
          </div>
        </div>

        <div className="transferAmount">
          <h5>
            Total Transfer Amount :{" "}
            <Chip
              sx={{ width: 100, bgcolor: "#357339", color: "#FFFFFF" }}
              label={IssueQuantity <= 0 ? 0 : IssueDeno * IssueQuantity}
            />{" "}
            $
          </h5>
        </div>

        <div className="transfer">
          {IssueQuantity <= 0 ? (
            <Button variant="contained" disabled>
              {" "}
              Issue{" "}
            </Button>
          ) : (
            <div>
              <Button
                sx={{ bgcolor: "#357339" }}
                variant="contained"
                onClick={() => {
                  let data = Issue(IssueDeno, IssueQuantity, Entity);
                  setOpen(data);
                  setFinalAmount(IssueDeno * IssueQuantity);
                }}
              >
                {" "}
                Issue{" "}
              </Button>
              <Modal hideBackdrop open={open} onClose={() => setOpen(false)}>
                <div className="prompt">
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 700,
                      bgcolor: "#D8D9CF",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: "10px",
                    }}
                  >
                    <p>
                      <strong>Central Bank</strong> has issued{" "}
                      <strong>{IssueQuantity}</strong> CBDC token(s) of{" "}
                      <strong>{IssueDeno}$</strong> Denomination totaling of
                      value <strong>{FinalAmount}$</strong> to{" "}
                      <strong>{Entity}</strong>
                    </p>
                    <Box>
                      <Button
                        sx={{ top: "50%", bgColor: "#013DF0" }}
                        variant="contained"
                        onClick={() => setOpen(false)}
                      >
                        {" "}
                        OK{" "}
                      </Button>
                    </Box>
                  </Box>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
