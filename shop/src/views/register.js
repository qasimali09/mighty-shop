import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import axios from "../utils/axios";
import {
  AUTH_LOADING_ON,
  AUTH_LOADING_OFF,
  SET_USER,
} from "../store/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const { isLoading } = useSelector((e) => e.AuthReducer);
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    if(state.password !== state.confirmPassword){
      toast.error("Password not match")
      return
    }

    if(state.password.length < 6){
      toast.error("Password must be at least 6 characters")
      return
    }
    
    e.preventDefault();
    dispatch({ type: AUTH_LOADING_ON });
    try {
      const { data } = await axios.post("/api/register", state);
      localStorage.setItem("token", data?.token || null);
      toast.success("Register Successful");
      dispatch({ type: SET_USER, payload: data?.user || null });
      dispatch({ type: AUTH_LOADING_OFF });
    } catch (error) {
      dispatch({ type: AUTH_LOADING_OFF });
      if (error.response) {
        toast.error(error.response.data.message);
        return console.log(error.response);
      }
      console.log(error);
    }
  };
  return (
    <div className="auth">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Registeration</h2>
        <div className="form-group">
          <label htmlFor="email">enter name</label>
          <input
            type="name"
            name="name"
            value={state.name}
            required
            onChange={(e) => setstate({ ...state, name: e.target.value })}
            id="name"
            placeholder="eg: John Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">enter email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            required
            onChange={(e) => setstate({ ...state, email: e.target.value })}
            id="email"
            placeholder="eg: example@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">enter password</label>
          <input
            type="password"
            required
            value={state.password}
            name="password"
            id="password"
            placeholder="********"
            onChange={(e) => setstate({ ...state, password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">confirm password</label>
          <input
            type="password"
            required
            value={state.confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
            onChange={(e) =>
              setstate({ ...state, confirmPassword: e.target.value })
            }
          />
        </div>
        {isLoading ? (
          <button type="button" className="btn" disabled>
            <Loader />
          </button>
        ) : (
          <button type="submit" className="btn">
            register
          </button>
        )}
        <p className="bottom">
          Already have a account <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
