import React from 'react'
import { Link } from 'react-router-dom'
import "../chatList/Chatlist.scss"
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

const Chatlist = () => {

  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
  });

  return (
    <div className='chatList'>

      <span className='title'>DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore ChatNEXUS</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className='title2'>RECENT CHATS</span>
      <div className='list'>
        {isPending 
          ? "Loading..." 
          : error 
          ? "Somthing went wrong!" 
          : data?.map((chat) => (
          <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
              {chat.title}
          </Link>
        ))}
      </div>
      <hr />
      <div className='upgrade'>
        <img src="/logo.png" alt="" />
        <div className='texts'>
            <span>Upgrade to ChatNEXUS Pro</span>
            <span>Get unlimted access to all features</span>
        </div>
      </div>
    </div>
  )
}

export default Chatlist
