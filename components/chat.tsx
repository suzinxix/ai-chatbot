"use client";

import { useChat } from "@ai-sdk/react";
import { Header } from "@/components/header";
import { AutoResizeTextarea } from "@/components/autoresize-textarea";
import { Messages } from "@/components/messages";
import { useRef, useEffect } from "react";

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
        <div className="w-full max-w-[35rem]">
          <Messages
            status={status}
            messages={messages}
            error={error}
            reload={reload}
          />
        </div>
      </section>

      {/* Input Section */}
      <section className="flex justify-center border-t border-gray-500/40 bg-black px-6">
        <form className="relative mt-2 mb-3 flex w-full max-w-[35rem] items-center rounded-[32px] bg-black py-1.5">
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
