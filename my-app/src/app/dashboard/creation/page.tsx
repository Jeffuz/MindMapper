import React from "react";
import Navbar from "@/app/components/navbar";

const creation = () => {
  return (
    <div>
      <Navbar />
      {/* Bar (title + create)*/}
      <div className="flex justify-between">
        <div>Create a new flashcard set</div>
        <button>Create</button>
      </div>
      {/* Title, under is description */}
      <div></div>
      {/* Modal to Generate cards using llm */}
      <div></div>
      {/* Cards */}
      <div></div>
      {/* Add Card */}
      <div></div>
      {/* Create Deck*/}
      <div>
        <button>Create</button>
      </div>
    </div>
  );
};

export default creation;
