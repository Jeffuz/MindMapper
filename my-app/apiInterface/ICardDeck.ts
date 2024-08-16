export interface ICardData {
  term: String,
  definition: String
}

// Id is stored in the firestore file
export interface ICardDeck {
  associatedUserId: String,
  title: String,
  description: String,
  cards: [ICardData]
}