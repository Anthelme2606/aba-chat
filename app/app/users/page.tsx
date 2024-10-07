"use client";
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../lib/queries';


export default function Users() {
   // console.log('message',GET_USERS);
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    {data?.getUsers?.map(user => (
        <div key={user.id}>
          <h3>{user.username}</h3>
        </div>
      ))}
    </div>
  );
}
