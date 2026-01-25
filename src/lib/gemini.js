import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const getGenAI = () => {
    // Safety check for non-Vite environments (e.g. test scripts)
    if (typeof import.meta === 'undefined' || !import.meta.env) return null;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("API Key not found. Running in SIMULATION MODE.");
        return null;
    }
    return new GoogleGenerativeAI(apiKey);
};

export const generateBrandIdentity = async (businessName, sector, description, style, vibe) => {
    // FORCE SIMULATION MODE (Temporarily disabled real API)
    const forceSimulation = true;

    if (forceSimulation) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay

        // Logos disponibles en public/logos
        const localLogos = [
            "/logos/Logo1.svg",
            "/logos/Logo2.svg",
            "/logos/Logo3.svg",
            "/logos/Logo4.svg",
            "/logos/Logo5.svg"
        ];

        // Seleccionar uno al azar
        const randomLogo = localLogos[Math.floor(Math.random() * localLogos.length)];

        return {
            colors: ["#2A9D8F", "#E9C46A", "#264653"],
            fonts: {
                heading: "Playfair Display",
                body: "Lato"
            },
            logo_path: randomLogo,
            logo_svg: null,
            explanation: `Diseño sugerido: Estilo ${style}.`
        };
    }

    const genAI = getGenAI();

    // SIMULATION MODE (Fallback if no API key)
    if (!genAI) {
        // Fallback to the same simulation logic if needed, or keeping the old one for reference
        // but since we forced it above, this is just for safety if forceSimulation is turned off later
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            colors: ["#2A9D8F", "#E9C46A", "#264653"],
            fonts: {
                heading: "Playfair Display",
                body: "Lato"
            },
            logo_path: "/logos/Logo1.svg",
            logo_svg: null,
            explanation: `[SIMULACIÓN] Diseño generado localmente (Fallback).`
        };
    }

    // REAL API MODE
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        Act as a Senior Brand Designer. Create a unique brand identity for a business with the following details:
        - Name: "${businessName}"
        - Sector: "${sector}"
        - Description: "${description}"
        - Style: "${style}"
        - Vibe: "${vibe}"

        You must generate a response in strict JSON format with the following structure:
        {
          "colors": ["#HEX1", "#HEX2", "#HEX3"],
          "fonts": {
            "heading": "Name of a purely free Google Font suitable for headers",
            "body": "Name of a purely free Google Font suitable for body text"
          },
          "logo_svg": "FULL_SVG_CODE_HERE",
          "explanation": "A short, engaging paragraph explaining the design choice (max 30 words)."
        }

        Specific Instructions:
        1. **Colors**: Choose a palette of 3 colors that perfectly matches the '${vibe}' vibe.
        2. **Fonts**: Choose fonts available on Google Fonts that fit the '${style}' style.
        3. **Logo**: Write the full <svg> code for a sophisticated, modern logo. 
           - The SVG must have \`viewBox='0 0 500 500'\`.
           - It should be abstract or symbolic, related to the business name, but MINIMALIST.
           - NO BACKGROUND RECTANGLE. The background must be transparent.
           - Use the generated colors for the SVG paths.
           - Do NOT include the business name text inside the SVG, just the icon/symbol.
           - Ensure the SVG is valid and renderable.
        
        Return ONLY the JSON. Do not include markdown formatting like \`\`\`json.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Cleanup JSON if needed (remove markdown backticks if the model ignores the instruction)
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        throw error;
    }
};
