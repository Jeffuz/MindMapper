"use client";

import Navbar from "@/app/components/navbar";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
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

const FlashcardsCarousel = () => {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("id");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the deck data from the database
  useEffect(() => {
    const fetchDeckData = async () => {
      if (deckId) {
        try {
          const response = await fetch(`/api/deck/${deckId}`);
          const data = await response.json();
          setDeck(data.body);
        } catch (error) {
          console.error("Failed to fetch deck data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDeckData();
  }, [deckId]);

  // Prev button for carousel
  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? deck.cards.length - 1 : prevIndex - 1
    );
  };

  // Next button for carousel
  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === deck.cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Flip card
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!deck) {
    return <div>Deck Not Found...</div>;
  }

  return (
    <div className="flex flex-col bg-teal2 min-h-screen items-center gap-3">
      <Navbar />
      {/* Title */}
      <div className="text-white text-3xl md:text-4xl font-bold mt-8">
        {deck.title}
      </div>
      {/* Description */}
      <div className="text-white text-center text-md md:text-lg max-w-3xl px-4 mt-4">
        {deck.description}
      </div>
      {/* Carousel */}
      <div className="flex flex-col justify-center items-center relative w-full max-w-4xl p-5">
        <Flashcard
          term={deck.cards[currentIndex].term}
          definition={deck.cards[currentIndex].definition}
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
            {currentIndex + 1} / {deck.cards.length}
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
            {deck.cards.map((card: any, index: number) => (
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
