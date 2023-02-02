import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import { RegHome } from "./components/Banner/Regulator/RegHome";
import EventBus from "./common/EventBus";
import Modes from "./components/Banner/C_Bank_page/Modes";
import BankPortal from "./components/Banner/BankPortal/BankPortal";
import Bank2Portal from "./components/Banner/Bank2Portal/Bank2Portal";
import NBFC1Portal from "./components/Banner/NBFC1Portal/NBFC1Portal";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-white mg-t">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="https://www.ltimindtree.com/">
              <img
                className="ltim__logo"
                src="https://www.ltimindtree.com/wp-content/uploads/2022/10/LTIMindtree_Linear_2-1-LT-Blue-1-1.png"
                alt="logo"
              />
            </a>
          </li>
          <li className="nav-item">
            <Link to={"/home"} className="nav-link app__link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link app__link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link app__link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link app__link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link app__link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link app__link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link app__link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link app__link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/minting" element={<Modes />} />
        <Route exact path="/bank1" element={<BankPortal />} />
        <Route exact path="/bank2" element={<Bank2Portal />} />
        <Route exact path="/nbfc1" element={<NBFC1Portal />} />
        <Route exact path="/regulator-minting" element={<RegHome />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>
    </div>
  );
};

export default App;
