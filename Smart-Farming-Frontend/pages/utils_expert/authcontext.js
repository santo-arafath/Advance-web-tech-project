// utils/authcontext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(/* Initial user data or null */);

 

  const logout = () => {
    // Implement logout logic, clear user data
    // Clear session storage data
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');

    // Clear user data
    setUser(null);
  };

  const checkUser = () => {
    // Implement checkUser logic if needed
    return user;
  };

  const contextValue = {
    user,
  
    logout,
    checkUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
