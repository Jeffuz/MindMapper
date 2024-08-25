"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import CreateCard from "@/app/components/dashboard/create_card";
import Modal from "@/app/components/modal";
import { FaRegFilePdf, FaLink, FaTextHeight } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import Link from "next/link";
import { firebaseAuth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { subscriptionType } from "../../utils/subscriptionType";
import { FaExclamationTriangle, FaTimes, FaArrowUp } from "react-icons/fa";

const Creation = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ term: "", definition: "" }]);
  const [tier, setTier] = useState<subscriptionType | null>(null);
  // Modal for non premium users
  const [openUpgradeModal, setOpenUpgradeModal] = useState<boolean>(false);

  // Handle Upload Content click
  const handleUploadContentClick = () => {
    if (tier === subscriptionType.pro) {
      setOpenModal(true);
    } else {
      setOpenUpgradeModal(true);
    }
  };

  // Handle confirm upgrade
  const handleConfirmUpgrade = () => {
    setOpenUpgradeModal(false);
    router.push("/subscribe?subType=Pro");
  };

  // RAG Modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  // GenAI Modal
  const [openGenModal, setOpenGenModal] = useState<boolean>(false);
  const [cardAmount, setCardAmount] = useState(1);
  // Tabs for Rag Modal
  const [activeTab, setActiveTab] = useState("url"); // states for ai gen modal rag implementation

  // Content
  const [url, setUrl] = useState(""); // url state input
  const [pdf, setPdf] = useState<File | null>(null); // Allow the state to hold a File or null
  const [text, setText] = useState(""); // text state input
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Messages for Rag response
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  firebaseAuth.onAuthStateChanged((currentUser) => {
    if (user === null) setUser(currentUser);
  });

  // Grab User Data
  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        try {
          const response = await fetch(`/api/user/${user.uid}`, { method: "GET" });
          const data = await response.json();
          setTier(data.body.tier);
          console.log(tier);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      getUserData();
    }
  }, [user]);

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

  const createNewDeck = async () => {
    if (user === null) router.push("/signin");

    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        cards: cards,
        associatedUserId: user.uid,
      }),
    };
    await fetch("/api/deck", headers)
      .then((response) => {
        if (response.status === 200) router.push("/dashboard");
      })
      .catch((e) => {
        console.log("Error Creating deck");
      });
  };

  const handleAddCards = (
    cardToAddArray: Array<{ term: string; definition: string }>
  ) => {
    // const cardToAdd = {
    //   term: term,
    //   definition: definition
    // };

    setCards(cards.concat(cardToAddArray));
  };

  // Generate cards with AI
  const handleGenerateCards = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/genCards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          cardAmount: cardAmount,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();

      setSuccessMessage("Flashcards generated successfully!");
      setErrorMessage(null);
      setOpenGenModal(false);

      // Add Flashcards to card state
      handleAddCards(result.flashcards);
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage("Failed to generate flashcards. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 8000);
    }
  };

  // Submit Content
  const handleSubmit = async (
    e: FormEvent,
    element: string, // "url", "pdf", "text"
    content: string | File | null // user input or file
  ) => {
    e.preventDefault();
    // No Content
    if (!content) {
      setErrorMessage("No content provided.");
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      let response;
      // Post pdf
      if (element === "pdf") {
        const formData = new FormData();
        formData.append("file", content as File);

        response = await fetch(`/api/rag/pdf`, {
          method: "POST",
          body: formData,
        });
        // Post url or text
      } else {
        response = await fetch(`/api/rag/${element}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [element]: content }),
        });
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      await response.json();

      setSuccessMessage("Content submitted successfully!");
      setErrorMessage(null);
      setOpenModal(false);
      setUrl("");
      setPdf(null);
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
                onChange={(e) => setPdf(e.target.files![0])}
              />
            </div>
            <button
              className="bg-orange1 hover:bg-orange1/80 w-full py-3 shadow-lg rounded-lg text-white transition duration-500"
              onClick={(e) => handleSubmit(e, "pdf", pdf)}
              disabled={isLoading || !pdf}
            >
              {isLoading ? "Processing..." : "Submit PDF"}
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
          <button
            onClick={createNewDeck}
            className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg"
          >
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
          <button
            onClick={() => setOpenGenModal(true)}
            className="bg-white shadow-lg hover:bg-orange3 hover:text-white text-orange1 border border-orange1 lg:px-8 px-6 py-3 transition duration-500 rounded-md"
          >
            Generate with AI
          </button>
          {/* Generate Cards */}
          <Modal open={openGenModal} onClose={() => setOpenGenModal(false)}>
            <div className="flex flex-col justify-center items-center p-5 gap-5 md:w-[500px] w-full">
              {/* Title */}
              <label className="font-bold text-2xl">
                Generate Flashcards with AI
              </label>
              {/* Logo*/}
              <div className="flex justify-center">
                <FaBrain className="text-orange1 text-4xl" />
              </div>
              {/* Info Description */}
              <div className="text-center text-gray-700 text-sm">
                Create flashcards instantly with AI. Free users get 20 cards,
                while Basic and Pro users enjoy unlimited access.
              </div>
              {/* Benefits List */}
              <ul className="list-disc pl-5 text-gray-600 text-sm">
                <li>Fast & Efficient</li>
                <li>Personalized Content</li>
                <li>Unlimited for Premium Users</li>
              </ul>
              {/* Input Card Amount */}
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange1 focus:border-orange1 transition duration-300"
                placeholder={"Enter the number"}
                value={cardAmount}
                onChange={(e) => setCardAmount(Number(e.target.value))}
              />
              {/* Button to submit */}
              <button
                onClick={handleGenerateCards}
                disabled={isLoading}
                className="w-full bg-orange1 hover:bg-orange1/80 text-white py-3 rounded-md shadow-lg transition duration-500"
              >
                {isLoading ? "Generating..." : "Generate Flashcards"}
              </button>
              {/* Upgrade Prompt */}
              <div className="text-center text-gray-500 text-xs">
                Need more flashcards?&nbsp;
                <Link href="/" className="text-orange1 underline">
                  Upgrade to Basic or Pro
                </Link>
                &nbsp;for unlimited access!
              </div>
            </div>
          </Modal>

          {/* Upload content restricted to Pro Users */}
          <button
            onClick={handleUploadContentClick}
            className={`${
              tier === subscriptionType.pro
                ? "bg-white shadow-lg hover:bg-orange3 hover:text-white text-orange1 border border-orange1 lg:px-8 px-6 py-3 transition duration-500 rounded-md"
                : "bg-gray-300 text-gray-500 border border-gray-300 lg:px-8 px-6 py-3 rounded-md cursor-not-allowed"
            }`}
          >
            Upload Content
          </button>

          {/* Upgrade Confirmation Modal */}
          <Modal
            open={openUpgradeModal}
            onClose={() => setOpenUpgradeModal(false)}
          >
            <div className="flex flex-col justify-center items-center p-6 md:w-[500px] w-full">
              {/* Header with Icon */}
              <div className="flex flex-col items-center mb-4">
                <FaExclamationTriangle className="text-orange1 text-4xl" />
                <div className="text-2xl font-bold text-gray-800 mt-2">
                  Upgrade Required
                </div>
              </div>

              {/* Content with Explanation */}
              <div className="mb-4 text-center text-gray-600">
                <div>
                  The feature you&apos;re trying to access is exclusive to Pro
                  users. Unlock advanced features and more by upgrading your
                  account.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 w-full">
                <button
                  onClick={() => setOpenUpgradeModal(false)}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-all duration-300"
                >
                  <FaTimes className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleConfirmUpgrade}
                  className="flex items-center bg-orange1 hover:bg-orange1/80 text-white px-4 py-2 rounded-md transition-all duration-300 shadow-lg"
                >
                  <FaArrowUp className="w-5 h-5 mr-2" />
                  Upgrade
                </button>
              </div>
            </div>
          </Modal>

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
          <button
            onClick={createNewDeck}
            className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creation;
