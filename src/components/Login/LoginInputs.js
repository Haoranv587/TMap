import React from "react";
import classes from "./LoginInputs.module.css";

const LoginInput = React.forwardRef((props, ref) => {
  return (
    <>
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          ref={ref}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </>
  );
});

export default LoginInput;
