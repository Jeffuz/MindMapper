'use client'
import Navbar from "../components/navbar";
import Link from "next/link";
import Deck_card from "../components/dashboard/deck_card";
import { useEffect, useState } from 'react';
import IsUserAuthenticated from "../utils/authenticateUser";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "../utils/firebase";

export default function Dashboard() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // State for decks that user has
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    console.log(firebaseAuth.currentUser);
    
    async function checkUserAuth() {
      const isUserAuth = await IsUserAuthenticated()
      console.log(isUserAuth)
      // if(isUserAuth) {
      //   setIsAuth(true);
      // } 
      // else {
      //   router.push("/signin");
      // }
      setIsLoading(false);
    }
    
    if (!isAuth && !isLoading) {
      setIsLoading(true);
      checkUserAuth();
    }    
  }, []);

  // todo grab user decks
  useEffect(() => {
    if (!isAuth)
      return
    
    // API CALL
  }, [isAuth])

  const getUserDecks = async() => {
    
  }
  const deck = [
    {
      title: "Vocabulary",
      subtitle: "English Vocabulary Words",
      amount: 120,
    },
    {
      title: "Math Formulas",
      subtitle: "Common math formulas",
      amount: 80,
    },
    {
      title: "Biology",
      subtitle: "Key biology concepts",
      amount: 150,
    },
    {
      title: "History",
      subtitle: "Important historical events",
      amount: 100,
    },
    {
      title: "Vocabulary",
      subtitle: "English Vocabulary Words",
      amount: 120,
    },
    {
      title: "Vocabulary",
      subtitle: "English Vocabulary Words",
      amount: 120,
    },
    {
      title: "Math Formulas",
      subtitle: "Common math formulas",
      amount: 80,
    },
    {
      title: "Biology",
      subtitle: "Key biology concepts",
      amount: 150,
    },
    {
      title: "History",
      subtitle: "Important historical events",
      amount: 100,
    },
    {
      title: "Vocabulary",
      subtitle: "English Vocabulary Words",
      amount: 120,
    },
  ];

  if (isLoading) {
    <>
      LOADING
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
                  key={index}
                  title={set.title}
                  subtitle={set.subtitle}
                  amount={set.amount}
                />
              ))}
            </div>
          </div>
        </>
      );
  }
  
};

