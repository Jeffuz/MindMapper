"use client";

import Navbar from "../components/navbar";
import Deck_card from "../components/dashboard/deck_card";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "../utils/firebase";
import { useState, useEffect } from "react";
import Loading from "../components/loading";

// Type for Deck
type Deck = {
  id: string;
  title: string;
  description: string;
  cards: { term: string; definition: string }[];
};

export default function Dashboard() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const [deck, setDeck] = useState<Deck[]>([]);

  firebaseAuth.onAuthStateChanged(async (currentUser) => {
    if (user === null) {
      setUser(currentUser);
    }

    if (currentUser === null) router.push("/signin");
    else setIsAuth(true);
  });

  const getUserDecks = async (userId: string) => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
    };

    await fetch("/api/deck/getUserDecks", headers)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.body);

        setDeck(data.body);
      })
      .catch((e) => {
        console.log("No Decks Found");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    console.log(isAuth, user);

    if (isAuth && user !== null) {
      console.log("GETTING USER DATA", user);

      getUserDecks(user.uid);
    }
  }, [isAuth]);

  // Create new page
  const handleAddNewDeck = () => {
    setIsNavigating(true);
    router.push("/dashboard/creation");
  };

  if (isLoading || isNavigating) {
    return (
      <div className="bg-teal2 h-screen flex items-center justify-center">
        <div className="fixed w-full top-0">
          <Navbar />
        </div>
        <Loading />
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col h-screen">
          <Navbar />
          {/* Title + Add Deck */}
          <div className="flex md:justify-between md:flex-row md:gap-0 gap-5 flex-col w-full py-12 px-5 md:px-12">
            <div className="text-4xl font-bold text-center">Your Decks</div>
            <div className="flex gap-3">
              <button
                onClick={handleAddNewDeck}
                className="bg-orange1 hover:bg-orange1/80 text-white px-8 w-full md:w-auto py-3 rounded-lg shadow-lg transition duration-500"
              >
                Add New Deck
              </button>
            </div>
          </div>
          {/* Cards */}
          <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 md:p-12 p-5 pt-0 md:pt-0 overflow-y-scroll">
            {deck.map((set, index) => (
              <Deck_card
                id={set.id}
                key={index}
                title={set.title}
                subtitle={set.description}
                amount={set.cards.length}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
