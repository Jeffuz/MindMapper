import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import pc from "../../../utils/pinecone";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    // Retrieve pdf
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // load and extract content
    const loader = new PDFLoader(file);
    const docs = await loader.load();
    console.log("Extracted text from PDF.");

    // Initialize splitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, // max length a chunk
      chunkOverlap: 50, // # of char that overlap between chunks
    });

    // Split extracted content into chunks
    const splitContent = await splitter.splitDocuments(docs);
    console.log("Content split into chunks.");

    // Initialize vector embedding
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPEN_AI_KEY!,
      model: "text-embedding-3-large",
    });

    // Call index for Pinecone
    const index = pc.Index("mindmapper");

    /** 
     * Create embeddings for each chunk
     * vectorContent schema:
      [
        {
          "vector": [...],
          "text": "..."
        },
        ...
      ]
    */

    // Group the vectors
    const vectorContent = await Promise.all(
      splitContent.map(async (doc) => {
        const vectors = await embeddings.embedDocuments([doc.pageContent]);
        return {
          id: uuidv4(),
          values: vectors[0],
          metadata: { text: doc.pageContent },
        };
      })
    );
    console.log("All embeddings created.");

    // Batch upsert
    await index.upsert(vectorContent);
    console.log("Successfully updated to database...");

    return Response.json({
      content: vectorContent,
    });
  } catch (error: any) {
    console.error("Error in POST /api/rag/pdf:", error);
    return Response.json(
      { message: "Failed to process PDF", error: error.message },
      { status: 500 }
    );
  }
}
