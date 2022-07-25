import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import LoginModal from "../UI/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import ReactHookFormInputs from "./ReactHookFormInputs";
import { useForm } from "react-hook-form";

const ForgotPassword = (props) => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onTouched",
  });
  const onSubmit = (data) => alert(JSON.stringify(data));

  emailRef.current = watch("email", "");

  const ClickHandler = (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      resetPassword(emailRef.current).then(
        setMessage("check your inbox for further instructions")
      );
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <LoginModal className={classes.login}>
      <h1>Password Reset</h1>
      {error && <h3>{error}</h3>}
      {message && <h3>{message}</h3>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactHookFormInputs
          register={register}
          errors={errors}
          fieldName="email"
          type="email"
          label="Email"
          id="email"
          isRequired={true}
          message="Valid email is required"
          pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            disabled={!isValid || Loading}
            onClick={ClickHandler}
          >
            Reset Password
          </Button>
        </div>
        <div>
          <Link to="/login">Login</Link>{" "}
        </div>
      </form>

      <div>
        Need an Account? <Link to="/signup">Signup</Link>{" "}
      </div>
    </LoginModal>
  );
};

export default ForgotPassword;
