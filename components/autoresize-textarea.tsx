"use client";

import { useEffect, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AutoResizeTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value: string;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function AutoResizeTextarea({
  className,
  value,
  handleInputChange,
  ref,
  ...props
}: AutoResizeTextareaProps) {
  const resizeTextarea = () => {
    const textarea = ref?.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <textarea
      {...props}
      value={value}
      ref={ref}
      rows={1}
      onChange={(e) => {
        handleInputChange(e);
        resizeTextarea();
      }}
      className={cn("max-h-20 min-h-2 resize-none", className)}
    />
  );
}
