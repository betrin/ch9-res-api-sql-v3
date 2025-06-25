import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const cookie = Cookies.get("authedUser");
  const credentialsCookie = Cookies.get("credentials");
  
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
  const [credentials, setCredentials] = useState(credentialsCookie ? JSON.parse(credentialsCookie) : null);
  
  const signIn = async (userCredentials) => {
    // console.log('UserContext - signIn called with:', userCredentials);
    const response = await api('/users', 'GET', null, userCredentials)
    if (response.status === 200) {
      const user = await response.json();
      // console.log('User: ', user);
      setAuthUser(user);
      setCredentials(userCredentials);
      Cookies.set("authedUser", JSON.stringify(user), { expires: 1 });
      Cookies.set("credentials", JSON.stringify(userCredentials), { expires: 1 });
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error("Error with the request");
    }
  };

  const signOut = () => {
    setAuthUser(null);
    setCredentials(null);
    Cookies.remove('authedUser'); 
    Cookies.remove('credentials');
  }

  return (
    <UserContext.Provider value={{
      authUser,
      credentials,
      signIn,
      signOut,
      }}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContext;