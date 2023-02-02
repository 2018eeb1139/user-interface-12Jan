import { Select, MenuItem, TextField, Button, Modal, Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import "../mint.css";
import AuthService from "../../../../../services/auth.service";
import createdc from "../../../../../services/createdc.service";
import getall from "../../../../../services/getallcb.service";

export function Generate() {
  const [generatedDigit, setGeneratedValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  //const [created, setCreated] = useState(false);

  const [open, setOpen] = useState(false);

  const denoChangeHandler = (event) => {
    setGeneratedValue(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const currentUser = AuthService.getCurrentUser();
  const organization = currentUser.organization;
  // console.log(organization)
  let color;
  if (organization === "central bank") {
    color = "centralbank";
  } else if (organization === "bank 1") {
    color = "bank1";
  } else if (organization === "bank 2") {
    color = "bank2";
  } else if (organization === "nbfc 1") {
    color = "nfbc1";
  } else if (organization === "regulator") {
    color = "regulator";
  }

  // const handleOpen = () => {
  //     setOpen(true);
  // }

  // const handleClose = () => {
  //     setOpen(false);
  // }
  // const totalMintedValue = ()=>{
  //     setTotal(generatedDigit*amount);
  // }

  //console.log(generatedDigit);
  //console.log(total);
  function CreateDC(value, count) {
    let userData = JSON.parse(localStorage.getItem("user"));
    //console.log(userData.username);
    let requester = userData.username;

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    let UTCDate = today.toISOString();
    console.log(UTCDate);
    let expiry = new Date(year + 3, month, day);
    let epoc = Math.floor(today.getTime());
    console.log(epoc);

    for (let i = 1; i <= count; i++) {
      //let itr = Math.floor(Math.random() * 90 + 10);
      //console.log(itr);
      // useEffect(() => {
      createdc
        .createDC(
          "mint",
          "centralbank",
          requester,
          "dollar",
          UTCDate,
          "USFedBank",
          "USFedBank",
          "USFedBank",
          epoc,
          expiry,
          value
        )
        .then((response) => {
          response = response.data.message.substring(63);
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
      //   }, [])
    }
    return true;
  }

  return (
    <>
      <div className="generateMenu">
        <div className="denoInput">
          Denomination:
          <Select
            sx={{
              width: 150,
            }}
            variant="standard"
            label="Denomination"
            value={generatedDigit}
            onChange={denoChangeHandler}
            autoWidth
          >
            <MenuItem value={100}> $100 </MenuItem>
            <MenuItem value={500}> $500 </MenuItem>
          </Select>
        </div>

        <div className="count">
          Count :
          <TextField
            variant="standard"
            type="number"
            id="outlined-name"
            onChange={amountChangeHandler}
          />
        </div>
      </div>

      <div className="generate">
        {amount <= 0 ? (
          <Button variant="contained" disabled>
            {" "}
            Confirm{" "}
          </Button>
        ) : (
          <div>
            <Button
              variant="contained"
              // color="#eac4d5"
              onClick={() => {
                let data = CreateDC(generatedDigit, amount);
                console.log(data);
                setOpen(data);
                setTotal(amount * generatedDigit);
              }}
            >
              Confirm
            </Button>
            <Modal hideBackdrop open={open} onClose={() => setOpen(false)}>
              <div className="prompt">
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "#D8D9CF",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "10px",
                  }}
                >
                  <p>
                    Generated {amount} CBDC token(s) of {generatedDigit}$
                    denomination totaling of value {total}$
                  </p>
                  <Box>
                    <Button
                      sx={{
                        top: "50%",
                      }}
                      variant="contained"
                      onClick={() => setOpen(false)}
                    >
                      OK
                    </Button>
                  </Box>
                </Box>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}
//onClick={totalMintedValue(amount, generatedDigit)
