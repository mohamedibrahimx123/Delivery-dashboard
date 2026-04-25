import { authContext } from "./authContext";
import {useCallback, useMemo, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return null
    try {
      return JSON.parse(storedUser)
    } catch {
      localStorage.removeItem("user")
      return null
    }
  })

  const login = useCallback(() => {
    const fakeUser = {
      name:'Mohamed Ebrahim',
      role: 'Admin'
    }
    setUser(fakeUser);

    localStorage.setItem('user',JSON.stringify(fakeUser));
  },[])

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  },[])
  const value = useMemo(() => ({
    user,
    login,
    logout
  }), [user, login, logout]);

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;