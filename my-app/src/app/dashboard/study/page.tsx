"use client";

import Navbar from "@/app/components/navbar";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "@/app/components/footer";

const Flashcard = ({
  term,
  definition,
  flipped,
  handleFlip,
}: {
  term: string;
  definition: string;
  flipped: boolean;
  handleFlip: () => void;
}) => {
  return (
    <div
      className="w-full bg-white border rounded-lg shadow-lg p-4 cursor-pointer aspect-video md:aspect-[4/2] transition-transform transform overflow-y-auto"
      onClick={handleFlip}
    >
      <div className="flex items-center justify-center h-full p-4">
        <div className="text-center text-gray-700 font-bold text-2xl md:text-3xl">
          {flipped ? definition : term}
        </div>
      </div>
    </div>
  );
};

const flashcards = [
  {
    term: "React",
    definition: "A JavaScript library for building user interfaces.",
  },
  {
    term: "JavaScript",
    definition: "A programming language that is used for web development.",
  },
  {
    term: "CSS",
    definition:
      "A style sheet language used for describing the presentation of a document written in HTML or XML.",
  },
  {
    term: "HTML",
    definition:
      "The standard markup language for creating web pages and web applications.",
  },
  {
    term: "Node.js",
    definition:
      "An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.",
  },
];

const FlashcardsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Prev button for carousel
  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  // Next button for carousel
  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Flip card
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flex flex-col bg-teal2 min-h-screen items-center gap-3">
      <Navbar />
      {/* Title */}
      <div className="text-white text-3xl md:text-4xl font-bold mt-8">
        Put Title State here
      </div>
      {/* Description */}
      <div className="text-white text-center text-md md:text-lg max-w-3xl px-4 mt-4">
        Put Description State here
      </div>
      {/* Carousel */}
      <div className="flex flex-col justify-center items-center relative w-full max-w-4xl p-5">
        <Flashcard
          term={flashcards[currentIndex].term}
          definition={flashcards[currentIndex].definition}
          flipped={flipped}
          handleFlip={handleFlip}
        />
        {/* Button Left */}
        <div className="flex justify-center items-center w-full gap-3 p-3 pt-10">
          <button
            onClick={handlePrev}
            className="bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
          >
            <FaChevronLeft size={24} />
          </button>
          {/* Counter */}
          <div className="text-white text-md md:text-lg font-semibold">
            {currentIndex + 1} / {flashcards.length}
          </div>
          {/* Button Right */}
          <button
            onClick={handleNext}
            className="bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Table for Terms + Definitions */}
      <div className="w-full max-w-4xl p-5">
        <table className="min-w-full shadow-lg">
          {/* Header */}
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-white bg-teal1">Term</th>
              <th className="px-4 py-2 text-left text-white bg-teal1">
                Definition
              </th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {flashcards.map((card, index) => (
              <tr key={index} className="border-t bg-white">
                <td className="px-4 py-2 text-gray-700">{card.term}</td>
                <td className="px-4 py-2 text-gray-700">{card.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default FlashcardsCarousel;
