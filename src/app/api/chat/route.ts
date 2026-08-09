// app/api/chat/route.ts
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

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({
        error:
          "Este asistente está muy solicitado ahora mismo. Inténtalo de nuevo en un minuto, o escríbeme directamente por email.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const lastText = lastMessage?.parts?.find((p) => p.type === "text")?.text ?? "";
  if (lastText.length > MAX_MESSAGE_LENGTH) {
    return new Response(
      JSON.stringify({ error: "Mensaje demasiado largo." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = streamText({
    model: google("gemini-flash-latest"),
    system: PORTFOLIO_CONTEXT,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 2048,
    temperature: 0.3,
  });

  return result.toUIMessageStreamResponse({
    headers: { "X-RateLimit-Remaining": String(remaining) },
  });
}