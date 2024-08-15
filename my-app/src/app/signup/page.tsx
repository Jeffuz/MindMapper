'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Navbar from '../components/navbar';
import Link from '../../../node_modules/next/link';
import Footer from '../components/footer';

const Signup = () => {
  const router = useRouter()
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
    setIsError(false)

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

    // API Call
    await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if("error" in data) {
        setIsError(true)
        setError(data.error)
      } else 
        router.push("/signin")
    })
  }

  return (
    <> 
      <Navbar />
      {/* Page Layer */}
      <div className="h-screen flex flex-col justify-between">
        {/* Bg Layer */}
        <div className="bg-teal1 h-full flex items-center justify-center">
          {/* Box */}
          <div className="w-[500px] bg-white max-[500px]:h-full flex flex-col justify-center rounded-md shadow-lg p-10">
            {/* Title */}
            <div className="text-4xl font-bold mb-6">
              Sign up for MindMapper
            </div>
            <form>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="sappearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
              </div>
              <div>
                <p>Password must be at least 6 characters long</p>
                {isError ? (<p className='text-[7px] md:text-[15px] text-red-500 transition-all duration-200 animate-bounce'>{error}</p>) : null}
              </div>
              {/* Button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSubmit}
                  className="bg-orange1 hover:bg-orange2 text-white font-bold w-full py-2 rounded-md shadow-lg transition duration-500"
                >
                  Sign Up
                </button>
              </div>
              {/* Sign in */}
              <div className="text-center mt-4">
                <div className="text-sm text-gray-600">
                  Already have an account?&nbsp;
                  <Link
                    href="/signin"
                    className="text-teal1 hover:text-teal-600"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}


export default Signup