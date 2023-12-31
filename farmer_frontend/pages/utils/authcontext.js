import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const loginUser = () => {
    setIsLogin(true);
  };
  const validUSer = () => {
    if (isLogin) {
      return true;
    } else {
      return false;
    }
  };
  const logoutUser = () => {
    setIsLogin(false);
  };

  const login = (email, cookie) => {
    setUser({
      email: email,
      cookie: cookie,
    });
  };

  const checkUser = (user) => {
    if (user.email != null && user.cookie != null) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    doSignOut();
  };
  async function doSignOut() {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout/",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        },
      );
      console.log(response);
      setUser(null);
      document.cookie = null;

      router.push("/loginform");
    } catch (error) {
      console.error("error failed: ", error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkUser,
        loginUser,
        logoutUser,
        validUSer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
