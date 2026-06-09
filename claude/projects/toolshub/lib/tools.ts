export type Category =
  | "ai"
  | "design"
  | "dev"
  | "marketing"
  | "video"
  | "productivity";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: Category;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  pricing: string;
  affiliateUrl: string;
  officialUrl: string;
  badge?: "人気" | "おすすめ" | "新着" | "高報酬";
  rating: number; // 1-5
  reviewCount: number;
  logoEmoji: string;
  color: string; // Tailwind gradient class
}

export const categories: Record<Category, { label: string; emoji: string; description: string }> = {
  ai: {
    label: "AI・自動化",
    emoji: "🤖",
    description: "ChatGPT、Claude など業務を変えるAIツール",
  },
  design: {
    label: "デザイン",
    emoji: "🎨",
    description: "Canva、Figma など誰でもプロ級デザイン",
  },
  dev: {
    label: "開発・技術",
    emoji: "💻",
    description: "Cursor、Vercel など開発者の生産性を爆上げ",
  },
  marketing: {
    label: "マーケ・SEO",
    emoji: "📈",
    description: "Ahrefs、Semrush など集客・分析ツール",
  },
  video: {
    label: "動画・配信",
    emoji: "🎬",
    description: "CapCut、HeyGen などコンテンツ制作ツール",
  },
  productivity: {
    label: "生産性・管理",
    emoji: "⚡",
    description: "Notion、Asana などチームと個人の効率化",
  },
};

