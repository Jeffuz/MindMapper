"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { firebaseAuth } from "../../utils/firebase";
import Navbar from "@/app/components/navbar";
import CreateCard from "../../components/dashboard/create_card";
import Loading from "@/app/components/loading";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const deckId = params.get("deckId");

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [cards, setCards] = useState<{ term: string; definition: string }[]>(
    []
  );
  const [deckTitle, setDeckTitle] = useState<string>("");

  firebaseAuth.onAuthStateChanged(async (currentUser) => {
    if (user === null) {
      setUser(currentUser);
    }

    if (currentUser === null) router.push("/signin");
    else setIsAuth(true);
  });

  const getUserDeck = async (userId: string) => {
    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(deckId);

    await fetch(`/api/deck/${deckId}`, headers)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.body);
        if (data.body !== undefined) {
          setCards(data.body.cards);
          setDeckTitle(data.body.title);
        }
      })
      .catch((e) => {
        console.log("No Decks Found");
      })
      .finally(() => setIsLoading(false));
  };

  const saveUserDeck = async () => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deckId: deckId,
        cards: cards,
      }),
    };
    console.log(cards);

    await fetch(`/api/deck/${deckId}`, headers)
      .then((response) => {
        if (response.status === 200) {
          router.push("/dashboard");
        }
      })
      .catch((e) => {
        console.log("Could not save deck");
      });
  };

  useEffect(() => {
    // console.log(isAuth, user);

    if (isAuth && user !== null) {
      // console.log("GETTING USER DATA", user);

      getUserDeck(user.uid);
    }
  }, [isAuth]);

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

  if (isLoading) {
    return (
      <div className="bg-teal2 h-screen flex items-center justify-center">
        <div className="fixed w-full top-0">
          <Navbar />
        </div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col bg-teal2/80  min-h-screen">
        <Navbar />

        <div className="flex flex-col m-5 gap-5">
          {/* Bar (title + Save)*/}
          <div className="flex justify-between md:flex-row flex-col gap-3">
            <div className="font-bold md:text-3xl text-2xl">
              Editing the deck&nbsp;<span className="italic">{deckTitle}</span>
            </div>
            <button
              onClick={saveUserDeck}
              className="bg-orange1 hover:bg-orange1/80 text-white lg:px-8 px-6 py-3 transition duration-500 rounded-md shadow-lg"
            >
              Save Edits
            </button>
          </div>
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

          <button
            onClick={saveUserDeck}
            className="font-bold mb-10 w-full flex justify-center items-center py-5 bg-orange1 text-white rounded-lg shadow-lg hover:bg-orange3/80 transition duration-500"
          >
            Save Edits
          </button>
        </div>
      </div>
    </>
  );
}
