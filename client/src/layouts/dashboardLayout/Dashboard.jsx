import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Chatlist from '../../components/chatList/Chatlist'
import "../dashboardLayout/Dashboard.scss"

const Dashboard = () => {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/sign-in');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) return "Loading...";

  if (!isSignedIn) return null;


  return (
    <div className='dashboard'>
      <div className="menu"><Chatlist/></div>
      <div className="contents">
      <Outlet/>
      </div>
      
    </div>
  )
}

export default Dashboard
