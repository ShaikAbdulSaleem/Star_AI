import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // On first load, try to fetch current user if token exists
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setInitializing(false);
      return;
    }
    (async () => {
      try {
        const { data } = await userApi.me();
        setUser(data);
      } catch {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    localStorage.setItem("accessToken", data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await authApi.register(payload);
    localStorage.setItem("accessToken", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const value = {
    user,
    initializing,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

