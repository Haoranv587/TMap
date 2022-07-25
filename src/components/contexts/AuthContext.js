import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import app from "../../firebase";

const AuthContext = React.createContext();
const authInstance = getAuth(app);
// const user = authInstance.currentUser

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(authInstance, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(authInstance, email, password);
  };

  const logout = () => {
    return signOut(authInstance);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(authInstance, email);
  };

  const updateEmail = (email) => {
    return updateEmail(authInstance.currentUser, email);
  };

  const updatePassword = (password) => {
    return updatePassword(authInstance, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
    //this is going to unsubscribe us from the listener on AuthStateChanged(), when ever we unmount this component
  }, []);
  // dependency is empty so it will run once, this is firebase code, so it will know onAuthStateChanged()

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
