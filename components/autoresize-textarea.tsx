"use client";

import { memo, useEffect } from "react";
import type { TextareaHTMLAttributes, ChangeEvent, RefObject } from "react";
import clsx from "clsx";

type AutoResizeTextareaProps = {
  value: string;
  ref: RefObject<HTMLTextAreaElement | null>;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">;

export const AutoResizeTextarea = memo(
  function AutoResizeTextarea({
    value,
    handleInputChange,
    className,
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


    console.log("Textarea was rendered at", new Date().toLocaleTimeString());

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
  },
  (prev, next) => {
    return prev.value === next.value && prev.disabled === next.disabled;
  },
);
