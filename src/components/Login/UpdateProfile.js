import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import LoginModal from "../UI/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ReactHookFormInputs from "./ReactHookFormInputs";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const UpdateProfile = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { updateEmail, updatePassword, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onTouched",
  });
  const onSubmit = (data) => alert(JSON.stringify(data));
  //check Password event
  emailRef.current = watch("email", "");
  passwordRef.current = watch("password", "");
  //Firebase sign up event
  const ClickHandler = (e) => {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current !== currentUser.email) {
      promises.push(updateEmail(emailRef.current));
    }
    if (passwordRef.current) {
      promises.push(updatePassword(passwordRef.current));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // handle password eye
  const passwordClickHandler = () => {
    setPasswordEye(!passwordEye);
  };
  // handle confirm password eye
  const confirmPasswordClickHandler = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  return (
    <LoginModal className={classes.login}>
      <h1>Update Profile</h1>
      {currentUser && currentUser.email}
      {error && <h3>{error}</h3>}
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
        <div>
          <ReactHookFormInputs
            register={register}
            errors={errors}
            fieldName="password"
            type={passwordEye === false ? "password" : "text"}
            label="Password"
            id="password"
            isRequired={true}
            message="Password should be at least 6 characters long, should have 1 upper case and 1 lower case, 1 number and 1 special character"
            pattern={
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            }
            minimLength={6}
            maximLength={20}
            showPasswordEye={
              passwordEye === false ? (
                <AiFillEyeInvisible onClick={passwordClickHandler} />
              ) : (
                <AiFillEye onClick={passwordClickHandler} />
              )
            }
          />
        </div>
        <ReactHookFormInputs
          register={register}
          errors={errors}
          fieldName="passwordComfirmation"
          type={confirmPasswordEye === false ? "password" : "text"}
          label="Password Comfirmation"
          id="password-confirm"
          isRequired={true}
          messageValidate="The passwords do not match"
          validate={(value) =>
            value === passwordRef.current || "The passwords do not match"
          }
          showPasswordEye={
            confirmPasswordEye === false ? (
              <AiFillEyeInvisible onClick={confirmPasswordClickHandler} />
            ) : (
              <AiFillEye onClick={confirmPasswordClickHandler} />
            )
          }
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            disabled={!isValid || Loading}
            onClick={ClickHandler}
          >
            Update
          </Button>
        </div>
      </form>

      <div>
        <Link to="/">Cancel</Link>{" "}
      </div>
    </LoginModal>
  );
};

export default UpdateProfile;
