import React from "react";
import "./pMT.css";
import {
  Box,
  Chip,
  Select,
  MenuItem,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import issuedc from "../../../services/issue.service";

const ProgrammableMoneyTransfer = () => {
  const [Entity, setEntity] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [timeUp1, setTimeUp1] = useState(false);

  let finalAmount = amount;

  const token500 = Math.floor(finalAmount / 500);
  const token100 = Math.floor((finalAmount % 500) / 100);

  const onTimeUp = () => {
    setTimeUp(false);
    setTimeUp1(true);
  };

  const handleClick = () => {
    setOpen(false);
    setTimeUp(true);
  };

  const handleClick2 = () => {
    setOpen1(false);
    setTimeUp1(false);
  };
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  console.log("token500", token500);
  console.log("token100", token100);

  const Issue = (value, count, issueTo) => {
    let userData = JSON.parse(localStorage.getItem("user"));
    //console.log(userData.username);
    let requester = userData.username;
    let today = new Date();
    let epoc = Math.floor(today.getTime());
    console.log(epoc);
    issuedc
      .issueDC("mint", "bank1", requester, value, issueTo, "bank1", count, epoc)
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
  };

  return (
    <>
      <div className="pMT__timer">
        {timeUp && (
          <CountdownCircleTimer
            size={80}
            strokeWidth={5}
            isPlaying
            duration={duration * 60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[60, 45, 30, 15]}
            onComplete={() => {
              onTimeUp();
            }}
          >
            {renderTime}
          </CountdownCircleTimer>
        )}
        {timeUp1 && (
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
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>
              {Entity} Transfer <strong>{amount}$</strong> to Bank1
            </p>
            <Button onClick={handleClick2} variant="contained">
              OK
            </Button>
          </Box>
        )}
      </div>
      <div className="pMT">
        <div className="pMT__div1">
          <div className="pMT__entityInput">
            <strong>Entity :</strong>{" "}
            <Select
              sx={{ width: 150, paddingLeft: "2px" }}
              variant="standard"
              label="Entity"
              value={Entity}
              onChange={(e) => setEntity(e.target.value)}
              autoWidth
            >
              <MenuItem value={"Bank2"}> Bank 2 </MenuItem>
              <MenuItem value={"NBFC1"}> NBFC 1 </MenuItem>
            </Select>
          </div>

          <div className="pMT__transferAmount">
            <h5>Transfer Value : </h5>
            <FormControl>
              <InputLabel>Amount</InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
          </div>
        </div>

        <div className="pMT__duration">
          <strong>Duration :</strong>{" "}
          <Select
            sx={{ width: 150, paddingLeft: "2px" }}
            variant="standard"
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            autoWidth
          >
            <MenuItem value={"1"}> 1 min </MenuItem>
            <MenuItem value={"2"}> 2 min </MenuItem>
            <MenuItem value={"3"}> 3 min </MenuItem>
          </Select>
        </div>

        {amount <= 0 || !duration || !Entity ? (
          <div className="pMT__transferButton">
            <Button variant="contained" disabled>
              {" "}
              Transfer{" "}
            </Button>
          </div>
        ) : (
          <div className="pMT__transferButton">
            <Button
              sx={{ bgcolor: "#357339" }}
              variant="contained"
              onClick={() => {
                Issue("500", token500, Entity);
                Issue("100", token100, Entity);
                setOpen(true);
                finalAmount = amount;
              }}
            >
              {" "}
              Transfer{" "}
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
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
                    Bank1 Transfer <strong>{amount}$</strong> to {Entity}
                  </p>
                  <Button variant="contained" onClick={handleClick}>
                    OK
                  </Button>
                </Box>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgrammableMoneyTransfer;
