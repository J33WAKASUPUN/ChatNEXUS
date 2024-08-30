import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './routes/homePage/Homepage'
import Dashboardpage from './routes/dashboardPage/Dashboard'
import Chatpage from './routes/chatPage/Chatpage'
import Rootlayout from './layouts/rootLayout/Rootlayout'
import Dashboardlayout from './layouts/dashboardLayout/Dashboard'
import Signinpage from './routes/signinPage/Signinpage'
import Signuppage from './routes/signupPage/Signuppage'
import { ClerkProvider } from '@clerk/clerk-react';


const router = createBrowserRouter([
  {
   element: <Rootlayout/>,
   children:[
    {
      path: "/",
      element: <Homepage/>,
    },
    {
      path:"/sign-in/*",
      element: <Signinpage/>,
    },
    {
      path:"/sign-up/*",
      element: <Signuppage/>,
    },
    {
      element:<Dashboardlayout/>,
      children:[
        {
          path:"/dashboard",
          element:<Dashboardpage/>,
        },
        {
          path:"/dashboard/chats/:id",
          element:<Chatpage/>,
        }
      ]
    },
   ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={clerkPubKey}>
//       <App />
//     </ClerkProvider>
//   </React.StrictMode>
// );
