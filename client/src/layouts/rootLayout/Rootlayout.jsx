import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import "../rootLayout/Rootlayout.scss"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient()

const Rootlayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
    <div className='rootlayout'>
      <header>
        <Link to="/" className='logo'>
        <img src="/logo.png" alt="" />
        <span>ChatNEXUS</span>
        </Link>
        <div className="user">
        <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </header>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
    </QueryClientProvider>
    </ClerkProvider>
  );
}

export default Rootlayout
