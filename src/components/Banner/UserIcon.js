import "./banner.css";
import React from "react";
import { Divider } from "@mui/material";
import { useState } from "react";
import AuthService from "../../services/auth.service";
import Modes from "./C_Bank_page/Modes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserIcon = () => {
  const currentUser = AuthService.getCurrentUser();
  let currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "short" });
  let date =
    currentDate.getDate() +
    " " +
    month +
    " " +
    currentDate.getFullYear() +
    " " +
    currentDate.getHours() +
    ":" +
    ((currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes());
  const [user, Setuser] = useState(currentUser.username);
  const [time, Settime] = useState(date);
  //const [date,setDate] = useState(0);
  return (
    <>
      <div className="user">
        <AccountCircleIcon />
        Welcome {user + "@" + currentUser.entity}<br/>
        {/* <Divider variant="inset" sx={{ borderColor: 'black', width: 0.8 }} /> */}
        {date}
      </div>
      {/* <Modes/> */}
    </>
  );
};

export default UserIcon;
