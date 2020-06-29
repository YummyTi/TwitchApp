import React, { useReducer } from "react";
import "./LoginPlane.css";
import { Link } from "react-router-dom";

import { login } from "./utils";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "LOGIN":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "ERROR":
      return {
        ...state,
        error: "Incorrect password or username!",
        isLoading: false,
        username: "",
        password: "",
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        username: "",
        password: "",
      };
    default:
      return state;
  }
};

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

const LoginPlane = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN" });

    try {
      await login({ username, password });

      dispatch({ type: "SUCCESS" });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  return (
    <div className="login-app">
      {isLoggedIn ? (
        <>
          <h1 className="text-center align-center mt-4 text-danger">
            Hello {username}! inReducer
          </h1>
          <button
            onClick={() => dispatch({ type: "LOGOUT" })}
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
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "username",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              className="form-control mt-3"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.currentTarget.value,
                })
              }
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
          <Link to="/" className="btn btn-light w-100 mt-2">
            useState Login
          </Link>
          {error && <p className="text-center text-danger mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPlane;
