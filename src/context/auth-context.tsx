"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/auth";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("=== AUTH CONTEXT INITIALIZATION ===");
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("accessToken");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);

      console.log("Auth state initialized successfully");
    } catch (error) {
      console.error("Error loading auth data from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    if (!userData.accessToken) {
      console.error("CRITICAL: No accessToken in userData!", userData);
      return;
    }

    setUser(userData);
    setToken(userData.accessToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", userData.accessToken);

    console.log("User logged in successfully:", userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cart");

    console.log("User logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { User } from "@/types/auth";

// type AuthContextType = {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (user: User) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     console.log("=== AUTH CONTEXT INITIALIZATION ===");
//     try {
//       const savedUser = localStorage.getItem("user");
//       const savedToken = localStorage.getItem("accessToken");

//       console.log("Saved User from localStorage:", savedUser);
//       console.log("Saved Token from localStorage:", savedToken);

//       if (savedUser) {
//         const parsedUser = JSON.parse(savedUser);
//         console.log("Parsed User:", parsedUser);
//         setUser(parsedUser);
//       }

//       if (savedToken) {
//         setToken(savedToken);
//       }

//       console.log("Auth state initialized successfully");
//     } catch (error) {
//       console.error("Error loading auth data from localStorage:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const login = (userData: User) => {
//     console.log("=== AUTH CONTEXT LOGIN ===");
//     console.log("User Data received:", userData);
//     console.log("Access Token:", userData.accessToken);

//     if (!userData.accessToken) {
//       console.error("CRITICAL: No accessToken in userData!");
//       console.error("User object keys:", Object.keys(userData));
//       console.error("User object:", JSON.stringify(userData, null, 2));
//     }

//     setUser(userData);
//     setToken(userData.accessToken);

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("accessToken", userData.accessToken);

//     setTimeout(() => {
//       const storedUser = localStorage.getItem("user");
//       const storedToken = localStorage.getItem("accessToken");
//       console.log("localStorage after setting:");
//       console.log("- user:", storedUser);
//       console.log("- accessToken:", storedToken);
//     }, 100);
//   };

//   const logout = () => {
//     console.log("=== AUTH CONTEXT LOGOUT ===");
//     setUser(null);
//     setToken(null);

//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     console.log("User logged out successfully");
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated: !!token,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
//   return ctx;
// };
