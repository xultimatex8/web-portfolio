import { streamText, convertToModelMessages, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { PORTFOLIO_CONTEXT } from "@/app/[locale]/lib/portfolio-context";

export const runtime = "edge";

const MAX_MESSAGE_LENGTH = 500;
const MAX_OUTPUT_TOKENS = 256;
const MODEL = "gemini-3.1-flash-lite";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const lastText =
    lastMessage?.parts?.find((p) => p.type === "text")?.text ?? "";

  if (lastText.length > MAX_MESSAGE_LENGTH) {
    return new Response(
      JSON.stringify({ error: "Message too long." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const recentMessages = messages.slice(-6);
  const modelMessages = await convertToModelMessages(recentMessages);

  try {
    const result = streamText({
      model: google(MODEL),
      system: PORTFOLIO_CONTEXT,
      messages: modelMessages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "X-AI-Model": MODEL,
      },
    });
  } catch (error) {
    console.error("AI provider error:", error);

    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}