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
        // If user is not authenticated, set the user state to null
        setUser(null);
      }
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  // Handle the login action
  const handleLogin = async () => {
    // Sign in with the Google popup provider
    const { user } = await signInWithPopup(auth, provider);
    // Update the user state
    setUser(user);
  };

  // Handle the logout action
  const handleLogout = async () => {
    // Sign out the user
    await signOut(auth);
    // Set the user state to null
    setUser(null);
  };

  // Create the authentication context value
  const authContextValue = {
    user,
    handleLogin,
    handleLogout,
  };

  return (
    // Provide the authentication context value to child components
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
