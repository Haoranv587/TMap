import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};
const LoginModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};
const portalElement = document.getElementById("overlays");

const LoginModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <LoginModalOverlay>{props.children}</LoginModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default LoginModal;
