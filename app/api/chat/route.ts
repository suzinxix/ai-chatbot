import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages, id, system } = await req.json();

  console.log("chat id", id); // can be used for persisting the chat
  console.log(system); // AI system personality

  // Call the language model
  const result = streamText({
    model: openai.responses("gpt-4o"),
    system,
    messages,
    maxTokens: 150,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
