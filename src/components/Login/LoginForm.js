import React from "react";
import { useForm } from "react-hook-form";
import classes from "./LoginInputs.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onTouched" });
  const onSubmit = (data) => console.log(data);

  //check Password event
  const password = watch("password");

  return (
    <div className={classes.control}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        name="email"
        label="Eamil"
        placeholder="Email"
        {...register("email", {
          required: { value: true, message: "An Email input is required" },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Valid email is required",
          },
        })}
      />
      {errors.email && (
        <span role ='alert'>{errors.email?.message}</span>
      )}
      <input
        type="password"
        name="password"
        label="Password"
        {...register("password", {
          required: { value: true, message: "Valid password is required" },
          pattern: {
            value:
              // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              /[0-9]/,
            message:
              "Password should be at least 6 characters long, should have 1 upper case and 1 lower case, 1 number and 1 special character",
          },
          minLength: { value: 6, message: "Minimum Required Length is 6" },
          maxLength: { value: 20, message: "Maximum Reuired Length is 20" },
        })}
      />
      {errors.password && (
        <span role ='alert'>{errors.password?.message}</span>
      )}
      <input
        type="password"
        name="passwordComfirmation"
        label="Password Comfirmation"
        {...register("passwordComfirmation", {
          required: {
            value: true,
            message: "Password confirmation input is required",
          },
          validate: (value) =>
          value === password || "The passwords do not match",
        })}
      />
      {errors.passwordComfirmation && (
        <span role ='alert'>
          {errors.passwordComfirmation?.message}
        </span>
      )}
      <input type="submit" />
    </form>
    </div>
  );
};

export default LoginForm;
