# Git コマンドチートシート

## 1. 初期設定

| コマンド | 説明 |
|---|---|
| `git config --global user.name "名前"` | コミットに記録されるユーザー名を設定 |
| `git config --global user.email "メール"` | コミットに記録されるメールアドレスを設定 |
| `git config --global core.editor "code --wait"` | デフォルトエディタをVS Codeに設定 |
| `git config --global init.defaultBranch main` | デフォルトブランチ名を `main` に設定 |
| `git config --list` | 現在の設定を一覧表示 |
| `git config user.name` | 特定の設定値を確認 |

---

## 2. リポジトリの作成・取得

| コマンド | 説明 |
|---|---|
| `git init` | カレントディレクトリをGitリポジトリとして初期化 |
| `git clone <URL>` | リモートリポジトリをローカルにコピー |
| `git clone <URL> <ディレクトリ名>` | 指定した名前でクローン |

---

## 3. 状態の確認

| コマンド | 説明 |
|---|---|
| `git status` | 作業ディレクトリとステージングの状態を表示 |
| `git status -s` | 短縮形式で状態を表示 |

---

## 4. ステージング（add）

| コマンド | 説明 |
|---|---|
| `git add <ファイル>` | 指定ファイルをステージングに追加 |
| `git add .` | すべての変更をステージングに追加 |
| `git add -p <ファイル>` | ファイルの変更を部分的に選択してステージング |

---

## 5. コミット（commit）

| コマンド | 説明 |
|---|---|
| `git commit -m "メッセージ"` | ステージングの内容をコミット |
| `git commit -am "メッセージ"` | 追跡済みファイルをaddせずにコミット（新規ファイルは対象外） |
| `git commit --amend -m "新メッセージ"` | 直前のコミットメッセージを修正（push前のみ） |
| `git commit --amend --no-edit` | 直前のコミットにステージング中の変更を追加（メッセージはそのまま） |

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

## 7. 差分の確認（diff）

| コマンド | 説明 |
|---|---|
| `git diff` | 未ステージの変更差分を表示 |
| `git diff --staged` | ステージ済みの変更差分を表示 |
| `git diff HEAD` | 直前のコミットとの全差分を表示 |
| `git diff HEAD~1 HEAD` | 直前コミットと現在の差分 |
| `git diff <コミットID> <コミットID>` | 任意の2コミット間の差分を表示 |
| `git diff <ブランチA> <ブランチB>` | ブランチ間の差分を表示 |

---

## 8. add・commitの取り消し

### addの取り消し（ステージング解除）

| コマンド | 説明 |
|---|---|
| `git restore --staged <ファイル>` | 指定ファイルのステージングを解除（ファイルの変更は残る） |
| `git restore --staged .` | すべてのステージングを解除 |

### 作業ファイルの変更を取り消し

| コマンド | 説明 |
|---|---|
| `git restore <ファイル>` | 指定ファイルの変更を取り消し（**元に戻せない**） |
| `git restore .` | すべての変更を取り消し（**元に戻せない**） |

### コミットの取り消し

| コマンド | 説明 | 用途 |
|---|---|---|
| `git revert HEAD` | 直前のコミットを打ち消す新コミットを作成 | チーム開発・push済み |
| `git revert <コミットID>` | 特定のコミットを打ち消す | チーム開発・push済み |
| `git reset --soft HEAD~1` | コミット取り消し（変更はステージに残る） | push前のみ |
| `git reset HEAD~1` | コミット＋ステージ取り消し（ファイルは残る） | push前のみ |
| `git reset --hard HEAD~1` | コミット・ステージ・ファイル変更をすべて消す | push前のみ・**危険** |
| `git reset --hard <コミットID>` | 指定コミットの時点まですべてリセット | push前のみ・**危険** |

---

## 9. コミットのチェックアウト・移動

| コマンド | 説明 |
|---|---|
| `git checkout <コミットID>` | 指定コミットの状態に一時的に移動（detached HEAD） |
| `git checkout main` | `main` ブランチに戻る |
| `git switch -` | 直前のブランチに戻る |
| `git stash` | 作業中の変更を一時退避 |
| `git stash pop` | 退避した変更を復元（スタックから削除） |
| `git stash list` | 退避リストを表示 |
| `git stash drop` | 最新の退避データを削除 |
| `git cherry-pick <コミットID>` | 特定のコミットの変更を現在のブランチに取り込む |

---

## 10. ブランチ操作

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

## 11. マージ・リベース

| コマンド | 説明 |
|---|---|
| `git merge <ブランチ名>` | 指定ブランチを現在のブランチにマージ |
| `git merge --no-ff <ブランチ名>` | Fast-forwardせず必ずマージコミットを作成 |
| `git merge --squash <ブランチ名>` | 複数コミットを1つにまとめてマージ |
| `git merge --abort` | マージ中にコンフリクトが起きたときマージを中断 |
| `git rebase <ブランチ名>` | 現在のブランチのベースを指定ブランチの先端に移動 |
| `git rebase -i HEAD~3` | 直近3コミットをインタラクティブに編集 |
| `git rebase --abort` | リベースを中断して元に戻す |
| `git rebase --continue` | コンフリクト解消後にリベースを再開 |

---

## 12. リモート操作

