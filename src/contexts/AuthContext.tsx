import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  selectedLanguage: string;
  selectedTheme: string;
  changeTheme: (theme: string) => void;
  changeLanguage: (lang: string) => void;
  handleChangeCode: (e: any) => void;
  code: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");

  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const login = (userData: User) => {
    // Store user data and authentication status in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove user data and authentication status from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    setUser(null);
    setIsAuthenticated(false);
  };

  const changeTheme = (theme: string) => {
    setSelectedTheme(theme);
  };

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
  };

  const handleChangeCode = (value: any) => {
    setCode(value);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        selectedLanguage,
        selectedTheme,
        changeTheme,
        changeLanguage,
        handleChangeCode,
        code,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
