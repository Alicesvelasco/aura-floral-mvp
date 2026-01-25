import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const getGenAI = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("API Key not found. Running in SIMULATION MODE.");
        return null;
    }
    return new GoogleGenerativeAI(apiKey);
};

export const generateBrandIdentity = async (businessName, sector, description, style, vibe) => {
    const genAI = getGenAI();

    // SIMULATION MODE
    if (!genAI) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Fake delay
        return {
            colors: ["#2A9D8F", "#E9C46A", "#264653"],
            fonts: {
                heading: "Playfair Display",
                body: "Lato"
            },
            logo_svg: `<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'><path d='M250 50 L300 150 L400 150 L320 220 L350 320 L250 260 L150 320 L180 220 L100 150 L200 150 Z' fill='#2A9D8F' opacity='0.8'/><circle cx='250' cy='250' r='100' stroke='#264653' stroke-width='5' fill='none'/></svg>`,
            explanation: `[SIMULACIÓN] Diseño generado localmente para ${businessName}. Estilo ${style} con vibración ${vibe}.`
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
