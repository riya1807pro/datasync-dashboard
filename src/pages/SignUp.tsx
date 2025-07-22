import {SignUp} from "@clerk/nextjs"

import React from 'react'

const Signup = () => {
  return (
   <>
      <SignUp path="/SignUp" routing="path" />

   </>
  )
}

export default Signup
