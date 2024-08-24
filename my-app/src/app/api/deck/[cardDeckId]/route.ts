import { doc, getDoc, updateDoc  } from "firebase/firestore";
import { ICardDeck, ICardData } from '../../../../../apiInterface/ICardDeck';
import db from "@/app/utils/firestore";

// GET CARDS BASED on card ID
export async function GET(request: Request, {params}: {params: {cardDeckId: string}}) {
  const cardDeckId = params.cardDeckId;

  const documentRef = doc(db, "cardDecks", cardDeckId);
  const docSnap = await getDoc(documentRef);
  let returnData: ICardDeck

  if (docSnap.exists()) {
    const data = docSnap.data();
    let cardArray:any = []

    // Construct interface objects to make sure return data is what we want
    data.cards.forEach((cardData:any) => {
      const dataToAdd: ICardData = {
        term: cardData.term,
        definition: cardData.definition
      }
      cardArray.push(dataToAdd)
    })


    const returnData: ICardDeck = {
      associatedUserId: data.associatedUserId,
      title: data.title,
      description: data.description,
      cards: cardArray  
    }
    return Response.json({body: returnData}, {status: 200});
  } 
  else {
    return Response.json({message: "Document does not exists"}, {status: 200});
  }
}

// Update Cards stored in DB
export async function POST(request: Request) {
  const body = await request.json();

  if(!("deckId" in body) || !("cards" in body))
    return Response.json({}, {status: 404, statusText: "Body Missing Fields"});
  
  const deckId = body.deckId;

  const documentRef = doc(db, "cardDecks", deckId);

  try {
    await updateDoc(documentRef, {
      cards: body.cards
    })
  } catch (e) {
    return Response.json({}, {status: 404, statusText: "Could not Update user decks"});
  }

  console.log("Updated doc");
  

  return Response.json({}, {status: 200});
}