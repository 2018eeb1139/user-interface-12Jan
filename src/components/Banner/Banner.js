import "./banner.css";
import React from "react";
import UserIcon from "./UserIcon";
import AuthService from "../../services/auth.service";
import logo from "../../media/tdcp-logo-trans.png";

function Banner() {
  const currentUser = AuthService.getCurrentUser();
  const entity = currentUser.entity;
  // console.log(entity)
  let className;
  if (entity === "centralbank") {
    className = "centralbank";
  } else if (entity === "bank1") {
    className = "bank1";
  } else if (entity === "bank2") {
    className = "bank2";
  } else if (entity === "nbfc1") {
    className = "nfbc1";
  } else if (entity === "regulator") {
    className = "regulator";
  }
  return (
    <div className="banner__1">
      <div className="banner">
        <img src={logo} alt="" />
        <div className="title">Trusted Digital Currency Platform</div>
      </div>
      <div className="banner__userIcon">
        <span className={`${className}`}>{currentUser.entity}</span>
        <UserIcon />
      </div>
    </div>
  );
}

export default Banner;
