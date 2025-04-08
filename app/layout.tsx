import "./globals.css";
import { orbit } from "@/app/font";
import clsx from "clsx";

export const metadata = {
  title: "Nulla",
  description: "AI Chat with OpenAI",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={clsx("min-h-svh antialiased", orbit.className)}>
        {children}
      </body>
    </html>
  );
}
