// Web Scraping
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import * as puppeteer from "puppeteer";
// Data Cleaning
import * as cheerio from "cheerio";
// Text Splitting
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
// Vector Embedding
import { OpenAIEmbeddings } from "@langchain/openai";

// imports
import pc from "../../../utils/pinecone";
import { v4 as uuidv4 } from "uuid";

const dataCleanUp = (pageContent: string) => {
  // load html data
  const $ = cheerio.load(pageContent);
  // remove tags
  $("script, style").remove();
  // get clean data
  const cleanedData = $.text();
  // remove white space and ascii
  return cleanedData.replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();
};

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Webscrape website data
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: true,
      },
      async evaluate(page: puppeteer.Page, browser: puppeteer.Browser) {
        try {
          // open link
          await page.goto(url);
          //   return body or empty string
          const textContent = await page.evaluate(() => {
            const bodyElement = document.querySelector("body");
            return bodyElement ? bodyElement.textContent : "";
          });
          //  return content , else empty
          return textContent || "";
        } catch (error) {
          console.error("Error occurred while loading the page: ", error);
          await browser.close();
          return "";
        } finally {
          // close browser
          await browser.close();
        }
      },
    });

    const docs = await loader.load();
    const pageContent = docs[0].pageContent;

    // Data clean up (remove html keep raw data)
    const cleanContent = dataCleanUp(pageContent);

    // Initialize splitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, // max length a chunk
      chunkOverlap: 50, // # of char that overlap between chunks
    });

    // Split cleaned content into chunks based on init
    const splitContent = await splitter.splitDocuments([
      new Document({ pageContent: cleanContent }),
    ]);

    // Initalize vector embedding
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPEN_AI_KEY!,
      model: "text-embedding-3-large",
    });

    // Call index for pinecone
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

    // Batch upsert
    await index.upsert(vectorContent);

    return Response.json({
      message: "Successful",
      content: vectorContent,
    });
  } catch (error: any) {
    console.error("Error in POST /api/rag/url:", error);
    return Response.json(
      { message: "Failed to scrape the website", error: error.message },
      { status: 500 }
    );
  }
}
