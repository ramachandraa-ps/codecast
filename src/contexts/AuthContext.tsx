/**
 * Authentication Context
 * 
 * Provides authentication functionality throughout the CodeCast application.
 * This context manages user authentication state, login/logout operations,
 * and user registration. Currently implements a mock authentication system
 * that can be easily replaced with a real backend integration.
 */

import { User } from "@/types";
import { mockUsers } from "@/lib/mock-data";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

/**
 * Authentication Context Type Definition
 * 
 * @property user - Current authenticated user or null if not authenticated
 * @property isAuthenticated - Boolean indicating authentication status
 * @property login - Function to authenticate user with email/password
 * @property logout - Function to sign out the current user
 * @property register - Function to create a new user account
 */
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: "viewer" | "creator") => Promise<void>;
};

// Create the context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * 
 * Wraps the application and provides authentication state and methods
 * to all child components. Handles:
 * - User session persistence via localStorage
 * - Login/Logout operations
 * - User registration
 * - Authentication state management
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to track the current authenticated user
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Derived authentication status
  const isAuthenticated = !!user;

  // Load persisted user session on mount
  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistence)
    const storedUser = localStorage.getItem("codecast-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Authenticate user with email and password
   * 
   * @param email - User's email address
   * @param password - User's password (not used in mock implementation)
   * @throws Error if credentials are invalid
   */
  const login = async (email: string, password: string) => {
    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("codecast-user", JSON.stringify(foundUser));
      toast({
        title: "Welcome back!",
        description: `You are now logged in as ${foundUser.name}`,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  };

  /**
   * Register a new user account
   * 
   * @param name - User's display name
   * @param email - User's email address
   * @param password - User's password (not stored in mock implementation)
   * @param role - User's role (viewer/creator)
   * @throws Error if email is already registered
   */
  const register = async (name: string, email: string, password: string, role: "viewer" | "creator") => {
    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email is already taken
    if (mockUsers.some(u => u.email === email)) {
      throw new Error("Email is already registered");
    }

    // Create new user (in a real app, this would be done on the server)
    const newUser: User = {
      id: `user-${mockUsers.length + 1}`,
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`,
    };

    // Save user and persist session
    setUser(newUser);
    localStorage.setItem("codecast-user", JSON.stringify(newUser));
    
    toast({
      title: "Account created!",
      description: "Your account has been created successfully.",
    });
  };

  /**
   * Sign out the current user
   * Clears the user session from state and localStorage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("codecast-user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context
 * 
 * @returns AuthContextType object containing auth state and methods
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
