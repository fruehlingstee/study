import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, getToolBySlug, categories } from "@/lib/tools";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} レビュー・料金・評判`,
    description: `${tool.name}の使い方・料金・口コミを徹底解説。${tool.tagline}`,
  };
}

const badgeColors: Record<string, string> = {
  人気: "bg-rose-100 text-rose-700",
  おすすめ: "bg-blue-100 text-blue-700",
  新着: "bg-green-100 text-green-700",
  高報酬: "bg-amber-100 text-amber-700",
};

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const cat = categories[tool.category];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* パンくず */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600">トップ</Link>
        <span>/</span>
        <Link href={`/category/${tool.category}`} className="hover:text-gray-600">
          {cat.emoji} {cat.label}
        </Link>
        <span>/</span>
        <span className="text-gray-700">{tool.name}</span>
      </nav>

      {/* ヒーロー */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-8">
        <div className={`h-2 w-full bg-gradient-to-r ${tool.color}`} />
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* アイコン */}
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-4xl shadow-md flex-shrink-0`}
            >
              {tool.logoEmoji}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
                {tool.badge && (
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${badgeColors[tool.badge]}`}>
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-700 mb-3 font-medium">{tool.tagline}</p>

              {/* 評価 */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className={`w-5 h-5 ${s <= Math.round(tool.rating) ? "text-amber-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold">{tool.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({tool.reviewCount.toLocaleString()}件の評価)</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  💳 {tool.pricing}
                </span>
                <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {cat.emoji} {cat.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* メインコンテンツ */}
        <div className="md:col-span-2 space-y-6">
          {/* 説明 */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">📋 概要・特徴</h2>
            <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          </section>

          {/* メリット・デメリット */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-5">メリット・デメリット</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-1.5">
                  <span>✅</span> メリット
                </h3>
                <ul className="space-y-2">
                  {tool.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">●</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-rose-700 mb-3 flex items-center gap-1.5">
                  <span>⚠️</span> デメリット
                </h3>
                <ul className="space-y-2">
                  {tool.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-rose-400 mt-0.5 flex-shrink-0">●</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 料金 */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-3">💳 料金プラン</h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 font-medium">{tool.pricing}</p>
              <p className="text-xs text-gray-400 mt-2">
                ※掲載価格は変動する場合があります。最新情報は公式サイトをご確認ください。
              </p>
            </div>
          </section>
        </div>

        {/* サイドバー（CTA） */}
        <div className="space-y-4">
          {/* 公式サイトCTA */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 mx-auto`}
            >
              {tool.logoEmoji}
            </div>
            <h3 className="font-bold text-center mb-1">{tool.name}</h3>
            <p className="text-xs text-gray-500 text-center mb-5">{tool.pricing}</p>

            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`block w-full text-center font-bold py-3 rounded-xl bg-gradient-to-r ${tool.color} text-white hover:opacity-90 transition-opacity mb-3`}
            >
              公式サイトで試す →
            </a>
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              公式サイト（直接）
            </a>

            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              ※上のリンクはアフィリエイトリンクを含む場合があります
            </p>
          </div>

          {/* カテゴリリンク */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="font-semibold text-sm mb-3">同カテゴリのツール</p>
            <Link
              href={`/category/${tool.category}`}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
            >
              {cat.emoji} {cat.label}一覧を見る →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
