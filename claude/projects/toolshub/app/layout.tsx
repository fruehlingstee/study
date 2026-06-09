import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: {
    default: "ToolsHub Japan | 厳選ツール紹介・比較",
    template: "%s | ToolsHub Japan",
  },
  description:
    "AI・デザイン・開発・マーケ・動画・生産性ツールを厳選して日本語でレビュー。実際に使ってわかったメリット・デメリット・料金を徹底解説。",
  keywords: ["おすすめツール", "AIツール", "生産性", "副業", "フリーランス", "ツール比較"],
  openGraph: {
    siteName: "ToolsHub Japan",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${noto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto)] bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
