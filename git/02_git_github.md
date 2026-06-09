# Git / GitHub 操作チートシート

---

## 1. 初期設定

```bash
git config --global user.name "名前"
git config --global user.email "メール"
git config --global core.editor "code --wait"   # エディタをVSCodeに
git config --global init.defaultBranch main
git config --list   # 設定確認
```

---

## 2. リポジトリの作成・取得

| コマンド | 説明 |
|---|---|
| `git init` | カレントディレクトリをリポジトリとして初期化 |
| `git clone <URL>` | リモートをローカルにコピー |
| `git clone <URL> <ディレクトリ名>` | 指定した名前でクローン |
| `git clone --depth 1 <URL>` | 最新コミットのみ取得（高速） |

---

## 3. 状態・差分の確認

| コマンド | 説明 |
|---|---|
| `git status` | 作業ディレクトリとステージングの状態を表示 |
| `git status -s` | 短縮形式で表示 |
| `git diff` | 未ステージの変更差分を表示 |
| `git diff --staged` | ステージ済みの変更差分を表示 |
| `git diff HEAD` | 直前のコミットとの全差分を表示 |
| `git diff HEAD~1 HEAD` | 直前コミットと現在の差分 |
| `git diff <ブランチA> <ブランチB>` | ブランチ間の差分 |
| `git diff <コミットID> <コミットID>` | 任意の2コミット間の差分 |

---

## 4. ステージング（add）

| コマンド | 説明 |
|---|---|
| `git add <ファイル>` | 指定ファイルをステージング |
| `git add .` | すべての変更をステージング |
| `git add -p <ファイル>` | 変更を部分的に選択してステージング |

---

## 5. コミット（commit）

| コマンド | 説明 |
|---|---|
| `git commit -m "メッセージ"` | ステージングの内容をコミット |
| `git commit -am "メッセージ"` | 追跡済みファイルをaddせずにコミット |
| `git commit --amend -m "新メッセージ"` | 直前のコミットメッセージを修正（push前のみ） |
| `git commit --amend --no-edit` | 直前のコミットに変更を追加（メッセージはそのまま） |

### コミットメッセージの書き方（Conventional Commits）

```
<type>: <概要>

feat:     新機能
fix:      バグ修正
docs:     ドキュメントのみの変更
style:    コードの意味に影響しない変更（空白、フォーマット等）
refactor: バグ修正や機能追加を伴わないコードの変更
test:     テストの追加・修正
chore:    ビルドプロセスや補助ツールの変更

例：
git commit -m "feat: BLEスキャン機能を追加"
git commit -m "fix: Firestoreへの書き込みエラーを修正"
```

---

## 6. 履歴の確認（log）

| コマンド | 説明 |
|---|---|
| `git log` | コミット履歴を表示 |
| `git log --oneline` | 1行で簡潔に表示 |
| `git log --oneline --graph --all` | ブランチ含む全履歴をグラフ表示 |
| `git log -n 5` | 直近5件のみ表示 |
| `git log --author="名前"` | 特定の作者のコミットを絞り込み |
| `git log --since="2025-01-01"` | 指定日以降のコミットを表示 |
| `git log <ファイル>` | 特定ファイルの変更履歴を表示 |
| `git show <コミットID>` | 特定のコミットの詳細と差分を表示 |

---

## 7. add・commitの取り消し

### ステージング解除

| コマンド | 説明 |
|---|---|
| `git restore --staged <ファイル>` | 指定ファイルのステージングを解除（変更は残る） |
| `git restore --staged .` | すべてのステージングを解除 |

### 作業ファイルの変更を取り消し

| コマンド | 説明 |
|---|---|
| `git restore <ファイル>` | 変更を取り消し（**元に戻せない**） |
| `git restore .` | すべての変更を取り消し（**元に戻せない**） |

### コミットの取り消し

| コマンド | 説明 | 用途 |
|---|---|---|
| `git revert HEAD` | 直前のコミットを打ち消す新コミットを作成 | チーム開発・push済み |
| `git revert <コミットID>` | 特定のコミットを打ち消す | チーム開発・push済み |
| `git reset --soft HEAD~1` | コミット取り消し（変更はステージに残る） | push前のみ |
| `git reset HEAD~1` | コミット＋ステージ取り消し（ファイルは残る） | push前のみ |
| `git reset --hard HEAD~1` | コミット・ステージ・ファイル変更をすべて消す | push前のみ・**危険** |
| `git reset --hard <コミットID>` | 指定コミットまですべてリセット | push前のみ・**危険** |

