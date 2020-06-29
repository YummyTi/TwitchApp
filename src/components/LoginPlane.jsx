import React, { useState } from "react";
import "./LoginPlane.css";
import { Link } from "react-router-dom";

import { login } from "./utils";

const LoginPlane = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      await login({ username, password });

      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Incorrect password or username!");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-app">
      {isLoggedIn ? (
        <>
          <h1 className="text-center align-center mt-4 text-danger">
            Hello {username}!
          </h1>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="btn btn-warning text-center mt-5 justify-content-center w-75 ml-5"
          >
            Log Out
          </button>
        </>
      ) : (
        <div className="login-container">
          <p className="text-center header-login mt-4">Please Login!</p>
          <form className="form" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="form-control mt-3"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button className="btn btn-primary w-100 mt-3" disabled={isLoading}>
              {isLoading ? (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <Link to="/reducer" className="btn btn-light w-100 mt-2">
            Reducer Login
          </Link>
          {error && <p className="text-center text-danger mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPlane;
