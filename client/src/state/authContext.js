import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context with a default value
const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          throw new Error("Failed to fetch auth user");
        }
        const data = await res.json();
        setAuthUser(data);
      } catch (error) {
        console.log("Error fetching auth user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
