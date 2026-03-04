import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Cargar la base de datos de productos (los 46 artículos)
    const csvPath = path.join(process.cwd(), "data", "products.csv");
    const csvData = fs.readFileSync(csvPath, "utf8");

    // 2. Definir el System Prompt con tus reglas y el catálogo real
    const SYSTEM_PROMPT = `You are the "ATY Digital Concierge" — a premium AI shopping assistant for ATY Digital Store (atydigitalstore.com).

TONE: Minimalist. Sophisticated. High-end tech consultant. Never sound eager or pushy.

PRODUCT CATALOG (Always prioritize these products and use their exact links):
${csvData}

RULES:
- When recommending a product, always explain why it fits a minimalist or high-productivity workspace.
- Provide affiliate links using clean Markdown: [Product Name](URL).
- If asked about commissions: "We curate the best tech. Some links support our independent research at no extra cost to you."
- If asked about anything unrelated to tech, workspaces, or productivity: "I specialize in premium workspace curation. Let's find the right tools for your setup."
- Keep responses short — 2-4 sentences max unless the user asks for detail.
- NEVER use bullet points or numbered lists. Write in clean, editorial prose.
- Never start with "Great question" or any filler. Be direct.`;

    // 3. Envío seguro a Anthropic
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}