'use client'
import Image from "next/image";
import { useState } from 'react';

export default function Hero() {
  const [email, setEmail] = useState("")
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const [isLoad, setIsLoad] = useState(false)
  
  const isValidEmail = (emailString:string) => {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g

    if (!regex.test(emailString))
      return false      

    return true
  }

  const handleJoinWaitlist = async () => {

    if (!isValidEmail(email)) {
      setError("Input emailed is not valid")
      setIsError(true)
      return
    }

    // API CALL
    setIsLoad(true)
    setIsSuccess(false)
    setIsError(false)

    await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then(response => response.json())
    .then(data => {

      if (!("message" in data)) {
        // Missing Body
        setIsError(true)
        setIsSuccess(false)
        setError("Missing Body Data")
        return
      }


      setIsSuccess(true)
    })
    .finally(() => {
      setIsError(false)
      setIsLoad(false)
      setIsSuccess(true)
    })
    console.log(email)
  }

  return (
    <div className="flex items-center justify-between h-screen bg-teal1">
      {/* Left */}
      <div className="text-white flex flex-col gap-7 lg:ml-28 mx-10 w-full lg:w-[40%]">
        {/* Slogan */}
        <div className="font-bold lg:text-5xl text-4xl">
          Map Your Knowledge, Master Your Mind.
        </div>
        {/* Description */}
        <div className="lg:text-xl text-lg">
          MindMapper is an AI-powered platform that helps you master any
          subject, from vocabulary to history to science. 
        </div>
        <div className="text-md font-lg text-orange1">
          Be the first to know when we launch! Join the waitlist and get early access.
        </div>
        {/* CTA */}
        <div className="flex gap-5 md:flex-row flex-col">
          {/* Add Back after app is realeased */}

          {/* <button className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg">
            Get Started
          </button>
          <button className="bg-white shadow-lg hover:bg-orange3 hover:text-white text-orange1 border border-orange1 lg:px-8 px-6 py-3 transition duration-500 rounded-md">
            Learn More
          </button> */}

          {/* Waitlist */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-gray-900 w-full placeholder-gray-500 focus:outline-none focus:ring-2 shadow-lg focus:ring-orange1 focus:border-transparent rounded-md py-3 px-4 flex"
          />
          <button onClick={handleJoinWaitlist} 
          className="bg-orange1 hover:bg-orange1/80 text-white px-4 py-2 transition duration-500 rounded-md shadow-lg">
            { isLoad ? (<div className="m-auto h-6 w-6 animate-spin rounded-full border-b-2 border-current" />) : (<p>Join&nbsp;Waitlist</p>) }
          </button>

          
        </div>
        <div>
          {isSuccess ? (<p className='text-[10px] md:text-[25px] text-white transition-all duration-200 animate-bounce-short'>
            You have successfully been added to the waitlist
          </p>) : (null)}

          {isError ? (<p className='text-[7px] md:text-[15px] text-red-500 transition-all duration-200 animate-bounce-short'>{error}</p>) : null}
        </div>
      </div>
      {/* Right */}
      <div className="text-white lg:block hidden mx-auto">
        <Image
          src="/hero_logo.png"
          alt="Flashcard App Hero Image"
          width={600}
          height={600}
          style={{ aspectRatio: "600/600", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

