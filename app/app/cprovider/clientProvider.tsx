// ClientProvider.tsx
"use client"; 
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider } from './authContext';

interface ClientProviderProps {
  children: React.ReactNode;
  authData: {
    user: {
      id: string;
      username: string;
    } | null;
    token: string | null;
  };
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children, authData }) => {

  return (
    <AuthProvider initialAuthData={authData}>
      {children}
    </AuthProvider>
  );
};

export default ClientProvider;
