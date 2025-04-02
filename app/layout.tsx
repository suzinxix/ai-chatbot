import "./globals.css";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chat",
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
      <body className={clsx("min-h-svh antialiased", inter.className)}>
        {children}
      </body>
    </html>
  );
}
