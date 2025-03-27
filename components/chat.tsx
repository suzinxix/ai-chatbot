"use client";

import { useChat } from "@ai-sdk/react";
import { AutoResizeTextarea } from "@/components/autoresize-textarea";
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
      handleSubmit();
      // 리렌더 후 포커스가 사라질 수 있으므로, setTimeout을 통해 포커스 재설정
      setTimeout(() => {
        ref.current?.focus();
      }, 100);
    }
  };

  const header = (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
      <h1 className="text-2xl font-semibold leading-none tracking-tight"></h1>
      <p className="text-muted-foreground text-sm"></p>
    </header>
  );

  const messageList = (
    <div className="my-4 flex h-fit min-h-full flex-col gap-4">
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role}
          className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role=assistant]:self-start data-[role=user]:self-end data-[role=assistant]:bg-gray-100 data-[role=user]:bg-blue-500 data-[role=assistant]:text-black data-[role=user]:text-white"
        >
          {message.content}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div className="mt-4 text-gray-500 text-sm">
          {status === "submitted" && <div>쓰는 중..</div>}
        </div>
      )}

      {error && (
        <div className="mt-4">
          <div className="text-red-500">An error occurred.</div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
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
    <main className="mx-auto flex h-svh max-h-svh w-full max-w-[35rem] flex-col items-stretch border-none">
      <div className="flex-1 content-center overflow-y-auto px-6">
        {messages.length ? messageList : header}
      </div>
      <form className="border-input bg-white  relative mx-6 mb-6 flex items-center rounded-[16px] border  border-gray-200 px-3 py-1.5 text-sm ">
        <AutoResizeTextarea
          ref={ref}
          onKeyDown={handleKeyDown}
          autoFocus
          handleInputChange={handleInputChange}
          value={input}
          placeholder="Enter a message"
          disabled={status !== "ready"}
          className="placeholder:text-gray-400 flex-1 bg-transparent focus:outline-none"
        />
      </form>
    </main>
  );
}
