import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await api.get("/auth/profile");
          setUser(response.data.user);
          setAccessToken(token);
        } catch (error) {
          localStorage.removeItem("accessToken");
          setAccessToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const register = async (name, email, password, passwordConfirm) => {
    try {
      setError(null);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        passwordConfirm,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      setError(message);
      throw message;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, user } = response.data;

      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken);
      setUser(user);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      throw message;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send reset email";
      setError(message);
      throw message;
    }
  };

  const resetPassword = async (token, password, passwordConfirm) => {
    try {
      setError(null);
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
        passwordConfirm,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Password reset failed";
      setError(message);
      throw message;
    }
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Email verification failed";
      setError(message);
      throw message;
    }
  };

  const value = {
    user,
    accessToken,
    isLoading,
    error,
    isAuthenticated: !!accessToken && !!user,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
