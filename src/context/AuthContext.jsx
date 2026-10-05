import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("careerNestUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const savedUser = localStorage.getItem("careerNestUser");

    if (!savedUser) {
      return {
        success: false,
        message: "No account found. Please sign up first."
      };
    }

    const registeredUser = JSON.parse(savedUser);

    if (
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      setUser({
        name: registeredUser.name,
        email: registeredUser.email
      });

      return {
        success: true
      };
    }

    return {
      success: false,
      message: "Invalid email or password."
    };
  };

  const signup = (name, email, password) => {
    const existingUser = localStorage.getItem("careerNestUser");

    if (existingUser) {
      const parsedUser = JSON.parse(existingUser);

      if (parsedUser.email === email) {
        return {
          success: false,
          message: "An account with this email already exists."
        };
      }
    }

    const newUser = {
      name,
      email,
      password
    };

    localStorage.setItem(
      "careerNestUser",
      JSON.stringify(newUser)
    );

    setUser({
      name,
      email
    });

    return {
      success: true
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;