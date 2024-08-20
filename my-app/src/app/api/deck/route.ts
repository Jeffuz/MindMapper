import db from "@/app/utils/firestore";
import { addDoc, collection } from "firebase/firestore";
import { ICardDeck } from '../../../../apiInterface/ICardDeck';


// CREATE CARD DECK FROM FOR USER
export async function POST(request: Request) {
  const body = await request.json();
  console.log("called")
  // Verify Body
  if(!("title" in body) || !("description" in body) || !("associatedUserId" in body) || !("cards" in body))
    return Response.json({}, {status: 404, statusText: "Body Missing Fields"});

  const cardDeckToAdd: ICardDeck = {
    associatedUserId: body.associatedUserId,
    title: body.title,
    description: body.description,
    cards: body.cards
  }
  
  const collectionRef = collection(db, "cardDecks");

  try {
    const docRef = await addDoc(collectionRef, cardDeckToAdd);
    console.log("Document written with ID: ", docRef.id);
    return Response.json({body: docRef}, {status: 200});
  }
  catch (e) {
    console.log(e)
    return Response.json({}, {status: 404, statusText: "Error Inserting document"});
  }

}