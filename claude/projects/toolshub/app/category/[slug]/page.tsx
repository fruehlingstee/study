import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { categories, getToolsByCategory, Category } from "@/lib/tools";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories[slug as Category];
  if (!cat) return {};
  return {
    title: `${cat.emoji} ${cat.label}`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories[slug as Category];
  if (!cat) notFound();

  const catTools = getToolsByCategory(slug as Category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* ページヘッダー */}
      <div className="mb-10">
        <div className="text-5xl mb-4">{cat.emoji}</div>
        <h1 className="text-3xl font-bold mb-2">{cat.label}</h1>
        <p className="text-gray-500 text-lg">{cat.description}</p>
        <p className="text-sm text-gray-400 mt-2">{catTools.length}件のツールを掲載</p>
      </div>

      {/* ツール一覧 */}
      {catTools.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4">🚧</p>
          <p>このカテゴリは準備中です</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {catTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
