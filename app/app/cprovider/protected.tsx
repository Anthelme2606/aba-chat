"use client"; 
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './authContext';
import ClientProvider from './clientProvider';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth(); 
  const router = useRouter();
   
  useEffect(() => 
    {
  
    if (!token || !user) {
      router.push('/login'); 
    }


    const interval = setInterval(() => {
      if (!token || !user) {
        router.push('/login'); 
      }
    }, 1000); 
    
  
    return () => clearInterval(interval);
  }, [token, user, router]);

 
  const initialAuthData = {
    user: { id: '', username: '' },
    token: '',
  };

  return (
    <ClientProvider authData={initialAuthData}>
      {children}
    </ClientProvider>
  );
};

export default ProtectedRoute;
