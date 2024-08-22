import db from "@/app/utils/firestore";
import { addDoc, collection, query, getDocs, where } from 'firebase/firestore';



export async function POST(request: Request) {  
  const body = await request.json();

  if(!("userId" in body))
    return Response.json({}, {status: 404, statusText: "Body Missing Fields"});
  
  const userId = body.userId

  const collectionRef = collection(db, "cardDecks");

  const q = query(collectionRef, where("associatedUserId", "==", userId));
  try {
    const qSnapshot = await getDocs(q);

    let returnArray = []
    qSnapshot.forEach(deck => {
      let data = deck.data();

      data.id = deck.id;
      returnArray.push(data);
    })    

    return Response.json({body: returnArray}, {status: 200});
  } catch (e) {
    console.log(e);
    
    return Response.json({}, {status: 404, statusText: "Could not get user decks"});
  }

  
}