---

## 8. ブランチ操作

| コマンド | 説明 |
|---|---|
| `git branch` | ローカルブランチの一覧を表示 |
| `git branch -a` | ローカル＋リモートのブランチをすべて表示 |
| `git branch <ブランチ名>` | 新しいブランチを作成 |
| `git switch <ブランチ名>` | 指定ブランチに切り替え |
| `git switch -c <ブランチ名>` | ブランチを作成して切り替え |
| `git branch -d <ブランチ名>` | ブランチを削除（マージ済みのみ） |
| `git branch -D <ブランチ名>` | ブランチを強制削除 |
| `git branch -m <新ブランチ名>` | 現在のブランチ名を変更 |

---

## 9. マージ・リベース

| コマンド | 説明 |
|---|---|
| `git merge <ブランチ名>` | 指定ブランチを現在のブランチにマージ |
| `git merge --no-ff <ブランチ名>` | Fast-forwardせず必ずマージコミットを作成 |
| `git merge --squash <ブランチ名>` | 複数コミットを1つにまとめてマージ |
| `git merge --abort` | コンフリクト発生時にマージを中断 |
| `git rebase <ブランチ名>` | 現在のブランチのベースを移動 |
| `git rebase -i HEAD~3` | 直近3コミットをインタラクティブに編集 |
| `git rebase --abort` | リベースを中断して元に戻す |
| `git rebase --continue` | コンフリクト解消後にリベースを再開 |

### コンフリクト解消の手順

```bash
# 1. マージ or リベース中にコンフリクト発生
git merge feature/xxx

# 2. 競合ファイルを確認
git status

# 3. ファイルを開いて手動で編集
# <<<<<<< HEAD
# 自分の変更
# =======
# 相手の変更
# >>>>>>> feature/xxx
# → どちらかを残す、または両方を組み合わせる

# 4. 解消後にadd
git add <ファイル>

# 5. マージコミット
git commit
# （リベースの場合は git rebase --continue）
```

---

## 10. スタッシュ（一時退避）

| コマンド | 説明 |
|---|---|
| `git stash` | 作業中の変更を一時退避 |
| `git stash push -m "メッセージ"` | メッセージ付きで退避 |
| `git stash pop` | 最新の退避を復元して削除 |
| `git stash apply` | 最新の退避を復元（削除しない） |
| `git stash list` | 退避リストを表示 |
| `git stash drop` | 最新の退避データを削除 |
| `git stash clear` | すべての退避データを削除 |

---

## 11. リモート操作

| コマンド | 説明 |
|---|---|
| `git remote add origin <URL>` | リモートを `origin` として登録 |
| `git remote -v` | 登録済みリモートの一覧とURLを表示 |
| `git remote remove <名前>` | リモートの登録を削除 |
| `git remote set-url origin <新URL>` | リモートのURLを変更 |
| `git push origin <ブランチ名>` | ローカルブランチをリモートにpush |
| `git push -u origin <ブランチ名>` | push＋追跡設定（以降は `git push` のみでOK） |
| `git push --force-with-lease` | 安全な強制push（他者の変更を上書きしない） |
| `git pull` | リモートの変更を取得してマージ |
| `git pull --rebase` | リモートの変更を取得してリベース |
| `git fetch` | リモートの情報を取得（マージはしない） |
| `git fetch --prune` | リモートで削除されたブランチをローカルから削除 |

---

## 12. チェックアウト・その他

| コマンド | 説明 |
|---|---|
| `git checkout <コミットID>` | 指定コミットの状態に一時的に移動（detached HEAD） |
| `git checkout main` | `main` ブランチに戻る |
| `git switch -` | 直前のブランチに戻る |
| `git cherry-pick <コミットID>` | 特定のコミットの変更を現在のブランチに取り込む |
| `git tag <タグ名>` | 現在のコミットに軽量タグを作成 |
| `git tag -a <タグ名> -m "メッセージ"` | 注釈付きタグを作成 |
| `git push origin --tags` | すべてのタグをリモートにpush |

---

## 13. 調査・デバッグ

