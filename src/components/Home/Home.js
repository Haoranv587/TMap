import React, { Fragment } from "react";
import Card from "../UI/Card";
import classes from './Home.module.css';

const Home = props=>{

    return (
        <Fragment>
            <Card className={classes.home}>
                <h1>more stuff</h1>
            </Card>
        </Fragment>
    )
};

export default Home;