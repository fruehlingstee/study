import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { tools, categories, getFeaturedTools, getToolsByCategory } from "@/lib/tools";

export default function HomePage() {
  const featured = getFeaturedTools(6);
  const aiTools = getToolsByCategory("ai");
  const devTools = getToolsByCategory("dev");
  const designTools = getToolsByCategory("design");

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <p className="inline-block text-xs font-semibold tracking-widest uppercase bg-white/20 px-4 py-1.5 rounded-full mb-6">
            厳選 {tools.length}+ ツール掲載中
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            仕事・副業・創作を
            <br />
            <span className="text-yellow-300">最高のツール</span>で加速する
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            AI・デザイン・開発・マーケ・動画まで、実際に使って確かめた本当におすすめのツールだけを紹介。メリット・デメリット・料金を徹底比較。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, cat]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 統計バー */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-indigo-600">{tools.length}+</p>
            <p className="text-xs text-gray-500 mt-0.5">掲載ツール</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-600">6</p>
            <p className="text-xs text-gray-500 mt-0.5">カテゴリ</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-600">毎月更新</p>
            <p className="text-xs text-gray-500 mt-0.5">最新情報</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* カテゴリ一覧 */}
        <section>
          <h2 className="text-2xl font-bold mb-2">カテゴリから探す</h2>
          <p className="text-gray-500 mb-8">目的に合ったカテゴリを選んでください</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categories).map(([key, cat]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="group relative bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md p-6 transition-all"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
                <span className="absolute bottom-4 right-4 text-gray-300 group-hover:text-indigo-400 transition-colors text-lg">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 注目ツール */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">注目のおすすめツール</h2>
          </div>
          <p className="text-gray-500 mb-8">編集部が厳選した今注目のツール</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* AIツール */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">🤖 AIツール特集</h2>
            <Link href="/category/ai" className="text-sm text-indigo-600 hover:underline">
              すべて見る →
            </Link>
          </div>
          <p className="text-gray-500 mb-8">2026年最も注目されているAIツールを徹底比較</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {aiTools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* 開発ツール */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">💻 開発・技術ツール</h2>
            <Link href="/category/dev" className="text-sm text-indigo-600 hover:underline">
              すべて見る →
            </Link>
          </div>
          <p className="text-gray-500 mb-8">エンジニア・個人開発者が実際に使っているツール</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {devTools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* デザインツール */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">🎨 デザインツール</h2>
            <Link href="/category/design" className="text-sm text-indigo-600 hover:underline">
              すべて見る →
            </Link>
          </div>
          <p className="text-gray-500 mb-8">初心者もプロも使えるデザインツール</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {designTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* CTA バナー */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">まだ気になるツールがありますか？</h2>
          <p className="text-white/80 mb-6">カテゴリ別に全ツールを一覧表示しています</p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, cat]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {cat.emoji} {cat.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
