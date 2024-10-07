'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { User as UserIcon } from 'lucide-react'; // Import the UserIcon from lucide-react
import { GET_USERS } from '../lib/queries';
import { CREATE_CHAT } from '../lib/mutations';
import ProtectedRoute from '../cprovider/protected';

interface User {
  id: string; // ID is still a string, but will be converted to number
  username: string;
}

function adjustColor(baseColor: string, index: number): string {
  let colorInt = parseInt(baseColor.slice(1), 16); 
  colorInt = (colorInt + index * 100) % 0xffffff; 
  return `#${colorInt.toString(16).padStart(6, '0')}`; 
}

function UserCard({ user, onStartChat }: { user: User; onStartChat: (userId: string) => void }) {
  const avatarColor = adjustColor("#214bbb", parseInt(user.id)); // Convert user.id to a number

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm p-4 text-center">
      <div 
        className="w-20 h-20 mx-auto mb-4 flex items-center justify-center" 
        style={{ backgroundColor: avatarColor, borderRadius: '50%' }}
      >
        <UserIcon className="text-white w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{user.username}</h3>
      <button 
        className="w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
        onClick={() => onStartChat(user.id)} 
      >
        Discuter ensemble
      </button>
    </div>
  );
}

export default function Component() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
    
      router.push('/login');
    }
  }, [router]);

  const { loading, error, data } = useQuery(GET_USERS);
  const [createChat] = useMutation(CREATE_CHAT);

  const handleStartChat = async (userId: string) => {
    try {
      const { data: chatData } = await createChat({
        variables: { input: { title: "chat", toId: userId } }, // Pass the userId as toId
      });
      const chatId = chatData.createChat.id; // Get the chat ID from the response
      router.push(`/chat/${chatId}`); // Redirect to the chat room
    } catch (err) {
      console.error('Error creating chat:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ProtectedRoute>
   
  
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Notre Communauté</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.getUsers?.map((user: User) => (
          <UserCard 
            key={user.id} 
            user={user} 
            onStartChat={handleStartChat} // Pass the handler to UserCard
          />
        ))}
      </div>
    </div>
    </ProtectedRoute>
  );
}
