import { useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const cookie = Cookies.get("authedUser");
  const storedCredentials = sessionStorage.getItem("sessionCredentials");
  
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
  // Store credentials in sessionStorage for persistence across navigation
  const [sessionCredentials, setSessionCredentials] = useState( storedCredentials ? JSON.parse(storedCredentials) : null);
  
  const signIn = async (userCredentials) => {
    // console.log('UserContext - signIn called with:', userCredentials);
    const response = await api('/users', 'GET', null, userCredentials)
    if (response.status === 200) {
      const user = await response.json();
      // console.log('User: ', user);
      setAuthUser(user);
      // Store credentials in sessionStorage
      setSessionCredentials(userCredentials);
      sessionStorage.setItem("sessionCredentials", JSON.stringify(userCredentials));
      Cookies.set("authedUser", JSON.stringify(user), { expires: 1 });
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error("Error with the request");
    }
  };

  // handle the sign out button
  const signOut = () => {
    setAuthUser(null);
    setSessionCredentials(null);
    Cookies.remove('authedUser'); 
    sessionStorage.removeItem("sessionCredentials");
  }

  return (
    <UserContext.Provider value={{
      authUser,
      sessionCredentials,
      signIn,
      signOut,
      }}>
      {children}
    </UserContext.Provider>
  )
}; 