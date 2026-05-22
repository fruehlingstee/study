# Claude 基本メモ

## モデル一覧 (2025年時点)

| モデル | 用途 |
|-------|------|
| claude-opus-4-7 | 最高性能・複雑なタスク |
| claude-sonnet-4-6 | バランス型・汎用 |
| claude-haiku-4-5 | 高速・軽量タスク |

## API 基本構造

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)

print(message.content[0].text)
```

## 主要な概念

- **Messages API** — 会話形式でやり取りするメインAPI
- **Tool Use** — 外部ツール・関数を呼び出す機能
- **Prompt Caching** — 長いプロンプトをキャッシュしてコスト削減
- **Streaming** — レスポンスをリアルタイムで受信
