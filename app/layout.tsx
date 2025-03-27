import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chat",
  description: "AI Chat with OpenAI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={cn("flex min-h-svh flex-col antialiased", inter.className)}
      >
        {children}
      </body>
    </html>
  );
}
