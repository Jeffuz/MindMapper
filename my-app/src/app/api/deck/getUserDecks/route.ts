import db from "@/app/utils/firestore";
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { ICardDeck } from '../../../../apiInterface/ICardDeck';



export async function POST(request: Request) {  
  const body = await request.json();

  if(!("userId" in body))
    return Response.json({}, {status: 404, statusText: "Body Missing Fields"});
  

  const collectionRef = collection(db, "cardDecks");

  const q = query(collectionRef);
  try {
    const qSnapshot = await getDocs(q);

    let returnArray = []
    qSnapshot.forEach(deck => {
      const data = deck.data();

      returnArray.push(data)
    })    

    return Response.json({body: returnArray}, {status: 200});
  } catch (e) {
    return Response.json({}, {status: 404, statusText: "Could not get user decks"});
  }

  
}