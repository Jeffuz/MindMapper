'use client'
import { useState } from 'react';

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  
  const isValidEmail = (emailString:string) => {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g

    if (!regex.test(emailString))
      return false      


    return true
  }

  const isValidPassword = (passString:string) => {
    if (passString.length < 6)
      return false

    return true
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({test: "TEST SDSTRNGr"})
    })
    .then(response => response.json())
    .then(data => console.log(data))

    console.log(isValidEmail(email), isValidPassword(password));
    
    if (!isValidEmail(email)) {
      setError("Input emailed is not valid")
      setIsError(true)
      return
    }
    if (!isValidPassword(password)) {
      setError("Password does not meet criteria")
      setIsError(true)
      return
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match")
      setIsError(true)
      return
    }

    //todo make api call
  }

  return (
    <div className="flex h-screen items-center justify-center bg-teal2">
      <div className="p-5 md:p-10 rounded-md block ml-[10%] mr-[10%] bg-slate-50 drop-shadow-md">
      <h1 className="text-md md:text-2xl">Sign Up</h1>
        <form className="p-2">
          <label for="email" className="lg:text-lg text-sm block">E-Mail</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
          name="email" className="text-[10px] md:text-lg block pl-1 w-full border-[1px] border-orange1 rounded-sm"/>
          <br/>

          <label for="password" className="lg:text-lg text-sm block">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
          name="password" className="text-[10px] md:text-lg block pl-1 w-full rounded-sm border-[1px] border-orange1"/>
          <br/>

          <label for="confirmPassword" className="lg:text-lg text-sm block">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
          name="confirmPassword" className="text-[10px] md:text-lg block pl-1 w-full rounded-sm border-[1px] border-orange1"/>

          <p className='text-[7px] md:text-[15px] mt-2'>Password must be at least 6 characters long</p>
          <br/>
          {isError ? (<p className='text-[7px] md:text-[15px] text-red-500 transition-all duration-200 animate-bounce'>{error}</p>) : null}
          
          <button onClick={handleSubmit} className="w-full lg:text-lg text-sm p-1 rounded-sm bg-orange1 hover:bg-orange3 active:bg-teal1 transition-colors duration-500">Sign Up</button>
        </form>
      </div>

    </div>
  )
}

export default Signup