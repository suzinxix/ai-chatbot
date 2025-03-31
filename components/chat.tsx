"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { AutoResizeTextarea } from "@/components/autoresize-textarea";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";

export function Chat() {
  const {
    error,
    input,
    status,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
  } = useChat({
    onFinish(message, { usage, finishReason }) {
      console.log("Usage", usage);
      console.log("FinishReason", finishReason);
    },
    api: "/api/chat",
  });

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim()) return;
      handleSubmit();
    }
  };

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const messageList = (
    <div
      ref={messagesContainerRef}
      className="flex h-fit min-h-full flex-col gap-4 pt-4"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role}
          className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role=assistant]:self-start data-[role=assistant]:bg-gray-100 data-[role=assistant]:text-black data-[role=user]:self-end data-[role=user]:bg-blue-500 data-[role=user]:text-white"
        >
          {message.content}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div>
          {status === "submitted" && (
            <div className="text-sm text-gray-500">입력 중..</div>
          )}
        </div>
      )}

      <div ref={messagesEndRef} className="min-h-0.5" />

      {error && (
        <div className="mt-4">
          <div className="text-red-500">An error occurred.</div>
          <button
            type="button"
            className="mt-4 rounded-md border border-blue-500 px-4 py-2 text-blue-500"
            onClick={() => reload()}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );

  // status가 "ready"가 되면 textarea에 포커스 설정
  useEffect(() => {
    if (status === "ready") {
      ref.current?.focus();
    }
  }, [status]);

  return (
    <main className="mx-auto flex h-svh w-full max-w-[35rem] flex-col items-stretch border-none">
      {/* Chat messages section */}
      <div className="flex-1 content-center overflow-y-auto px-6">
        {messageList}
      </div>

      {/* Input Section */}
      <form className="border-input relative mx-6 mb-6 flex items-center rounded-[16px] border border-gray-200 bg-white px-3 py-1.5">
        <AutoResizeTextarea
          ref={ref}
          onKeyDown={handleKeyDown}
          autoFocus
          handleInputChange={handleInputChange}
          value={input}
          placeholder="Enter a message"
          disabled={status !== "ready"}
          className="flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none"
        />
      </form>
    </main>
  );
}
