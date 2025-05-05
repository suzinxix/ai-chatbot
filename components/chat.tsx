"use client";

import { useChat } from "@ai-sdk/react";
import { Header } from "@/components/header";
import { AutoResizeTextarea } from "@/components/autoresize-textarea";
import { Messages } from "@/components/messages";
import { useRef, useEffect, useState } from "react";
import { FileImage } from "lucide-react";
import Image from "next/image";

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

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(files);
  console.log(files?.[0]?.name);

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim()) return;
      handleSubmit(e, {
        experimental_attachments: files,
      });

      setFiles(undefined);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
      <section className="flex flex-col items-center justify-center border-t border-gray-500/40 bg-black px-6">
        <div className="w-full max-w-[35rem]">
          {/* Image Preview */}
          {files?.[0] && (
            <Image
              width={90}
              height={90}
              src={URL.createObjectURL(files?.[0] as Blob)}
              alt="image"
              className="mt-4 rounded-lg"
            />
          )}
          <form className="relative mt-2 mb-3 flex w-full max-w-[35rem] items-center rounded-[32px] bg-black py-1.5">
            <label
              htmlFor="image-input"
              className="absolute top-1/2 left-0 -translate-y-1/2"
            >
              <FileImage className="h-5 w-5 text-gray-400" />
            </label>
            <input
              type="file"
              id="image-input"
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              multiple
              ref={fileInputRef}
            />

            <AutoResizeTextarea
              ref={ref}
              onKeyDown={handleKeyDown}
              autoFocus
              handleInputChange={handleInputChange}
              value={input}
              placeholder="message.."
              disabled={status !== "ready"}
              className="flex-1 bg-transparent pl-8 placeholder:text-gray-400 focus:outline-none"
            />
          </form>
        </div>
      </section>
    </main>
  );
}
