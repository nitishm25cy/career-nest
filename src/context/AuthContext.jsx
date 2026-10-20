
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Every fresh website visit starts logged out.
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const savedAccount = localStorage.getItem("careerNestUser");

    if (!savedAccount) {
      return {
        success: false,
        message: "No account found. Please sign up first."
      };
    }

    let registeredUser;

    try {
      registeredUser = JSON.parse(savedAccount);
    } catch {
      return {
        success: false,
        message: "Account information is invalid. Please sign up again."
      };
    }

    if (
      registeredUser.email.toLowerCase() === email.trim().toLowerCase() &&
      registeredUser.password === password
    ) {
      setUser({
        name: registeredUser.name,
        email: registeredUser.email
      });

      return { success: true };
    }

    return {
      success: false,
      message: "Invalid email or password."
    };
  };

  const signup = (name, email, password) => {
    const savedAccount = localStorage.getItem("careerNestUser");

    if (savedAccount) {
      try {
        const existingUser = JSON.parse(savedAccount);

        if (
          existingUser.email.toLowerCase() === email.trim().toLowerCase()
        ) {
          return {
            success: false,
            message: "An account with this email already exists."
          };
        }
      } catch {
        // Replace invalid saved account information.
      }
    }

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password
    };

    localStorage.setItem(
      "careerNestUser",
      JSON.stringify(newUser)
    );

    setUser({
      name: newUser.name,
      email: newUser.email
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
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