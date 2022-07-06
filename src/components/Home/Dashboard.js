import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Dashboard.module.css";

export default function Dashboard() {
  const logoutHandler = () => {};
  return (
    <>
      <Card className={classes.home}>
        <h1>more stuff</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </Card>
    </>
  );
}
