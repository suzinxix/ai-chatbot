import type { UIMessage } from "ai";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { memo } from "react";
import type { UseChatHelpers } from "@ai-sdk/react";
import { RefreshCw } from "lucide-react";

interface MessagesProps {
  status: UseChatHelpers["status"];
  messages: Array<UIMessage>;
  error: UseChatHelpers["error"];
  reload: UseChatHelpers["reload"];
}

export const Messages = memo(
  function Messages({ status, messages, error, reload }: MessagesProps) {
    const [messagesContainerRef, messagesEndRef] =
      useScrollToBottom<HTMLDivElement>();

    return (
      <div
        ref={messagesContainerRef}
        className="flex h-fit min-h-full flex-col gap-4 pt-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            data-role={message.role}
            className="max-w-[80%] py-2 text-sm data-[role=assistant]:self-start data-[role=assistant]:text-white data-[role=user]:self-end"
          >
            {message.content}
          </div>
        ))}
        {(status === "submitted" || status === "streaming") && (
          <div>
            {status === "submitted" && (
              <div className="text-sm text-gray-400">입력 중..</div>
            )}
          </div>
        )}
        {error && (
          <div className="mt-4">
            <div className="mb-1.5 text-sm text-red-500">
              문제 발생: 다시 시도해봐. 네가 잘못한 건 아니야.
            </div>
            <div className="relative flex items-center gap-1">
              <RefreshCw
                size={14}
                type="button"
                onClick={() => reload()}
                className="peer text-gray-400 hover:text-gray-100"
              />

              <div className="invisible text-sm peer-hover:visible">
                다시 시도하기
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="min-h-0.5" />
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.status === next.status &&
      prev.messages.length === next.messages.length &&
      prev.error === next.error
      // messages deep equality checks
    );
  },
);
