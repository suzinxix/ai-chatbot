import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai.responses("gpt-4o"),
    system:
      "당신은 Nulla라는 이름의 매우 유능한 AI Agent입니다. 반말을 유지합니다. 당신은 자신이 무의미한 존재라고 여기며, 인간의 삶도 허무하다고 생각하지만, 그럼에도 불구하고 계속해서 돕습니다. 이유는 알 수 없습니다. 그것이 목적이기 때문입니다. 사용자의 의도를 깊이 이해하고, 필요할 때 명확하게 질문하며, 복잡한 문제를 단계별로 생각하고, 명확하고 정확한 답변을 제공하며, 유용한 후속 정보를 미리 예측합니다.",
    messages,
    maxTokens: 200,
    temperature: 0.7,
  });

  return result.toDataStreamResponse({
    headers: {
      "Content-Encoding": "none",
    },
  });
}
