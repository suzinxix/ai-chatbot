import "./globals.css";
import { Noto_Sans } from "next/font/google";
import clsx from "clsx";

const noto = Noto_Sans({ subsets: ["latin"] });

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
      <body className={clsx("min-h-svh antialiased", noto.className)}>
        {children}
      </body>
    </html>
  );
}
