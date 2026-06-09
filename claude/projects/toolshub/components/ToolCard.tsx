import Link from "next/link";
import { Tool } from "@/lib/tools";

const badgeColors: Record<string, string> = {
  人気: "bg-rose-100 text-rose-700",
  おすすめ: "bg-blue-100 text-blue-700",
  新着: "bg-green-100 text-green-700",
  高報酬: "bg-amber-100 text-amber-700",
};

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* カラーバー */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${tool.color}`} />

      <div className="p-5">
        {/* ヘッダー行 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-sm`}
            >
              {tool.logoEmoji}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500">{tool.pricing}</p>
            </div>
          </div>
          {tool.badge && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColors[tool.badge]}`}>
              {tool.badge}
            </span>
          )}
        </div>

        {/* タグライン */}
        <p className="text-sm font-medium text-gray-700 mb-2 leading-snug">{tool.tagline}</p>

        {/* 説明文（2行クリップ） */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-4">{tool.description}</p>

        {/* 評価 */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg
              key={s}
              className={`w-3.5 h-3.5 ${s <= Math.round(tool.rating) ? "text-amber-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">
            {tool.rating.toFixed(1)}（{tool.reviewCount.toLocaleString()}件）
          </span>
        </div>

        {/* CTAボタン */}
        <div className="flex gap-2">
          <span
            className={`flex-1 text-center text-sm font-semibold py-2 rounded-xl bg-gradient-to-r ${tool.color} text-white group-hover:opacity-90 transition-opacity`}
          >
            詳細を見る →
          </span>
        </div>
      </div>
    </Link>
  );
}
