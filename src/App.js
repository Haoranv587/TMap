import React, { Fragment, useState } from 'react';
import Home from './components/Home/Home';
import Header from './components/Layout/Header';
import Login from './components/Login/Login';


function App() {
const [loginModalIsShown, setLoginModal] = useState(false);
  
const showLoginModule = () =>{
  setLoginModal(true)
  }

const hideLoginModule = () =>{
  setLoginModal(false)
}

  return (
    <Fragment>
      {loginModalIsShown && <Login onClose={hideLoginModule}/>}
      <Header onShowLoginModal = {showLoginModule}/>
      <Home />
    </Fragment>
  );
}

export default App;
