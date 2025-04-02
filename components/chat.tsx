"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import Header from "@/components/header";
import { AutoResizeTextarea } from "@/components/autoresize-textarea";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { RefreshCw } from "lucide-react";

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
          className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role=assistant]:self-start data-[role=assistant]:text-white data-[role=user]:self-end"
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
      {error && (
        <div className="mt-4">
          <div className="mb-1.5 text-sm text-red-500">An error occurred.</div>
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

  // status가 "ready"가 되면 textarea에 포커스 설정
  useEffect(() => {
    if (status === "ready") {
      ref.current?.focus();
    }
  }, [status]);

  return (
    <main className="mx-auto flex h-svh w-full flex-col items-stretch border-none">
      <Header />

      {/* Chat messages section */}
      <section className="flex flex-1 content-center justify-center overflow-y-auto px-6">
        <div className="w-full max-w-[35rem]">{messageList}</div>
      </section>

      {/* Input Section */}
      <section className="flex justify-center border-t border-gray-500/40 bg-black">
        <form className="relative mt-2 mb-3 flex w-full max-w-[35rem] items-center rounded-[32px] bg-black px-3 py-1.5">
          <AutoResizeTextarea
            ref={ref}
            onKeyDown={handleKeyDown}
            autoFocus
            handleInputChange={handleInputChange}
            value={input}
            placeholder="message.."
            disabled={status !== "ready"}
            className="flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none"
          />
        </form>
      </section>
    </main>
  );
}
