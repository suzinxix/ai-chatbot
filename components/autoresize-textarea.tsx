"use client";

import { useEffect } from "react";
import type { TextareaHTMLAttributes, RefObject, ChangeEvent } from "react";
import clsx from "clsx";

type AutoResizeTextareaProps = {
  value: string;
  ref?: RefObject<HTMLTextAreaElement | null>;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">;

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
      className={clsx("max-h-20 min-h-2 resize-none", className)}
    />
  );
}