export const tools: Tool[] = [
  // ─── AI ───────────────────────────────────────────────────────────
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    slug: "chatgpt",
    category: "ai",
    tagline: "世界最多ユーザーのAIアシスタント",
    description:
      "OpenAI が提供する汎用AIチャット。文章生成・要約・コード・翻訳・分析まで何でもこなす。Plusプランで最新モデル (GPT-4o) が使い放題になり、ビジネス利用の定番に。",
    pros: ["使いやすいチャット UI", "プラグイン・画像生成対応", "世界最大のノウハウ量"],
    cons: ["月額$20（約3,000円）", "日本語精度がClaude等に劣る場合あり"],
    pricing: "無料プランあり / Plus $20/月",
    affiliateUrl: "https://openai.com/chatgpt",
    officialUrl: "https://chat.openai.com",
    badge: "人気",
    rating: 4.8,
    reviewCount: 12400,
    logoEmoji: "💬",
    color: "from-green-400 to-emerald-600",
  },
  {
    id: "claude",
    name: "Claude Pro",
    slug: "claude",
    category: "ai",
    tagline: "長文・コード・分析に強い次世代AI",
    description:
      "Anthropic製AI。長文理解・コード生成・論理的推論で高評価。200K トークンのコンテキストウィンドウが特徴で、書類全体を読み込んで要約・QAができる。",
    pros: ["200Kトークンの超長文対応", "コード・分析精度が高い", "安全設計で誤情報が少ない"],
    cons: ["日本語UIは英語ベース", "画像生成非対応"],
    pricing: "無料プランあり / Pro $20/月",
    affiliateUrl: "https://claude.ai",
    officialUrl: "https://claude.ai",
    badge: "おすすめ",
    rating: 4.7,
    reviewCount: 5800,
    logoEmoji: "🧠",
    color: "from-orange-400 to-amber-600",
  },
  {
    id: "perplexity",
    name: "Perplexity Pro",
    slug: "perplexity",
    category: "ai",
    tagline: "リアルタイム検索 × AI回答の最強コンビ",
    description:
      "ネット検索と AI を融合させた次世代検索エンジン。回答に出典URLが付くため信頼性が高く、リサーチ・調査業務を劇的に効率化。SNSで急速に口コミ拡散中。",
    pros: ["リアルタイムWeb情報を参照", "出典明記で信頼性高", "無料で十分使える"],
    cons: ["深い推論はChatGPT/Claudeに劣る場合あり"],
    pricing: "無料プランあり / Pro $20/月",
    affiliateUrl: "https://perplexity.ai",
    officialUrl: "https://perplexity.ai",
    badge: "新着",
    rating: 4.6,
    reviewCount: 3200,
    logoEmoji: "🔍",
    color: "from-teal-400 to-cyan-600",
  },
  {
    id: "jasper",
    name: "Jasper AI",
    slug: "jasper",
    category: "ai",
    tagline: "マーケター向けAIライティングの定番",
    description:
      "ブログ記事・広告コピー・SNS投稿を一括生成。SEO連携機能や複数言語対応で、コンテンツマーケティング担当者の作業時間を大幅削減。アフィリエイト報酬30%継続が魅力。",
    pros: ["コンテンツ特化の高品質出力", "SEOツール連携", "30%継続アフィリエイト"],
    cons: ["月額が高め（$49〜）", "日本語品質はやや課題"],
    pricing: "Creator $49/月〜",
    affiliateUrl: "https://jasper.ai",
    officialUrl: "https://jasper.ai",
    badge: "高報酬",
    rating: 4.3,
    reviewCount: 2900,
    logoEmoji: "✍️",
    color: "from-violet-400 to-purple-600",
  },

  // ─── Design ───────────────────────────────────────────────────────
  {
    id: "canva",
    name: "Canva Pro",
    slug: "canva",
    category: "design",
    tagline: "デザイン未経験でもプロ品質のビジュアル",
    description:
      "テンプレート豊富なオンラインデザインツール。SNS投稿・資料・動画編集まで対応。Magic Studio（AI背景除去・テキスト→画像）で更に進化。アフィリエイトは最大80%と業界最高水準。",
    pros: ["豊富なテンプレート", "AI機能で作業時間激減", "無料でも十分使える"],
    cons: ["凝ったデザインはFigmaに劣る", "オフライン利用不可"],
    pricing: "無料プランあり / Pro ¥1,500/月〜",
    affiliateUrl: "https://canva.com",
    officialUrl: "https://canva.com",
    badge: "人気",
    rating: 4.8,
    reviewCount: 18700,
    logoEmoji: "🎨",
    color: "from-purple-400 to-pink-600",
  },
  {
    id: "figma",
    name: "Figma",
    slug: "figma",
    category: "design",
    tagline: "UIデザイン・プロトタイプの業界標準",
    description:
      "Web・アプリのUI設計に特化したコラボデザインツール。リアルタイム共同編集・コンポーネント管理・開発者向けCSS出力と、プロダクト開発の全フェーズをカバー。",
    pros: ["リアルタイム共同編集", "コンポーネント管理が強力", "Devモードでエンジニア連携"],
    cons: ["学習コストが高め", "無料プランはプロジェクト数制限あり"],
    pricing: "無料プランあり / Professional $15/月〜",
    affiliateUrl: "https://figma.com",
    officialUrl: "https://figma.com",
    badge: "おすすめ",
    rating: 4.7,
    reviewCount: 9800,
    logoEmoji: "🖊️",
    color: "from-pink-400 to-rose-600",
  },

  // ─── Dev ──────────────────────────────────────────────────────────
  {
    id: "cursor",
    name: "Cursor",
    slug: "cursor",
    category: "dev",
    tagline: "AIネイティブなコードエディタ。開発速度2倍",
    description:
      "VS Code ベースのAI統合エディタ。コードの自然言語指示・バグ修正・リファクタリングをチャット形式で実行。GitHubスターは急上昇中でエンジニアのTwitterで最多言及ツール。",
    pros: ["自然言語でコード編集", "既存VS Code拡張が使える", "コードベース全体を理解"],
    cons: ["Pro $20/月", "大規模プロジェクトで遅延あり"],
    pricing: "無料プランあり / Pro $20/月",
    affiliateUrl: "https://cursor.sh",
    officialUrl: "https://cursor.sh",
    badge: "人気",
    rating: 4.8,
    reviewCount: 7600,
    logoEmoji: "⌨️",
    color: "from-slate-400 to-gray-700",
  },
  {
    id: "vercel",
    name: "Vercel",
    slug: "vercel",
    category: "dev",
    tagline: "フロントエンドデプロイの世界標準",
    description:
      "Next.js の開発元が提供するホスティング。Git連携で自動デプロイ、プレビューURL生成、エッジCDNを無料枠で利用可能。個人開発からスタートアップまで圧倒的シェア。",
    pros: ["Gitpushで自動デプロイ", "無料枠が充実", "エッジCDNで世界最速"],
    cons: ["商用利用は月額$20〜", "サーバーレス関数に制限あり"],
    pricing: "無料プランあり / Pro $20/月",
    affiliateUrl: "https://vercel.com",
    officialUrl: "https://vercel.com",
    badge: "おすすめ",
    rating: 4.7,
    reviewCount: 6200,
    logoEmoji: "▲",
    color: "from-gray-700 to-black",
  },
  {
    id: "supabase",
    name: "Supabase",
    slug: "supabase",
    category: "dev",
    tagline: "Firebase代替のオープンソースBaaS",
    description:
      "PostgreSQLベースのBackend as a Service。認証・DB・ストレージ・リアルタイムをまとめて提供。オープンソースでFirebaseより柔軟性が高く、個人開発者に急速普及。",
    pros: ["PostgreSQL対応で柔軟", "無料枠が広い", "オープンソース"],
    cons: ["Firebaseより設定が複雑", "無料枠に帯域制限あり"],
    pricing: "無料プランあり / Pro $25/月",
    affiliateUrl: "https://supabase.com",
    officialUrl: "https://supabase.com",
    badge: "新着",
    rating: 4.6,
    reviewCount: 4100,
    logoEmoji: "🗄️",
    color: "from-green-500 to-teal-600",
  },
  {
    id: "webflow",
    name: "Webflow",
    slug: "webflow",
    category: "dev",
    tagline: "コードなしでプロ品質のWebサイト構築",
    description:
      "ビジュアルWebビルダーの中で最も高機能。CMS・ECも対応し、デザイナーがコードなしで本番サイトを納品できる。アフィリエイトは初年度50%還元で高収益ポテンシャル。",
    pros: ["デザイン自由度が高い", "CMS機能内蔵", "50%初年度アフィリエイト"],
    cons: ["学習コストが高い", "月額が高め($23〜)"],
    pricing: "無料プランあり / Basic $23/月〜",
    affiliateUrl: "https://webflow.com",
    officialUrl: "https://webflow.com",
    badge: "高報酬",
    rating: 4.5,
    reviewCount: 5300,
    logoEmoji: "🌊",
    color: "from-blue-400 to-indigo-600",
  },

  // ─── Marketing ────────────────────────────────────────────────────
  {
    id: "ahrefs",
    name: "Ahrefs",
    slug: "ahrefs",
    category: "marketing",
    tagline: "SEOプロが愛用するキーワード・競合分析",
    description:
      "バックリンク分析・キーワードリサーチ・競合サイト調査が一つのプラットフォームで完結。SEO担当者やアフィリエイターに絶大な支持を誇る。無料のウェブマスターツールも提供。",
    pros: ["バックリンクDB世界最大規模", "キーワード難易度分析が精緻", "無料ツールが充実"],
    cons: ["月額が高い（$129〜）", "初心者には機能過多"],
    pricing: "Lite $129/月〜",
    affiliateUrl: "https://ahrefs.com",
    officialUrl: "https://ahrefs.com",
    badge: "おすすめ",
    rating: 4.8,
    reviewCount: 8900,
    logoEmoji: "📊",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "systeme",
    name: "Systeme.io",
    slug: "systeme",
    category: "marketing",
    tagline: "60%継続報酬。オールインワンビジネスツール",
    description:
      "ファネル・メルマガ・コース販売・アフィリエイト管理をひとつで完結するプラットフォーム。無料プランが充実し、アフィリエイトは業界最高水準の60%継続報酬。",
    pros: ["60%継続アフィリエイト報酬", "無料で充実した機能", "日本語対応"],
    cons: ["大規模利用はHubSpotに劣る", "デザイン自由度は低め"],
    pricing: "無料プランあり / Startup $27/月〜",
    affiliateUrl: "https://systeme.io",
    officialUrl: "https://systeme.io",
    badge: "高報酬",
    rating: 4.4,
    reviewCount: 3700,
    logoEmoji: "🚀",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "activecampaign",
    name: "ActiveCampaign",
    slug: "activecampaign",
    category: "marketing",
    tagline: "平均紹介報酬$1,300超のメルマガ自動化",
    description:
      "高度なメール自動化・CRM機能を持つマーケティングプラットフォーム。企業向け機能が充実し、アフィリエイターへの平均報酬は$1,300以上と業界随一の高水準。",
    pros: ["メール自動化が業界最高峰", "平均$1,300/件の高報酬", "CRMと一体化"],
    cons: ["月額が高め", "中小企業には機能過多"],
    pricing: "Starter $15/月〜",
    affiliateUrl: "https://activecampaign.com",
    officialUrl: "https://activecampaign.com",
    badge: "高報酬",
    rating: 4.5,
    reviewCount: 4400,
    logoEmoji: "📧",
    color: "from-blue-500 to-cyan-600",
  },

  // ─── Video ────────────────────────────────────────────────────────
  {
    id: "capcut",
    name: "CapCut Pro",
    slug: "capcut",
    category: "video",
    tagline: "TikTok・Reels時代の動画編集アプリ",
    description:
      "スマホ・PCどちらでも使えるショート動画特化編集アプリ。自動字幕・BGM・エフェクトが揃い、初心者でもバズる動画を10分で作れる。無料でも商用利用可能。",
    pros: ["完全無料で高機能", "自動字幕精度が高い", "テンプレが豊富"],
    cons: ["長尺動画編集は不向き", "TikTok社系列でデータ懸念"],
    pricing: "無料 / Pro ¥1,200/月",
    affiliateUrl: "https://capcut.com",
    officialUrl: "https://capcut.com",
    badge: "人気",
    rating: 4.6,
    reviewCount: 11200,
    logoEmoji: "🎬",
    color: "from-black to-gray-700",
  },
  {
    id: "heygen",
    name: "HeyGen",
    slug: "heygen",
    category: "video",
    tagline: "AIアバターで本格的なプロモ動画を自動生成",
    description:
      "テキストを入力するだけでAIアバターが動画を話してくれるサービス。多言語対応で海外向け動画も簡単に制作。企業のマーケ動画・教育コンテンツに急速普及。",
    pros: ["テキスト入力だけで動画完成", "多言語・多アバター対応", "高品質な出力"],
    cons: ["月額が高め（$29〜）", "アバターの動きに不自然さ"],
    pricing: "Free (制限あり) / Creator $29/月〜",
    affiliateUrl: "https://heygen.com",
    officialUrl: "https://heygen.com",
    badge: "新着",
    rating: 4.5,
    reviewCount: 2800,
    logoEmoji: "🎭",
    color: "from-violet-500 to-purple-700",
  },
  {
    id: "descript",
    name: "Descript",
    slug: "descript",
    category: "video",
    tagline: "トランスクリプト編集で動画編集を革新",
    description:
      "音声・動画をテキスト文字起こしし、文字を削除するだけで映像も自動カットできる革命的ツール。ポッドキャスト・YouTube制作者の必須ツールとして定着。",
    pros: ["文字編集=映像編集の直感操作", "文字起こし精度が高い", "ポッドキャスト特化機能"],
    cons: ["日本語精度はまだ発展途上", "クラウド依存"],
    pricing: "無料プランあり / Creator $24/月〜",
    affiliateUrl: "https://descript.com",
    officialUrl: "https://descript.com",
    rating: 4.4,
    reviewCount: 2100,
    logoEmoji: "🎙️",
    color: "from-indigo-400 to-blue-600",
  },

  // ─── Productivity ─────────────────────────────────────────────────
  {
    id: "notion",
    name: "Notion",
    slug: "notion",
    category: "productivity",
    tagline: "メモ・タスク・DB・Wikiを一つに集約",
    description:
      "「第二の脳」として世界的に普及したオールインワン生産性ツール。個人ノートからチームWiki・プロジェクト管理まで対応。AI機能追加で更に進化。50%・180日Cookieのアフィリエイトも魅力。",
    pros: ["自由度の高いDB・テンプレ", "AI機能で検索・要約", "50%・180日Cookie"],
    cons: ["学習コストがやや高い", "オフライン機能が弱い"],
    pricing: "無料プランあり / Plus ¥1,650/月〜",
    affiliateUrl: "https://notion.so",
    officialUrl: "https://notion.so",
    badge: "人気",
    rating: 4.7,
    reviewCount: 14300,
    logoEmoji: "📝",
    color: "from-gray-600 to-gray-900",
  },
  {
    id: "grammarly",
    name: "Grammarly Premium",
    slug: "grammarly",
    category: "productivity",
    tagline: "AI英文校正で文章品質を劇的向上",
    description:
      "英文のスペル・文法・トーン・明瞭さをリアルタイムで改善するAI校正ツール。ブラウザ拡張・MS Word連携で普段の作業に溶け込む。英語でビジネスする人の必須ツール。",
    pros: ["あらゆる場所で使えるブラウザ拡張", "トーン・明瞭さまで提案", "無料で基本校正"],
    cons: ["英文専用（日本語非対応）", "Premiumは月額$30"],
    pricing: "無料プランあり / Premium $30/月",
    affiliateUrl: "https://grammarly.com",
    officialUrl: "https://grammarly.com",
    rating: 4.6,
    reviewCount: 9100,
    logoEmoji: "✅",
    color: "from-green-500 to-emerald-700",
  },
];

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getFeaturedTools(limit = 6): Tool[] {
  return tools.filter((t) => t.badge).slice(0, limit);
}
