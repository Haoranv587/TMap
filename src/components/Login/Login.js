import React, { useEffect, useReducer, useState, useRef } from "react";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import LoginInput from "./LoginInputs";
import LoginModal from "../UI/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const emailReducer = (state, action) => {
  if (action.type === "USER_EMAIL_INPUT") {
    return { value: action.val, isValid: !!action.val.match(emailFormat) };
  }

  if (action.type === "USER_EMAIL_BLUR") {
    return { value: state.value, isValid: !!state.value.match(emailFormat) };
  }

  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSSWORD_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "USER_PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: null };
};

const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timeIdentifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(timeIdentifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_EMAIL_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.match(emailFormat) && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASSSWORD_INPUT", val: event.target.value });
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_EMAIL_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_PASSWORD_BLUR" });
  };
  async function submitHandler(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <LoginModal className={classes.login}>
      <h1>Log in</h1>
      {error && <h1>{error}</h1>}
      <form onSubmit={submitHandler}>
        <LoginInput
          label="Email"
          type="email"
          id="email"
          ref={emailRef}
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <LoginInput
          label="Password"
          type="password"
          id="password"
          ref={passwordRef}
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" disabled={!formIsValid || Loading}>
            Login
          </Button>
        </div>
      </form>
      <div>
        Need an Account? <Link to="/signup">Signup</Link>{" "}
      </div>
    </LoginModal>
  );
};

export default Login;
