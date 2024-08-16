"use client";
import React, { useState, FormEvent } from "react";
import Navbar from "@/app/components/navbar";
import CreateCard from "@/app/components/dashboard/create_card";
import Modal from "@/app/components/modal";
import { FaRegFilePdf, FaLink, FaTextHeight } from "react-icons/fa";

const Creation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ term: "", definition: "" }]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("url"); // states for ai gen modal rag implementation

  // Content
  const [url, setUrl] = useState(""); // url state input
  const [pdf, setPdf] = useState(""); // pdf state input
  const [text, setText] = useState(""); // text state input
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Messages for Rag response
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // Submit Content
  const handleSubmit = async (
    e: FormEvent,
    element: string, // url, pdf, text
    content: string // user input
  ) => {
    e.preventDefault();
    // Start loading
    setIsLoading(true);

    try {
      const response = await fetch(`/api/rag/${element}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [element]: content }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      await response.json();

      setSuccessMessage("Content submitted successfully!");
      setErrorMessage(null);
      setOpenModal(false);
      setUrl("");
      setPdf("");
      setText("");
    } catch (error) {
      console.error(`Failed to submit ${element}:`, error);
      setSuccessMessage(null);
      setErrorMessage("Failed to submit content. Please try again.");
      setOpenModal(false);
    } finally {
      // Stop loading state
      setIsLoading(false);
      // Remove success or error messages after 8 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 8000);
    }
  };

  // Tab content
  const renderTabContent = () => {
    switch (activeTab) {
      // URL
      case "url":
        return (
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-5">
              <div className="text-xl font-bold">Insert URL</div>
              <input
                type="text"
                placeholder="Enter a URL"
                className="appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-b-2 w-full"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              className="bg-orange1 hover:bg-orange1/80 w-full py-3 shadow-lg rounded-lg text-white transition duration-500"
              onClick={(e) => handleSubmit(e, "url", url)}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit URL"}
            </button>
          </div>
        );
      // PDF
      case "pdf":
        return (
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-5">
              <div className="text-xl font-bold">Upload PDF</div>
              <input
                type="file"
                accept="application/pdf"
                className="appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <button className="bg-orange1 hover:bg-orange1/80 w-full py-3 shadow-lg rounded-lg text-white transition duration-500">
              Submit PDF
            </button>
          </div>
        );
      // Text
      case "text":
        return (
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-5">
              <div className="text-xl font-bold">Insert Text</div>
              <textarea
                placeholder="Enter text"
                className="appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-b-2 w-full"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              onClick={(e) => handleSubmit(e, "text", text)}
              disabled={isLoading}
              className="bg-orange1 hover:bg-orange1/80 w-full py-3 shadow-lg rounded-lg text-white transition duration-500"
            >
              {isLoading ? "Processing..." : "Submit Text"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-teal2/80 min-h-screen">
      <Navbar />
      <div className="flex flex-col gap-5 m-5 bg-teal">
        {/* Success or error message */}
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <div className="font-bold">{successMessage}</div>
          </div>
        )}
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <div className="font-bold">{errorMessage}</div>
          </div>
        )}
        {/* Bar (title + create)*/}
        <div className="flex justify-between md:flex-row flex-col gap-3">
          <div className="font-bold md:text-3xl text-2xl">
            Create a new flashcard set
          </div>
          <button className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg">
            Create
          </button>
        </div>
        {/* Title, under is description */}
        <div className="flex flex-col gap-3">
          {/* Title */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder='Enter a title, like "Calculus 1 - Chapter 5: Derivative as a limit."'
              className="appearance-none py-2 px-3 text-black leading-tight  placeholder-gray-600 focus:outline-none focus:shadow-outline border-b-4 hover:border-b-orange1 focus:border-b-orange1 bg-transparent transition duration-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="tracking-wide">Title</label>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Add a description..."
              className="appearance-none py-2 px-3 text-black leading-tight  placeholder-gray-600 focus:outline-none focus:shadow-outline border-b-4 hover:border-b-orange1 focus:border-b-orange1 bg-transparent transition duration-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="tracking-wide">Description</label>
          </div>
        </div>
        {/* Modal to Generate cards using LLM */}
        <div className="flex gap-5">
          <button className="bg-white shadow-lg hover:bg-orange3 hover:text-white text-orange1 border border-orange1 lg:px-8 px-6 py-3 transition duration-500 rounded-md">
            Generate with AI
          </button>
          {/* Upload content restricted to Pro Users */}
          <button
            onClick={() => setOpenModal(true)}
            className="bg-white shadow-lg hover:bg-orange3 hover:text-white text-orange1 border border-orange1 lg:px-8 px-6 py-3 transition duration-500 rounded-md"
          >
            Upload Content
          </button>
          {/* Rag Implementation */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div className="flex flex-col justify-center items-center p-6 md:w-[500px] aspect-square">
              <div className="mb-5 font-bold text-2xl">Upload Content</div>
              {/* Tabs */}
              <div className="flex overflow-x-auto whitespace-nowrap mb-4 w-full border-b-2">
                {/* Url Tab */}
                <button
                  onClick={() => setActiveTab("url")}
                  className={`inline-flex items-center h-12 px-2 py-2 text-center border-b-0 border-gray-300 sm:px-4 rounded-t-md -px-1 whitespace-nowrap focus:outline-none transition ${
                    activeTab === "url"
                      ? "bg-orange1 text-white"
                      : "text-gray-700 bg-transparent border-b dark:border-gray-500 hover:border-gray-400"
                  }`}
                >
                  <FaLink className="w-4 h-4 mx-1 sm:w-6 sm:h-6" />
                  <span className="mx-1 text-sm sm:text-base">URL</span>
                </button>
                {/* PDF Tab */}
                <button
                  onClick={() => setActiveTab("pdf")}
                  className={`inline-flex items-center h-12 px-2 py-2 text-center border-b-0 border-gray-300 sm:px-4 rounded-t-md -px-1 whitespace-nowrap focus:outline-none transition ${
                    activeTab === "pdf"
                      ? "bg-orange1 text-white"
                      : "text-gray-700 bg-transparent border-b dark:border-gray-500 hover:border-gray-400"
                  }`}
                >
                  <FaRegFilePdf className="w-4 h-4 mx-1 sm:w-6 sm:h-6" />
                  <span className="mx-1 text-sm sm:text-base">PDF</span>
                </button>
                {/* Text Tab */}
                <button
                  onClick={() => setActiveTab("text")}
                  className={`inline-flex items-center h-12 px-2 py-2 text-center border-b-0 border-gray-300 sm:px-4 rounded-t-md -px-1 whitespace-nowrap focus:outline-none transition ${
                    activeTab === "text"
                      ? "bg-orange1 text-white"
                      : "text-gray-700 bg-transparent border-b dark:border-gray-500 hover:border-gray-400"
                  }`}
                >
                  <FaTextHeight className="w-4 h-4 mx-1 sm:w-6 sm:h-6" />
                  <span className="mx-1 text-sm sm:text-base">Text</span>
                </button>
              </div>
              {/* Tab Content */}
              <div className="w-full flex-grow overflow-auto">
                {renderTabContent()}
              </div>
            </div>
          </Modal>
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
          className="font-bold w-full flex justify-center items-center py-5 bg-teal1 text-white rounded-lg shadow-lg hover:bg-teal1/90 transition duration-500"
        >
          + Add Card
        </button>
        {/* Create Deck*/}
        <div className="flex justify-end w-full mb-10">
          <button className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creation;
