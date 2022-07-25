import React from "react";
import classes from "./Header.module.css";
import LoginButton from "../Login/LoginButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>TMap</h1>
        <LoginButton onClick={props.onShowLoginModal} />
      </header>
    </>
  );
};

export default Header;
