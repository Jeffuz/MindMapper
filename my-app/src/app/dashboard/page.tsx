'use client'
import Navbar from "../components/navbar";
import Link from "next/link";
import Deck_card from "../components/dashboard/deck_card";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "../utils/firebase";
import { setCurrentScreen } from "firebase/analytics";
import { useState, useEffect } from 'react';

export default function Dashboard() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  // State for decks that user has
  const [deck, setDeck] = useState([]);

  firebaseAuth.onAuthStateChanged(async (currentUser) => {
    if(user === null) {
      setUser(currentUser)
      
    } 
   
    if (currentUser === null)
      router.push("/signin");
    else
      setIsAuth(true);
  });

  const getUserDecks = async(userId: string) => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId
      })
    }

    await fetch("/api/deck/getUserDecks", headers)
      .then(response => response.json())
      .then(data => {
        console.log(data.body);
        
        setDeck(data.body)
      })
      .catch(e => {
        console.log("No Decks Found")
      })
      .finally(() => setIsLoading(false));

    

  }

  useEffect(() => {
    console.log(isAuth, user);
    
    if (isAuth && user !== null) {
      console.log("GETTING USER DATA", user);
      
      getUserDecks(user.uid);
    }
  }, [isAuth])
  // const deck = [
  //   {
  //     title: "Vocabulary",
  //     subtitle: "English Vocabulary Words",
  //     amount: 120,
  //   },
  //   {
  //     title: "Math Formulas",
  //     subtitle: "Common math formulas",
  //     amount: 80,
  //   },
  //   {
  //     title: "Biology",
  //     subtitle: "Key biology concepts",
  //     amount: 150,
  //   },
  //   {
  //     title: "History",
  //     subtitle: "Important historical events",
  //     amount: 100,
  //   },
  //   {
  //     title: "Vocabulary",
  //     subtitle: "English Vocabulary Words",
  //     amount: 120,
  //   },
  //   {
  //     title: "Vocabulary",
  //     subtitle: "English Vocabulary Words",
  //     amount: 120,
  //   },
  //   {
  //     title: "Math Formulas",
  //     subtitle: "Common math formulas",
  //     amount: 80,
  //   },
  //   {
  //     title: "Biology",
  //     subtitle: "Key biology concepts",
  //     amount: 150,
  //   },
  //   {
  //     title: "History",
  //     subtitle: "Important historical events",
  //     amount: 100,
  //   },
  //   {
  //     title: "Vocabulary",
  //     subtitle: "English Vocabulary Words",
  //     amount: 120,
  //   },
  // ];

  if (isLoading) {
    <>
      <p>LOADING</p>
    </>
  } else {
      return (
        <>
          <div className="flex flex-col h-screen">
            <Navbar />
            {/* Title + Add Deck */}
            <div className="flex md:justify-between md:flex-row md:gap-0 gap-5 flex-col w-full p-12">
              <div className="text-4xl font-bold text-center">Your Decks</div>
              <div className="flex gap-3">
                {/* Uncomment went analytics are avaliable */}
                {/* <button className="bg-teal2 hover:bg-teal2/80 text-white px-8 py-3 rounded-lg shadow-lg transition duration-500">
                  View Analytics
                </button> */}
                <button className="bg-orange1 hover:bg-orange1/80 text-white px-8 py-3 rounded-lg shadow-lg transition duration-500">
                  <Link href={"/dashboard/creation"}>Add New Deck</Link>
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
  
};

