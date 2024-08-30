import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import "../signinPage/Signinpage.scss"

const Signinpage = () => {
  return (
    <div className='signinpage'>
      <SignIn path="/sign-in" signUpUrl='sign-up'/>
    </div>
  )
}

export default Signinpage
