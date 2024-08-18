import { doc, getDoc, query, where } from "firebase/firestore";
import { ICardDeck, ICardData } from '../../../../../apiInterface/ICardDeck';
import db from "@/app/utils/firestore";


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