import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/Firebase.config";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  //create user........................
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login............................
  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login...........

  const GoogleLogin = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //state change...................
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
      setloading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //logout..............
  const logOut = async () => {
    setloading(true);
    return signOut(auth);
  };
  //profile update
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  const sendPassResetEmailFunc = (email) => {
    setloading(true);
    return sendPasswordResetEmail(auth, email);
  };
  //object...............
  const authData = {
    createUser,
    Login,
    loading,
    GoogleLogin,
    setloading,
    user,
    setuser,
    logOut,
    updateUser,
    sendPassResetEmailFunc,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