| コマンド | 説明 |
|---|---|
| `git remote add origin <URL>` | リモートリポジトリを `origin` として登録 |
| `git remote -v` | 登録済みリモートの一覧とURLを表示 |
| `git remote remove <名前>` | リモートの登録を削除 |
| `git push origin <ブランチ名>` | ローカルブランチをリモートにpush |
| `git push -u origin <ブランチ名>` | push＋追跡設定（以降は `git push` のみでOK） |
| `git push --force-with-lease` | 安全な強制push（他者の変更を上書きしない） |
| `git pull` | リモートの変更を取得してマージ |
| `git pull --rebase` | リモートの変更を取得してリベース |
| `git fetch` | リモートの情報を取得（マージはしない） |
| `git fetch --prune` | リモートで削除されたブランチの情報をローカルから削除 |

---

## 13. タグ

| コマンド | 説明 |
|---|---|
| `git tag` | タグ一覧を表示 |
| `git tag <タグ名>` | 現在のコミットに軽量タグを作成 |
| `git tag -a <タグ名> -m "メッセージ"` | 注釈付きタグを作成 |
| `git tag -a <タグ名> <コミットID>` | 特定のコミットにタグを付ける |
| `git push origin <タグ名>` | タグをリモートにpush |
| `git push origin --tags` | すべてのタグをリモートにpush |
| `git tag -d <タグ名>` | ローカルのタグを削除 |

---

## 14. .gitignore

| 書き方 | 意味 |
|---|---|
| `*.log` | 拡張子が `.log` の全ファイル |
| `build/` | `build` ディレクトリ全体 |
| `!important.log` | `!` で除外から外す（追跡する） |
| `doc/**/*.txt` | `doc/` 以下すべての `.txt` ファイル |
| `# で始まる行` | コメント |

> すでに追跡中のファイルを `.gitignore` に追加しても無視されない。その場合は：
> ```
> git rm --cached <ファイル>
> ```

---

## 15. その他・便利コマンド

| コマンド | 説明 |
|---|---|
| `git bisect start` | バグが混入したコミットを二分探索で特定開始 |
| `git bisect good <コミットID>` | 正常だったコミットを指定 |
| `git bisect bad` | 現在のコミットが問題ありと指定 |
| `git bisect reset` | bisect を終了 |
| `git blame <ファイル>` | ファイルの各行を最後に変更したコミットと作者を表示 |
| `git shortlog -sn` | 作者別のコミット件数を集計 |
| `git clean -fd` | 追跡されていないファイル・ディレクトリを削除 |
| `git reflog` | HEADの移動履歴を表示（reset後の復元に使える） |

---

## 16. セキュリティ関連（追加）

### 機密情報の誤コミット対応

うっかりAPIキーやパスワードをコミットしてしまった場合の対処。

| コマンド | 説明 |
|---|---|
| `git log --all --full-history -- <ファイル>` | 削除済みファイルも含めた履歴を確認 |
| `git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch <ファイル>' --prune-empty --tag-name-filter cat -- --all` | 特定ファイルを全履歴から削除（旧方式） |
| `git push origin --force --all` | 書き換えた履歴を強制push（チームに要連絡） |

> **重要**: push済みの機密情報はGitHub側でもキャッシュされる場合があるため、流出したキーは必ず無効化・再発行すること。

### .gitignore に追加すべきもの（セキュリティ）

```
.env
.env.*
*.pem
*.key
*_rsa
*_rsa.pub
secrets/
config/secrets.yml
```

### コミット署名（GPG）

コミットが本人によるものか証明できる。CTFやOSSコントリビューションで信頼性が上がる。

| コマンド | 説明 |
|---|---|
| `git config --global user.signingkey <GPGキーID>` | 署名に使うGPGキーを設定 |
| `git config --global commit.gpgsign true` | 全コミットを自動署名 |
| `git commit -S -m "メッセージ"` | 手動で署名付きコミット |
| `git log --show-signature` | コミットの署名を確認 |

### SSH vs HTTPS

| 方式 | 特徴 |
|---|---|
| HTTPS | 設定簡単・パスワード or トークン認証 |
| SSH | 鍵ペアで認証・パスワード不要・セキュリティ学習にも有用 |

SSH鍵の生成：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# 公開鍵をGitHubに登録
cat ~/.ssh/id_ed25519.pub
```

接続確認：
```bash
ssh -T git@github.com
```

---

## 17. よく使うワークフロー早見表

### 基本の流れ（毎日使う）

```bash
git status                    # 状態確認
git add .                     # 全変更をステージ
git commit -m "変更内容"       # コミット
git push                      # プッシュ
```

### ブランチを切って作業する（チーム開発・ハッカソン）

```bash
git switch -c feature/xxx     # ブランチ作成＆移動
# 作業する
git add .
git commit -m "feat: xxx"
git push -u origin feature/xxx
# GitHub上でPull Requestを作成
```

### 誰かの変更を取り込む

```bash
git fetch                     # リモートの情報を取得
git pull                      # 取得＋マージ
# コンフリクトがあれば手動で解決してから
git add .
git commit
```

### やらかしたときの復旧

```bash
git reflog                    # 操作履歴を確認
git reset --hard <コミットID> # そのコミットまで戻す
```
