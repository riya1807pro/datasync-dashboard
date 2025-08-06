import {SignIn} from "@clerk/nextjs"

import React from 'react'

const Signin = () => {
  return (
   <SignIn path="/SignIn" routing="path" />
  )
}

export default Signin
