# VSCode 操作チートシート

---

## 1. 基本ショートカット（Windows）

| ショートカット | 説明 |
|---|---|
| `Ctrl + Shift + P` | コマンドパレットを開く（最重要） |
| `Ctrl + P` | ファイルをクイックオープン |
| `Ctrl + ,` | 設定を開く |
| `Ctrl + `` ` | ターミナルを開く / 閉じる |
| `Ctrl + B` | サイドバーを開く / 閉じる |
| `Ctrl + Shift + E` | エクスプローラーを開く |
| `Ctrl + Shift + F` | 全体検索を開く |
| `Ctrl + Shift + G` | ソース管理を開く（Git） |
| `Ctrl + Shift + X` | 拡張機能を開く |
| `Ctrl + Shift + D` | デバッグを開く |
| `Ctrl + W` | 現在のタブを閉じる |
| `Ctrl + Shift + T` | 閉じたタブを再度開く |
| `Ctrl + Tab` | 開いているタブを切り替え |
| `Ctrl + \` | エディタを分割 |
| `Ctrl + 1 / 2 / 3` | 分割したエディタを切り替え |

---

## 2. 編集ショートカット

| ショートカット | 説明 |
|---|---|
| `Ctrl + Z` | 元に戻す |
| `Ctrl + Y` | やり直し |
| `Ctrl + X` | 行を切り取り（選択なしでも行全体） |
| `Ctrl + C` | 行をコピー（選択なしでも行全体） |
| `Ctrl + V` | 貼り付け |
| `Alt + ↑ / ↓` | 行を上下に移動 |
| `Shift + Alt + ↑ / ↓` | 行を上下にコピー |
| `Ctrl + Shift + K` | 行を削除 |
| `Ctrl + Enter` | 下に新しい行を挿入 |
| `Ctrl + Shift + Enter` | 上に新しい行を挿入 |
| `Ctrl + /` | 行をコメントアウト / 解除 |
| `Shift + Alt + F` | コードをフォーマット |
| `Tab` | インデント追加 |
| `Shift + Tab` | インデント削除 |
| `Ctrl + ]` | 選択行をインデント追加 |
| `Ctrl + [` | 選択行をインデント削除 |

---

## 3. 検索・置換

| ショートカット | 説明 |
|---|---|
| `Ctrl + F` | ファイル内検索 |
| `Ctrl + H` | ファイル内置換 |
| `Ctrl + Shift + F` | ワークスペース全体を検索 |
| `Ctrl + Shift + H` | ワークスペース全体を置換 |
| `F3` | 次の検索結果へ |
| `Shift + F3` | 前の検索結果へ |
| `Alt + Enter` | 検索結果をすべて選択 |

---

## 4. カーソル・マルチカーソル

| ショートカット | 説明 |
|---|---|
| `Alt + クリック` | カーソルを追加 |
| `Ctrl + Alt + ↑ / ↓` | 上下にカーソルを追加 |
| `Ctrl + D` | 次の同じ文字列を選択（マルチカーソル） |
| `Ctrl + Shift + L` | 同じ文字列をすべて選択 |
| `Ctrl + L` | 行全体を選択 |
| `Ctrl + Shift + ←/→` | 単語単位で選択 |
| `Ctrl + G` | 指定行番号に移動 |
| `Home / End` | 行の先頭 / 末尾へ |
| `Ctrl + Home / End` | ファイルの先頭 / 末尾へ |

---

## 5. コード補完・IntelliSense

| ショートカット | 説明 |
|---|---|
| `Ctrl + Space` | 補完候補を表示 |
| `Ctrl + Shift + Space` | 引数のヒントを表示 |
| `F12` | 定義へジャンプ |
| `Alt + F12` | 定義をピークで表示（画面遷移しない） |
| `Shift + F12` | 参照をすべて表示 |
| `F2` | シンボルをリネーム（全ファイル一括） |
| `Ctrl + .` | クイックフィックス（エラー修正候補） |
| `Ctrl + Shift + O` | ファイル内のシンボル一覧 |
| `Ctrl + T` | ワークスペース全体のシンボル検索 |

---

## 6. ターミナル操作

| ショートカット / 操作 | 説明 |
|---|---|
| `Ctrl + @` | ターミナルを開く |
| `Ctrl + Shift + @` | 新しいターミナルを作成 |
| `Ctrl + Shift + 5` | ターミナルを分割 |
| `Ctrl + PgUp / PgDn` | ターミナルを切り替え |
| ターミナル内の `Ctrl + C` | 実行中のコマンドを中断 |
| ターミナルのゴミ箱アイコン | ターミナルを閉じる |

---

## 7. Git統合（ソース管理パネル）

| 操作 | 方法 |
|---|---|
| 変更を確認 | `Ctrl + Shift + G` でソース管理パネルを開く |
| ファイルをステージ | ファイル横の `+` アイコン |
| ファイルをアンステージ | ファイル横の `-` アイコン |
| コミット | メッセージ入力 → `Ctrl + Enter` |
| push / pull | 上部の `...` メニュー or 下部ステータスバー |
| ブランチ切り替え | 左下のブランチ名をクリック |
| 差分を表示 | 変更ファイルをクリック |
| コンフリクト解消 | ファイルを開いて `Accept Current / Incoming / Both` を選択 |

---

## 8. デバッグ

| ショートカット | 説明 |
|---|---|
| `F5` | デバッグ開始 |
| `F9` | ブレークポイントを設定 / 解除 |
| `F10` | ステップオーバー（次の行へ） |
| `F11` | ステップイン（関数の中に入る） |
| `Shift + F11` | ステップアウト（関数から出る） |
| `Shift + F5` | デバッグ停止 |
| `Ctrl + Shift + F5` | デバッグを再起動 |

---

## 9. スニペット（Emmet・カスタム）

### HTML（Emmet）

```
! → HTMLボイラープレート
div.container → <div class="container"></div>
ul>li*3 → <ul><li></li><li></li><li></li></ul>
a[href="#"] → <a href="#"></a>
```

### カスタムスニペットの作成

`Ctrl + Shift + P` → `Snippets: Configure User Snippets` → 言語を選択

```json
{
  "Print to console": {
    "prefix": "log",
    "body": ["console.log($1);"],
    "description": "console.log"
  }
}
```

---

## 10. おすすめ拡張機能

### 必須

| 拡張機能 | 用途 |
|---|---|
| **GitLens** | Git履歴・blame・差分を強化 |
| **Prettier** | コードフォーマッター |
| **ESLint** | JavaScript/TypeScriptの静的解析 |
| **Error Lens** | エラー・警告をインラインで表示 |
| **indent-rainbow** | インデントを色で可視化 |

### セキュリティ学習向け

| 拡張機能 | 用途 |
|---|---|
| **REST Client** | .httpファイルでHTTPリクエストを送信（Burpの代替にも） |
| **Hex Editor** | バイナリファイルを16進数で表示 |
| **CodeQL** | セキュリティ脆弱性の静的解析 |

### 言語別

| 拡張機能 | 用途 |
|---|---|
| **Python** | Python開発環境 |
| **Pylance** | Python型チェック・補完強化 |
| **Kotlin** | Kotlin開発環境 |
| **Docker** | Dockerfile・docker-compose対応 |

---

## 11. settings.json よく使う設定

`Ctrl + Shift + P` → `Open User Settings (JSON)`

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "terminal.integrated.fontSize": 13,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "workbench.colorTheme": "One Dark Pro",
  "editor.renderWhitespace": "all",
  "editor.bracketPairColorization.enabled": true,
  "git.autofetch": true
}
```

---

## 12. マルチルートワークスペース

複数プロジェクトを1つのVSCodeウィンドウで管理する。

```
ファイル → ワークスペースにフォルダーを追加
→ 名前を付けてワークスペースを保存（.code-workspace）
```

---

## 13. タスクランナー（tasks.json）

`Ctrl + Shift + P` → `Tasks: Configure Task`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Python",
      "type": "shell",
      "command": "python ${file}",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

実行：`Ctrl + Shift + B`
