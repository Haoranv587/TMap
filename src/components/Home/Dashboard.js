import { useAuth } from "../contexts/AuthContext";
import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  async function logoutHandler() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  const updateProfileHandler = () => {
    navigate("/update-profile");
  };
  return (
    <>
      <Card className={classes.home}>
        <h1>Profile</h1>
        {error && <h1>{error}</h1>}
        <strong>Email: </strong> {currentUser.email}
        <Button onClick={updateProfileHandler}>Update Profile</Button>
      </Card>
      <Button onClick={logoutHandler}>Logout</Button>
    </>
  );
}
