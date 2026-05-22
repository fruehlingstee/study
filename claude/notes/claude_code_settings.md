# Claude Code 初期設定ガイド (Windows版)

参考: https://qiita.com/dai_chi/items/6fec068d23caadea53df

設定ファイルの場所: `C:\Users\<ユーザー名>\.claude\settings.json`

---

## 1. Stop Hook（完了通知音）

Claude Code が応答を終えたタイミングで自動的にサウンドを鳴らす設定。

### 仕組み

`hooks` → `Stop` イベントに任意のコマンドを登録できる。  
Windows では `Media.SoundPlayer` を使って `.wav` ファイルを再生する。

### 設定

```json
"hooks": {
  "Stop": [
    {
      "hooks": [
        {
          "type": "command",
          "command": "powershell.exe -c \"(New-Object Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()\""
        }
      ]
    }
  ]
}
```

### よく使う Windows 通知音

| ファイル | 音の種類 |
|---------|---------|
| `chimes.wav` | チャイム（デフォルト） |
| `chord.wav` | 短い通知音 |
| `notify.wav` | 通知 |
| `Windows Notify.wav` | Windowsの通知音 |

変更する場合は `command` 内のファイル名を書き換える。

---

## 2. パーミッション設定

Claude Code が実行できる操作・できない操作をホワイトリスト/ブラックリストで管理する。

### 仕組み

- `allow` — 確認なしで実行を許可するコマンド・操作
- `deny` — 明示的に禁止する操作（allowより優先される）

### 設定

```json
"permissions": {
  "allow": [
    "WebFetch",
    "WebSearch",
    "Bash(npm run *)",
    "Bash(git status)",
    "Bash(git diff *)",
    "Bash(git log *)"
  ],
  "deny": [
    "Read(./.env)",
    "Read(./.env.*)",
    "Edit(./.env)",
    "Edit(./.env.*)",
    "Bash(git push -f *)",
    "Bash(git reset --hard *)"
  ]
}
```

### パーミッションの書き方

| 書き方 | 意味 |
|-------|------|
| `"WebFetch"` | ツール名をそのまま指定 |
| `"Bash(git status)"` | 特定のコマンドのみ許可 |
| `"Bash(git *)"` | `git` から始まる全コマンドを許可 |
| `"Read(./.env)"` | 特定ファイルの読み取りを禁止 |
| `"Edit(./.env.*)"` | `.env.*` パターンの編集を禁止 |

### deny が重要な理由

- `.env` ファイルにはAPIキーや秘密情報が入っていることが多い
- `git push -f`（強制プッシュ）や `git reset --hard` は取り消しできない破壊的操作
- Claudeが誤ってこれらを実行しないよう保護する

---

## 3. ステータスライン（コンテキスト使用率表示）

Claude Code の入力欄の右側に、現在のコンテキスト使用率をリアルタイム表示する。

### 仕組み

Claude Code が定期的にスクリプトを呼び出し、標準出力に出力したテキストをステータスとして表示する。  
入力データは JSON 形式で標準入力から渡される。

### 設定

`settings.json` に追加:

```json
"statusLine": {
  "type": "command",
  "command": "python C:\\Users\\rin.hal\\.claude\\statusline.py"
}
```

### スクリプト (`~/.claude/statusline.py`)

```python
import sys
import json

try:
    data = json.load(sys.stdin)
    context = data.get("context_window", {})
    size = context.get("context_window_size", 0)
    usage = context.get("current_usage")

    if usage and size:
        current = (
            usage.get("input_tokens", 0)
            + usage.get("cache_creation_input_tokens", 0)
            + usage.get("cache_read_input_tokens", 0)
        )
        percent = current * 100 // size
        print(f"Context: {percent}%")
    else:
        print("Context: -")
except Exception:
    print("Context: -")
```

### コンテキスト使用率が重要な理由

Claude Code にはモデルごとに上限（コンテキストウィンドウ）がある。  
100% に近づくと `/compact` で要約して解放する必要がある。

| 目安 | 対応 |
|------|------|
| ~70% | 通常通り作業 |
| 70~90% | 不要な履歴を `/clear` で整理 |
| 90%以上 | `/compact` で圧縮 |

---

## 設定ファイル全体

`C:\Users\rin.hal\.claude\settings.json`

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "autoUpdatesChannel": "latest",
  "theme": "dark",
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "powershell.exe -c \"(New-Object Media.SoundPlayer 'C:\\Windows\\Media\\chimes.wav').PlaySync()\""
          }
        ]
      }
    ]
  },
  "permissions": {
    "allow": [
      "WebFetch",
      "WebSearch",
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Edit(./.env)",
      "Edit(./.env.*)",
      "Bash(git push -f *)",
      "Bash(git reset --hard *)"
    ]
  },
  "statusLine": {
    "type": "command",
    "command": "python C:\\Users\\rin.hal\\.claude\\statusline.py"
  }
}
```
