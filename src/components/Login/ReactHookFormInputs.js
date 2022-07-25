import React from "react";
import classes from "./LoginInputs.module.css";
import PropTypes from "prop-types";

const ReactHookFormInputs = ({
  label,
  id,
  fieldName,
  register,
  errors,
  pattern = undefined,
  validate,
  type,
  isRequired,
  maximLength = undefined,
  minimLength = undefined,
  message,
  showPasswordEye = undefined,
}) => {
  return (
    <div className={classes.control}>
      <div className={classes.container}>
        <label htmlFor={id}>{label}</label>
        <div className={classes.passwordContainer}>
          <input
            type={type}
            name={fieldName}
            {...register(fieldName, {
              required: {
                value: isRequired,
                message: `${fieldName} input is required`,
              },
              pattern: { value: pattern, message: message },
              maxLength: {
                value: maximLength,
                message: `Value must be maximum ${maximLength}`,
              },
              minLength: {
                value: minimLength,
                message: `Value must be minimum ${minimLength}`,
              },
              validate: validate ? { validate } : undefined,
            })}
          />
          <i>{showPasswordEye}</i>
        </div>
        <div className={classes.error}>
          {errors[fieldName] && (
            <span role="alert">{errors[fieldName]?.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};
ReactHookFormInputs.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  pattern: PropTypes.object,
  validate: PropTypes.func,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  maximLength: PropTypes.number,
  minimLength: PropTypes.number,
  message: PropTypes.string,
  messageValidate: PropTypes.string,
  showPasswordEye: PropTypes.object,
};
export default ReactHookFormInputs;
