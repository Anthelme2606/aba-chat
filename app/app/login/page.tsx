"use client";
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../lib/mutations'; 
import { useRouter } from 'next/navigation';
import { useAuth } from '../cprovider/authContext'; 

export default function Login() {
  const [username, setUsername] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const router = useRouter();
  
  const { user, setAuthData } = useAuth();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { token, user } = data.login; 
      
      // Mise à jour des données d'authentification
      setAuthData((prev) => ({
        ...prev,
        user: user, 
        token: token, 
      }));

      // Redirection vers la communauté
      router.push('/community'); 
    },
  });

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Appel de la mutation de connexion avec le nom d'utilisateur et le mot de passe fournis
      await loginUser({ variables: { loginData: { username, password } } });
    } catch (error) {
      console.error('Login error', error);
    }
  };

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    if (user) {
      router.push('/community'); 
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Connexion</h2>
        <p className="text-center mb-4">Connectez-vous à votre compte</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                placeholder="Entrez votre nom d'utilisateur"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                placeholder="Entrez votre mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-4">
              Une erreur s'est produite: {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
