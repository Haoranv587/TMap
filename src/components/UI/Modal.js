import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
}
const LoginModalOverlay = props => {
    return <div className={classes.modal}>{props.children}</div>

}
const portalElement = document.getElementById('overlays');

const LoginModal = props => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<LoginModalOverlay>{props.children}</LoginModalOverlay>, portalElement)}
        </Fragment>
    )
};

export default LoginModal;