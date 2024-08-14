'use client'

import features from "./features";
import Pricing from "./pricing";
import hero from "./hero";
import Testimony from "./testimony";
import why from "./why";
import React from "react";

export default function Landing() {
  const handleClick = () => {
    window.location="/dashboard"
  }
  return (
    <React.Fragment>
      {/* Slogan */}
      <section>
        <h3>Enhance your learning with the use of flashcards and AI</h3>
        <h3>Begin your journey today</h3>
        <button onClick={handleClick}>Start</button>
      </section>

      <section>
        <Pricing/>
      </section>

      <section>
        <h3>Hear what other users have to say</h3>
        <Testimony/>
      </section>
      
    </React.Fragment>
  )
}