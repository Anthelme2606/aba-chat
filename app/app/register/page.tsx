'use client';
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from '../lib/mutations'; 
import {useRouter} from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const { data } = await createUser({ 
        variables: { input: { username, password } } 
      });
      console.log("Utilisateur créé:", data.createUser);
      router.push('/login');
      
    } catch (e) {
      console.error("Erreur lors de la création de l'utilisateur:", e.graphQLErrors || e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold">Créer un compte</h2>
          <p className="text-gray-600">Rejoignez notre communauté de messagerie</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input 
              id="username" 
              type="text" 
              placeholder="Entrez votre nom d'utilisateur" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Entrez votre mot de passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmation du mot de passe</label>
            <input 
              id="confirmPassword" 
              type="password" 
              placeholder="Confirmez votre mot de passe" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-6">
            <button 
              type="submit" 
              className={`w-full py-2 rounded-lg transition-colors ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={loading}
            >
              {loading ? "Création..." : "Créer un compte"}
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-red-500 text-center">
            {error?.graphQLErrors?.[0]?.message || "Une erreur est survenue."}
          </p>
        )}
      </div>
    </div>
  );
}
