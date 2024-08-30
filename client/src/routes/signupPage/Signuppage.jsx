import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import "../signupPage/Signuppage.scss"

const Signuppage = () => {
  return (
    <div className='signuppage'>
      <SignUp path="/sign-up"  signInUrl='sign-in'/>
    </div>
  )
}

export default Signuppage
