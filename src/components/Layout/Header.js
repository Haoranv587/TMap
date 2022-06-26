import React, { Fragment } from "react";
import classes from './Header.module.css';
import HeaderLoginButton from "../Login/HeaderLoginButton";


const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>TMap</h1>
            <HeaderLoginButton onClick ={props.onShowLoginModal}/>
        </header>
    </Fragment>
};

export default Header;