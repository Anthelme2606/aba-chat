// authContext.ts
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setAuthData: (authData: { user: User | null; token: string | null }) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ initialAuthData: { user: User | null; token: string | null }; children: React.ReactNode; }> = ({ initialAuthData, children }) => {
  const [authData, setAuthData] = useState<{ user: User | null; token: string | null }>(initialAuthData);

  return (
    <AuthContext.Provider value={{ 
      user: authData.user, 
      token: authData.token, 
      setAuthData: (data) => setAuthData(data) 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
