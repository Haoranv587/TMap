import React, { useEffect, useReducer, useState } from "react";
import Button from "../UI/Button";
import classes from './Login.module.css';
import HeaderLoginInput from "./HeaderLoginInputs";
import LoginModal from "../UI/LoginModal";

const emailReducer =(state, action) =>{
    if (action.type === 'USER_EMAIL_INPUT'){
        return {value: action.val, isValid: action.val.includes('@')};
    }

    if (action.type === 'USER_EMAIL_BLUR'){
        return {value: state.value, isValid: state.value.includes('@')};
    }
    console.log('Hi')
    return {value:'', isValid: null}
};

const passwordReducer =(state, action) =>{
    if (action.type === 'USER_PASSSWORD_INPUT'){
        return {value: action.val, isValid: action.val.trim().length > 6}
    }

    if (action.type === 'USER_PASSWORD_BLUR'){
        return {value: state.value, isValid: state.value.trim().length > 6}
    }
    return {value:'', isValid: null}
};

const Login = props => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null});

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid: null});

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(()=>{
        const timeIdentifier = setTimeout(() => {console.log('Checking form validity'); setFormIsValid(emailIsValid && passwordIsValid);}, 500);
          return () => {console.log('CLEANUP');clearTimeout(timeIdentifier);};
        }, [emailIsValid, passwordIsValid]);


    const emailChangeHandler =(event) =>{
        dispatchEmail({type:'USER_EMAIL_INPUT', val:event.target.value})
        setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
    };

    const passwordChangeHandler =(event) =>{
        dispatchPassword({type:'USER_PASSSWORD_INPUT', val:event.target.value})
        setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
    }

    const validateEmailHandler =() =>{dispatchEmail({type:'USER_EMAIL_BLUR'})};
    const validatePasswordHandler =() =>{dispatchPassword({type:'USER_PASSWORD_BLUR'})};

    // const submitHandler = (event) =>{
    //     event.preventDefault();
    //     (emailState.value, passwordState.value)
    // }

    return(
    <LoginModal className ={classes.login}>
        {/* <form onSubmit={submitHandler}> */}
        <form>
            <HeaderLoginInput label = 'Email' type = 'email' id= "email" value= {emailState.value} isValid={emailState.isValid} onChange= {emailChangeHandler} onBlur= {validateEmailHandler}/>
            <HeaderLoginInput label= "Password" type= "password" id= "password" value= {passwordState.value} isValid={passwordState.isValid} onChange= {passwordChangeHandler} onBlur= {validatePasswordHandler} />
            <div className={classes.actions}>
                <Button type="submit" disabled={!formIsValid}>Login</Button>
            </div>
        </form>
    </LoginModal>
  ) 
};

export default Login;