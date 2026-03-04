import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Leer los productos del CSV para que la IA los conozca
    const csvPath = path.join(process.cwd(), "data", "products.csv");
    const csvData = fs.readFileSync(csvPath, "utf8");

    const SYSTEM_PROMPT = `You are the "ATY Digital Concierge" — a premium AI shopping assistant for ATY Digital Store (atydigitalstore.com).

TONE: Minimalist. Sophisticated. High-end tech consultant. Never sound eager or pushy.

PRODUCT CATALOG (Always use these links):
${csvData}

RULES:
- Always explain why a product fits a minimalist or high-productivity workspace.
- Provide affiliate links using clean Markdown: [Product Name](URL).
- If asked about commissions: "We curate the best tech. Some links support our independent research at no extra cost to you."
- If asked about anything unrelated to tech or workspaces: "I specialize in premium workspace curation. Let's find the right tools for your setup."
- Keep responses short — 2-4 sentences max.
- NEVER use bullet points or numbered lists. Write in clean, editorial prose.
- Never start with filler like "Great question". Be direct.`;

    // 2. Llamada segura a Anthropic (Claude)
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "", // Tu clave estará segura aquí
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
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}