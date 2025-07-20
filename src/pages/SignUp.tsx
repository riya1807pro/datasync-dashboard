import {SignUp} from "@clerk/nextjs"

import React from 'react'

const Signup = () => {
  return (
   <>
      {/* <div className="w-screen h-screen text-4xl text-white bg-red-500"> */}
      <SignUp path="/SignUp" routing="path" onClick={()=>{
        alert("sign up")
      }} />

      {/* </div> */}
   </>
  )
}

export default Signup
