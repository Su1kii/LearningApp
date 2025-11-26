import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Ensure proper API URL format (must end with /api, no trailing slash)
const getApiUrl = (): string => {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  let url = envUrl || "http://localhost:8000/api";

  // Remove ALL trailing slashes
  url = url.replace(/\/+$/, "");

  // If URL doesn't end with /api, add it
  if (!url.endsWith("/api")) {
    // If it's just the base URL, add /api
    if (url.includes("onrender.com") || url.includes("localhost:8000")) {
      url = url + "/api";
    }
  }

  return url;
};

const API_URL = getApiUrl();

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post(`${API_URL}/auth/token`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { access_token, user: userData } = response.data;
    setToken(access_token);
    setUser(userData);
    localStorage.setItem("token", access_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: string
  ) => {
    await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      full_name: fullName,
      role,
    });
    await login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
