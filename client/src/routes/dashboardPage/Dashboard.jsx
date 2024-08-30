import React from 'react'
import "../dashboardPage/Dashboard.scss"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (text) => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
    
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userChats'] });
      navigate(`/dashboard/chats/${id}`)
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };

  return (
    <div className='dashboard-contents'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>ChatNEXUS</h1>
        </div>
        <div className="options">

          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>

        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder='Ask me anithing...'/>
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
