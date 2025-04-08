"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

type TypewriterTextProps = {
  text: string;
  speed?: number; // 한 글자 당 지연 시간 (밀리초)
  className?: string;
};

export function TypewriterText({
  text,
  speed = 100,
  className,
}: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const intervalID = setInterval(() => {
        setCurrentText((prev) => {
          const nextIndex = prev.length;
          if (nextIndex >= text.length) {
            clearInterval(intervalID);
            return prev;
          }
          return text.slice(0, nextIndex + 1);
        });
      }, speed);
    }, 500); // 0.5초 딜레이

    return () => clearTimeout(timer);
  }, [text, speed]);

  return <div className={clsx("text-sm", className)}>{currentText}</div>;
}
