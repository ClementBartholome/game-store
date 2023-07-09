import { createContext, useEffect, useState } from "react";
import { app } from "../FirebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, update the user state and log the user object
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    // Sign in with the Google popup provider
    const { user } = await signInWithPopup(auth, provider);
    setUser(user);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const authContextValue = {
    user,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