| コマンド | 説明 |
|---|---|
| `git reflog` | HEADの移動履歴を表示（reset後の復元に使える） |
| `git blame <ファイル>` | 各行を最後に変更したコミットと作者を表示 |
| `git bisect start` | バグが混入したコミットを二分探索で特定開始 |
| `git bisect good <コミットID>` | 正常だったコミットを指定 |
| `git bisect bad` | 現在のコミットが問題ありと指定 |
| `git bisect reset` | bisect を終了 |
| `git shortlog -sn` | 作者別のコミット件数を集計 |
| `git clean -fd` | 追跡されていないファイル・ディレクトリを削除 |

---

## 14. .gitignore

| 書き方 | 意味 |
|---|---|
| `*.log` | 拡張子が `.log` の全ファイル |
| `build/` | `build` ディレクトリ全体 |
| `!important.log` | `!` で除外から外す（追跡する） |
| `doc/**/*.txt` | `doc/` 以下すべての `.txt` ファイル |

すでに追跡中のファイルを `.gitignore` に追加しても無視されない。その場合は：
```bash
git rm --cached <ファイル>
```

### セキュリティ用の .gitignore テンプレート

```gitignore
# 環境変数・秘密情報
.env
.env.*
*.pem
*.key
*_rsa
*_rsa.pub
secrets/
config/secrets.yml

# OS
.DS_Store
Thumbs.db

# エディタ
.vscode/settings.json
.idea/

# 依存関係
node_modules/
__pycache__/
*.pyc
.gradle/
build/
```

---

## 15. SSH設定（HTTPS → SSH に変更）

```bash
# 1. SSH鍵を生成
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 公開鍵を確認してGitHubに登録
cat ~/.ssh/id_ed25519.pub
# → GitHub > Settings > SSH and GPG keys > New SSH key に貼り付け

# 3. 接続確認
ssh -T git@github.com
# "Hi username! You've successfully authenticated..." と出ればOK

# 4. リモートURLをSSHに変更（既存リポジトリの場合）
git remote set-url origin git@github.com:<ユーザー名>/<リポジトリ名>.git

# 確認
git remote -v
```

---

## 16. GPGコミット署名

```bash
# GPGキーの確認
gpg --list-secret-keys --keyid-format=long

# gitに署名キーを設定
git config --global user.signingkey <GPGキーID>

# 全コミットを自動署名
git config --global commit.gpgsign true

# 手動で署名付きコミット
git commit -S -m "メッセージ"

# 署名を確認
git log --show-signature
```

---

## 17. よく使うワークフロー

### 基本の流れ（毎日）

```bash
git status
git add .
git commit -m "feat: 変更内容"
git push
```

### ブランチを切って作業する（チーム開発・ハッカソン）

```bash
git switch -c feature/xxx      # ブランチ作成＆移動
# 作業する
git add .
git commit -m "feat: xxx"
git push -u origin feature/xxx
# → GitHub上でPull Requestを作成
```

### 誰かの変更を取り込む

```bash
git fetch
git pull
# コンフリクトがあれば手動で解決
git add .
git commit
```

### やらかしたときの復旧

```bash
git reflog                        # 操作履歴を確認
git reset --hard <コミットID>     # そのコミットまで戻す
```

### 機密情報を誤コミットしたとき

```bash
# 1. 該当ファイルを .gitignore に追加
echo "secrets.txt" >> .gitignore

# 2. 全履歴から削除（push済みの場合）
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch secrets.txt' \
  --prune-empty --tag-name-filter cat -- --all

# 3. 強制push
git push origin --force --all

# ⚠️ push済みのキーは必ず無効化・再発行すること
```

---

## 18. GitHub操作（Web UI）

### Pull Request の流れ

```
1. feature ブランチを push
2. GitHub上で「Compare & pull request」をクリック
3. タイトル・説明を記入してPR作成
4. レビュー・承認を得る
5. 「Merge pull request」でマージ
6. ブランチを削除（「Delete branch」）
```

### Issue の活用

```
- バグ報告・機能要望を Issue で管理
- コミットメッセージに「fixes #12」と書くと
  マージ時にIssue #12 が自動クローズされる
```

### GitHub Actions（CI/CD）の基本構造

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          pip install -r requirements.txt
          python -m pytest
```
