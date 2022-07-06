import React, { useEffect, useReducer, useRef, useState } from "react";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import LoginInput from "./LoginInputs";
import LoginModal from "../UI/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

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

export function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  // console.log (emailState.value)
  // console.log (passwordState.value)
  // console.log (passwordConfirmState.value)

  return (
    <LoginModal className={classes.login}>
      {currentUser && currentUser.email}
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit}>
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
        <LoginInput
          label="Password Confirmation"
          type="password"
          id="password-confirm"
          ref={passwordConfirmRef}
          // value={props.value}
          // isValid={passwordConfirmState.isValid}
          // onChange={passwordConfirmChangeHandler}
          // onBlur={validatePasswordConfirmHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" disabled={!formIsValid || Loading}>
            Sign Up
          </Button>
        </div>
      </form>
      <div>
        Already have an account? <Link to="/login">Login</Link>{" "}
      </div>
    </LoginModal>
  );
}

export default Signup;
