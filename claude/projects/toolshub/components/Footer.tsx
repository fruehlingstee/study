import Link from "next/link";
import { categories } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* ブランド */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 mb-3">
              <span>🛠️</span>
              <span>ToolsHub</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              厳選されたツール紹介で、あなたの仕事・創作・ビジネスを加速する。
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <p className="font-semibold text-gray-900 mb-3 text-sm">カテゴリ</p>
            <ul className="space-y-2">
              {Object.entries(categories).map(([key, cat]) => (
                <li key={key}>
                  <Link
                    href={`/category/${key}`}
                    className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1.5"
                  >
                    <span>{cat.emoji}</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト */}
          <div>
            <p className="font-semibold text-gray-900 mb-3 text-sm">サイト</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-gray-900">トップ</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900">このサイトについて</Link>
              </li>
              <li>
                <Link href="/disclosure" className="hover:text-gray-900">広告表示・免責事項</Link>
              </li>
            </ul>
          </div>

          {/* アフィリエイト開示 */}
          <div>
            <p className="font-semibold text-gray-900 mb-3 text-sm">広告について</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              当サイトの一部リンクはアフィリエイトリンクです。リンクを通じてご購入いただいた場合、当サイトが報酬を受け取る場合があります。掲載内容は独自調査に基づいています。
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ToolsHub Japan. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            掲載価格・スペックは変動する場合があります。最新情報は公式サイトをご確認ください。
          </p>
        </div>
      </div>
    </footer>
  );
}
