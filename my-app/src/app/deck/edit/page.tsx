'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { firebaseAuth } from '../../utils/firebase';
import Navbar from '@/app/components/navbar';
import CreateCard from '../../components/dashboard/create_card';

export default function Page() {

  const router = useRouter();
  const params = useSearchParams()
  const deckId = params.get('deckId');

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  // State for decks that user has
  const [cards, setCards] = useState([]);

  firebaseAuth.onAuthStateChanged(async (currentUser) => {
    if(user === null) {
      setUser(currentUser)
      
    } 
   
    if (currentUser === null)
      router.push("/signin");
    else
      setIsAuth(true);
  });

  const getUserDeck = async(userId: string) => {
    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log(deckId);
    
    
    await fetch(`/api/deck/${deckId}`, headers)
      .then(response => response.json())
      .then(data => {
        console.log(data.body);
        if (data.body !== undefined)
          setCards(data.body.cards)
      })
      .catch(e => {
        console.log("No Decks Found")
      })
      .finally(() => setIsLoading(false));

    

  }
  const saveUserDeck = async() => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        deckId: deckId,
        cards: cards
      })
    }
    console.log(cards);
    
    
    await fetch(`/api/deck/${deckId}`, headers)
      .then(response => {
        if(response.status === 200) {
          router.push("/dashboard")
        }
      })
      .catch(e => {
        console.log("Could not save deck")
      })

    
  }
  useEffect(() => {
    console.log(isAuth, user);
    
    if (isAuth && user !== null) {
      console.log("GETTING USER DATA", user);
      
      getUserDeck(user.uid);
    }
  }, [isAuth])


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
      <div className="flex flex-col h-screen">
        <Navbar/>

        <div className="p-10">
          <h3 className="text-3xl font-bold m-10">Edit Deck</h3>
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
          className="font-bold w-full flex justify-center items-center py-5 bg-orange1 text-white rounded-lg shadow-lg hover:bg-orange3/80 transition duration-500"
        >
          Save Edits
        </button>
        </div>
      </div>
    </>
  )
}