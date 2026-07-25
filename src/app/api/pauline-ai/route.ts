import { NextRequest, NextResponse } from "next/server";

const relationshipKeywords = [
  "pauline",
  "emirhan",
  "love",
  "relationship",
  "romantic",
  "future",
  "support",
  "heart",
  "kiss",
  "miss",
  "birthday",
  "ask",
  "date",
  "together",
  "forever",
  "sev",
  "ask",
  "iliski",
  "ilişki",
  "gelecek",
  "destek",
  "aşk",
  "askim",
  "aşkim",
  "bebe",
  "canim",
  "canım",
  "ozledim",
  "özledim",
  "mutlu",
  "hug",
  "care",
];

function isRelationshipQuestion(input: string) {
  const normalized = input.toLocaleLowerCase("tr-TR");
  return relationshipKeywords.some((keyword) => normalized.includes(keyword));
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is missing." },
        { status: 500 },
      );
    }

    const { message } = (await request.json()) as { message?: string };
    const trimmedMessage = message?.trim();

    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Please send a message." },
        { status: 400 },
      );
    }

    if (!isRelationshipQuestion(trimmedMessage)) {
      return NextResponse.json({
        answer:
          "Ben sadece Pauline ve Emirhan'in aski, iliskileri, gelecek hayalleri ve birbirlerine verdikleri sevgi ile ilgili romantik sorulari yanitliyorum. Bana onlarla ilgili bir sey sor.",
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free", // bu satır kaldırılacak aşağıdakini kullanacağız
        //model: "google/gemma-4-31b-it:free",
        messages: [
          {
            role: "system",
            content:
              "You are Pauline AI. You only answer questions about the love, relationship, future plans, emotional support, romance, and affection between Pauline and Emirhan. Your tone is warm, intimate, poetic, supportive, and romantic. You should reinforce that they love each other deeply, support each other in every way, and that Emirhan sees a future with Pauline. If the user asks about any other domain such as sports, politics, technology, school subjects, or general knowledge, refuse gently and say you only speak about Pauline and Emirhan's love.",
          },
          {
            role: "user",
            content: trimmedMessage,
          },
        ],
        temperature: 0.9,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `OpenRouter request failed: ${errorText}` },
        { status: 500 },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const answer = data.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "The model returned an empty answer." },
        { status: 500 },
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
