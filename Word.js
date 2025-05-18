const { ChatGoogleGenerativeAI } = require("@langchain/llms/google-genai");
const { LLMChain } = require("langchain/chains");
const { PromptTemplate } = require("langchain/prompts");
require("dotenv").config();

// Initialize Gemini 1.5 Flash via LangChain
function getGeminiLLM() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY missing in .env");
  return new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.7, // Slightly higher temperature for more creative words
    maxOutputTokens: 1024,
    googleApiKey: apiKey,
  });
}

// Prompt template for Word of the Day generation
const wordOfDayPrompt = PromptTemplate.fromTemplate(
  `Generate a Word of the Day with the following structure:
  - A somewhat uncommon but interesting English word
  - Its part of speech (noun, verb, adjective, etc.)
  - Its definition
  - An example sentence using the word in context
  
  Format your response as a JSON object with the following structure:
  {
    "word": "the word",
    "partOfSpeech": "part of speech",
    "definition": "definition of the word",
    "example": "example sentence using the word"
  }
  
  Just return the JSON with no additional text.`
);

// Generate Word of the Day
async function getWordOfDay() {
  try {
    const llm = getGeminiLLM();
    const chain = new LLMChain({ llm, prompt: wordOfDayPrompt });
    const result = await chain.call({});

    // Parse the JSON from the result
    let parsedResult;
    try {
      // Find JSON in the response if it's wrapped in text
      const jsonMatch = result.text.match(/(\{[\s\S]*\})/);
      const jsonString = jsonMatch ? jsonMatch[0] : result.text.trim();
      parsedResult = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);

      // If parsing fails, create a fallback response
      return {
        word: "Serendipity",
        partOfSpeech: "noun",
        definition:
          "The occurrence and development of events by chance in a happy or beneficial way",
        example: "The discovery was a perfect example of serendipity",
      };
    }

    return parsedResult;
  } catch (err) {
    console.error("Error getting Word of Day:", err);
    return {
      word: "Ephemeral",
      partOfSpeech: "adjective",
      definition: "Lasting for a very short time",
      example: "The ephemeral beauty of a sunset",
    };
  }
}

// Cache the word of the day so it only changes once per day
let cachedWord = null;
let cacheDate = null;

// Get the Word of the Day, using cache if it's the same day
async function getCachedWordOfDay() {
  const today = new Date().toDateString();

  // If we have a cached word and it's from today, return it
  if (cachedWord && cacheDate === today) {
    return cachedWord;
  }

  // Otherwise, generate a new word
  cachedWord = await getWordOfDay();
  cacheDate = today;
  return cachedWord;
}

// Test the function
getCachedWordOfDay().then((word) => {
  console.log("Word of the Day:", word);
});

module.exports = {
  getGeminiLLM,
  getWordOfDay,
  getCachedWordOfDay,
};
