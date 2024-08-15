"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/navbar";
import CreateCard from "@/app/components/dashboard/create_card";

const Creation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ term: "", definition: "" }]);

  // Add Card
  const handleAddCard = () => {
    setCards([...cards, { term: "", definition: "" }]);
  };

  // Change Term for card
  const handleTermChange = (index: number, term: string) => {
    const newCards = [...cards];
    newCards[index].term = term;
    setCards(newCards);
  };

  // Change Definition for card
  const handleDefinitionChange = (index: number, definition: string) => {
    const newCards = [...cards];
    newCards[index].definition = definition;
    setCards(newCards);
  };

  // Delete Card
  const handleDeleteCard = (index: number) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 m-5">
        {/* Bar (title + create)*/}
        <div className="flex justify-between md:flex-row flex-col gap-3">
          <div className="font-bold text-2xl">Create a new flashcard set</div>
          <button className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg">
            Create
          </button>
        </div>
        {/* Title, under is description */}
        <div className="flex flex-col">
          {/* Title */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder='Enter a title, like "Calculus 1 - Chapter 5: Derivative as a limit."'
              className="appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-b-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Title</label>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Add a description..."
              className="appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-b-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
        </div>
        {/* Modal to Generate cards using LLM */}
        <div className="flex">
          <button className="bg-white shadow-lg hover:bg-orange3 hover:text-white text-orange1 border border-orange1 lg:px-8 px-6 py-3 transition duration-500 rounded-md">
            Generate with AI
          </button>
        </div>
        {/* Display Cards */}
        <div>
          {cards.map((card, index) => (
            <CreateCard
              key={index}
              index={index}
              term={card.term}
              definition={card.definition}
              handleTermChange={handleTermChange}
              handleDefinitionChange={handleDefinitionChange}
              handleDeleteCard={handleDeleteCard}
            />
          ))}
        </div>
        {/* Add Card */}
        <button
          onClick={handleAddCard}
          className="w-full flex justify-center items-center py-5 bg-teal1 text-white rounded-lg shadow-lg hover:bg-teal1/90 transition duration-500"
        >
          + Add Card
        </button>
        {/* Create Deck*/}
        <div className="flex justify-end w-full">
          <button className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg">
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default Creation;
