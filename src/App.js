import React from "react";
import { AuthProvider } from "./components/contexts/AuthContext";
import Home from "./components/Home/Home";
// import Header from "./components/Layout/Header";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Login/Signup";
import Dashboard from "./components/Home/Dashboard";
import PrivateRoute from "./components/Login/PrivateRoute";
import ForgotPassword from "./components/Login/ForgotPassword";
import UpdateProfile from "./components/Login/UpdateProfile";

function App() {
  // const [loginModalIsShown, setLoginModal] = useState(false);

  // const showLoginModule = () => {
  //   setLoginModal(true);
  // };

  // const hideLoginModule = () => {
  //   setLoginModal(false);
  // };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* {loginModalIsShown && <Signup onClose={hideLoginModule} />} */}
        </Routes>
        {/* <Header onShowLoginModal={showLoginModule} />
        <Home /> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
