import { OpenAIEmbeddings } from "@langchain/openai";
import pc from "@/app/utils/pinecone";
import openai from "@/app/utils/openai";

// query db based on user message
async function queryIndex(query: string) {
  // init embeddings
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPEN_AI_KEY!,
    model: "text-embedding-3-large",
  });

  // query on index
  const queryEmbedding = await embeddings.embedQuery(query);
  const index = pc.Index("ai-customer-support");
  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 8,
    includeMetadata: true,
  });

  // return data
  return queryResponse;
}

// check relevence with llm
async function determineRelevance(context: string, userContent: string) {
  const relevanceCheck = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI that checks the relevance of information to a given query.",
      },
      {
        role: "user",
        content: `Does the following context match the query? If it is relevant, respond with 'relevant'. If not, respond with 'irrelevant'.\n\nContext: ${context}\n\nQuery: ${userContent}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const relevanceResult =
    relevanceCheck.choices[0]?.message?.content?.trim().toLowerCase() ||
    "irrelevant";

  return relevanceResult === "relevant";
}

export async function POST(request: Request) {
  try {
    // Info
    const { title, description, cardAmount } = await request.json();
    const userContent = `${title}\n${description}`;

    // Query Pinecone for relevant information
    const pineconeQuery = await queryIndex(userContent);

    // create single string of relevant data (combine data)
    const relevantInfo = pineconeQuery.matches
      .map((match) => match.metadata?.text)
      .join(" ");

    // check relevance
    const isRelevant = await determineRelevance(relevantInfo, userContent);

    // Choose the context based on relevance
    const context = isRelevant
      ? relevantInfo
      : `The information from the database is not relevant to the query. Please generate flashcards based on the following content: ${userContent}`;

    // gpt 3 turbo for free, basic and pro use gpt-4o-mini
    const model = "gpt-4o-mini";

    // LLM generates flashcards
    const apiResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI specialized in generating flashcards for learning.",
        },
        {
          role: "user",
          content: `Context: ${context}\n\nBased on this, generate ${cardAmount} flashcards in JSON array format, each containing a 'term' and 'definition'.`,
        },
      ],
      model: model,
    });

    // response
    const responseMessage =
      apiResponse.choices[0]?.message?.content || "No response generated.";

    console.log("Flashcards Generated:", responseMessage);

    return new Response(
      JSON.stringify({
        success: true,
        flashcards: responseMessage,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error generating flashcards:", error);
    return new Response(
      JSON.stringify({
        success: false,
        reason: "Error generating flashcards",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
