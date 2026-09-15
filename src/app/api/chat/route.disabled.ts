import { streamText, convertToModelMessages, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { PORTFOLIO_CONTEXT } from "@/app/[locale]/lib/portfolio-context";

export const runtime = "edge";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
});

const MAX_MESSAGE_LENGTH = 500;

const PRIMARY_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_MODEL = "gemini-3.1-flash-lite";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({
        error:
          "This assistant is in high demand right now. Please try again in a minute, or email me directly.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const lastText = lastMessage?.parts?.find((p) => p.type === "text")?.text ?? "";
  if (lastText.length > MAX_MESSAGE_LENGTH) {
    return new Response(
      JSON.stringify({ error: "Message too long." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const modelMessages = await convertToModelMessages(messages);

  try {
    const result = streamText({
      model: google(PRIMARY_MODEL),
      system: PORTFOLIO_CONTEXT,
      messages: modelMessages,
      maxOutputTokens: 2048,
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "X-RateLimit-Remaining": String(remaining),
        "X-AI-Model": PRIMARY_MODEL,
      },
    });
  } catch (error) {
    if (!isRateLimitError(error)) {
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

  try {
    const result = streamText({
      model: google(FALLBACK_MODEL),
      system: PORTFOLIO_CONTEXT,
      messages: modelMessages,
      maxOutputTokens: 2048,
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "X-RateLimit-Remaining": String(remaining),
        "X-AI-Model": FALLBACK_MODEL,
      },
    });
  } catch (error) {
    console.error("AI fallback error:", error);

    return new Response(
      JSON.stringify({
        error:
          "The assistant is temporarily unavailable. Please try again later.",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

function isRateLimitError(error: unknown): boolean {
  if (!error) return false;

  const message =
    error instanceof Error
      ? error.message.toLowerCase()
      : String(error).toLowerCase();

  return (
    message.includes("429") ||
    message.includes("rate limit") ||
    message.includes("rate_limit") ||
    message.includes("quota") ||
    message.includes("too many requests") ||
    message.includes("resource exhausted")
  );
}
