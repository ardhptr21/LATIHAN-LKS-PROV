import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const initialUser = {
  auth: false,
  data: null
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  return <AuthContext.Provider value={{ user, setUser, initialUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;