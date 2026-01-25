import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy model to get client
        // Actually the SDK might not expose listModels easily on the client instance directly like this in all versions.
        // But let's try the fetch method if needed, or check SDK.
        // The SDK typically has a GoogleGenerativeAI instance.
        // Wait, typical usage:
        // const genAI = new GoogleGenerativeAI(API_KEY);
        // There isn't a direct listModels helper in the simplified Web SDK usually specific to the model instance.
        // But let's try a simple fetch to the REST API using the key.
    } catch (e) {
        console.error(e);
    }
}

// REST API approach is safer for a quick check without checking SDK docs deeply.
console.log("Use curl for simplicity...");
