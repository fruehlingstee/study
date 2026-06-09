"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/tools";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="text-2xl">🛠️</span>
          <span>ToolsHub</span>
          <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            JP
          </span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-1">
          {Object.entries(categories).map(([key, cat]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* モバイルドロップダウン */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(categories).map(([key, cat]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
