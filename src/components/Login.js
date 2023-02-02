import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./Login.css";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [entity, setEntity] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeEntity = (e) => {
    const entity = e.target.value;
    setEntity(entity);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(entity, username, password).then(
        () => {
          if (entity === "regulator") {
            navigate("/regulator-minting");

            window.location.reload();
          } else if (entity === "bank1") {
            navigate("/bank1");

            window.location.reload();
          } else if (entity === "bank2") {
            navigate("/bank2");

            window.location.reload();
          } else if (entity === "nbfc1") {
            navigate("/nbfc1");

            window.location.reload();
          } else if (entity === "centralbank") {
            navigate("/minting");

            window.location.reload();
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
    // console.log(entity)
  };

  return (
    <div className="image">
      <div className="card card-container">
        <h3 className="heading">Trusted Digital Currency Platform</h3>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="entity">Please Select Entity:</label>
            <select
              name="entity"
              id="entity"
              className="form-control"
              value={entity}
              onChange={onChangeEntity}
              validations={[required]}
            >
              <option value="select">Select your entity</option>
              <option value="centralbank">Central Bank</option>
              <option value="bank1">Bank 1</option>
              <option value="bank2">Bank 2</option>
              <option value="nbfc1">NBFC 1</option>
              <option value="regulator">Regulator</option>
            </select>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          <div className="dont">
            Don't have an account? <Link to={"/register"}>Sign Up</Link>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
