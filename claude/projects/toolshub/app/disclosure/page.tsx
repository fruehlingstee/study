import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "広告表示・免責事項",
};

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">広告表示・免責事項</h1>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
        <section>
          <h2 className="text-lg font-bold mb-3">アフィリエイト広告について</h2>
          <p className="leading-relaxed">
            当サイト（ToolsHub Japan）は、Amazon アソシエイト・プログラム、その他各種アフィリエイトプログラムに参加しています。当サイトに掲載されているリンクの一部はアフィリエイトリンクであり、リンクを通じて商品やサービスをご購入いただいた場合、当サイトが成果報酬を受け取ることがあります。
          </p>
          <p className="leading-relaxed mt-3">
            ただし、掲載内容および評価は独自の調査・検証に基づいており、アフィリエイト報酬の有無によって内容を恣意的に変更することはありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3">情報の正確性について</h2>
          <p className="leading-relaxed">
            当サイトに掲載しているツールの料金・仕様・機能は、掲載時点の情報をもとにしています。各サービスの仕様変更・価格改定等により、実際の内容と異なる場合があります。最新・正確な情報については、各ツールの公式サイトをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3">免責事項</h2>
          <p className="leading-relaxed">
            当サイトの情報を利用したことによって生じたいかなる損害についても、当サイトは責任を負いません。ツールの導入・利用は、ご自身の判断と責任においてお願いします。
          </p>
        </section>
      </div>
    </div>
  );
}
