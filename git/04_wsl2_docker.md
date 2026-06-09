# WSL2 / Docker / 開発環境構築チートシート

---

## 1. WSL2 基本操作

### Windows側（PowerShell / コマンドプロンプト）

| コマンド | 説明 |
|---|---|
| `wsl` | デフォルトのLinuxを起動 |
| `wsl -l -v` | インストール済みディストリビューション一覧と状態を表示 |
| `wsl --set-default <ディストリ名>` | デフォルトのディストリビューションを変更 |
| `wsl --set-version <ディストリ名> 2` | WSL2に変換 |
| `wsl --shutdown` | WSL2を停止 |
| `wsl --update` | WSL2カーネルを更新 |
| `wsl -d <ディストリ名>` | 指定ディストリビューションを起動 |
| `wsl --export <ディストリ名> <ファイル.tar>` | バックアップ |
| `wsl --import <ディストリ名> <インストール先> <ファイル.tar>` | 復元 |
| `wsl --unregister <ディストリ名>` | ディストリビューションを削除（**データ消失**） |

### WSL2とWindowsのファイルアクセス

```bash
# WindowsのCドライブにアクセス（WSL2内から）
cd /mnt/c/Users/<Windowsのユーザー名>/

# WSL2のファイルにアクセス（Windowsのエクスプローラーから）
# アドレスバーに \\wsl$ と入力

# VSCodeでWSL2のファイルを開く（WSL2ターミナルから）
code .
```

### WSL2のリソース制限（.wslconfig）

`C:\Users\<ユーザー名>\.wslconfig` に作成：

```ini
[wsl2]
memory=4GB
processors=2
swap=2GB
```

変更後は `wsl --shutdown` で再起動。

---

## 2. Docker 基本操作

### イメージ操作

| コマンド | 説明 |
|---|---|
| `docker images` | ローカルのイメージ一覧を表示 |
| `docker pull <イメージ名>` | イメージをDocker Hubから取得 |
| `docker build -t <名前> .` | Dockerfileからイメージをビルド |
| `docker rmi <イメージID>` | イメージを削除 |
| `docker image prune` | 使われていないイメージを一括削除 |

### コンテナ操作

| コマンド | 説明 |
|---|---|
| `docker run <イメージ名>` | コンテナを作成して起動 |
| `docker run -it <イメージ名> bash` | インタラクティブにコンテナを起動 |
| `docker run -d <イメージ名>` | バックグラウンドで起動 |
| `docker run -p 8080:80 <イメージ名>` | ポートをマッピングして起動（ホスト:コンテナ） |
| `docker run -v $(pwd):/app <イメージ名>` | ボリュームをマウントして起動 |
| `docker run --name <名前> <イメージ名>` | コンテナに名前をつけて起動 |
| `docker ps` | 起動中のコンテナ一覧 |
| `docker ps -a` | 停止中も含めた全コンテナ一覧 |
| `docker start <コンテナID>` | コンテナを起動 |
| `docker stop <コンテナID>` | コンテナを停止 |
| `docker restart <コンテナID>` | コンテナを再起動 |
| `docker rm <コンテナID>` | コンテナを削除 |
| `docker rm -f <コンテナID>` | 起動中でも強制削除 |
| `docker container prune` | 停止中のコンテナを一括削除 |

### コンテナの操作・確認

| コマンド | 説明 |
|---|---|
| `docker exec -it <コンテナID> bash` | 起動中のコンテナにbashで入る |
| `docker logs <コンテナID>` | コンテナのログを表示 |
| `docker logs -f <コンテナID>` | ログをリアルタイムで追跡 |
| `docker inspect <コンテナID>` | コンテナの詳細情報を表示 |
| `docker stats` | コンテナのリソース使用量をリアルタイム表示 |
| `docker cp <コンテナID>:/path /local/path` | コンテナからファイルをコピー |

---

## 3. Dockerfile の書き方

```dockerfile
# ベースイメージを指定
FROM python:3.11-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存ファイルをコピー（キャッシュ効率のため先にコピー）
COPY requirements.txt .

# 依存をインストール
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコピー
COPY . .

# 使用するポートを明示（ドキュメント用）
EXPOSE 8000

# コンテナ起動時に実行するコマンド
CMD ["python", "app.py"]
```

### よく使うDockerfileの書き方

```dockerfile
# 環境変数を設定
ENV APP_ENV=production

# ファイルをコピー
COPY src/ /app/src/

# ユーザーを作成（rootで動かさない）
RUN useradd -m appuser
USER appuser

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8000/health || exit 1
```

---

## 4. docker-compose の基本

### docker-compose.yml の例

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### docker-compose コマンド

| コマンド | 説明 |
|---|---|
| `docker compose up` | コンテナを起動（フォアグラウンド） |
| `docker compose up -d` | バックグラウンドで起動 |
| `docker compose up --build` | イメージを再ビルドして起動 |
| `docker compose down` | コンテナを停止・削除 |
| `docker compose down -v` | ボリュームも含めて削除 |
| `docker compose ps` | 起動中のサービスを表示 |
| `docker compose logs -f` | ログをリアルタイム表示 |
| `docker compose exec <サービス名> bash` | 起動中のサービスに入る |
| `docker compose restart <サービス名>` | 特定サービスを再起動 |

---

## 5. Python 環境構築

### venv（仮想環境）

```bash
# 仮想環境を作成
python -m venv venv

# 仮想環境を有効化
source venv/bin/activate       # Linux/Mac/WSL2
venv\Scripts\activate          # Windows

# 有効化の確認（プロンプトに(venv)が表示される）
which python

# パッケージをインストール
pip install requests flask

# 依存を書き出し
pip freeze > requirements.txt

# 仮想環境を無効化
deactivate
```

### pyenv（Pythonバージョン管理）

```bash
# インストール（WSL2 / Linux）
curl https://pyenv.run | bash

# バージョン一覧を確認
pyenv install --list

# 指定バージョンをインストール
pyenv install 3.11.0

# グローバルに設定
pyenv global 3.11.0

# プロジェクトごとに設定
pyenv local 3.11.0
```

---

## 6. Node.js 環境構築

### nvm（Node.jsバージョン管理）

```bash
# nvmをインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# ターミナルを再起動後
nvm install --lts           # LTS版をインストール
nvm install 20              # 指定バージョンをインストール
nvm use 20                  # 使用するバージョンを切り替え
nvm ls                      # インストール済み一覧
nvm alias default 20        # デフォルトを設定
```

---

## 7. VirtualBox / Kali Linux 環境

### VirtualBox基本操作

| 操作 | 説明 |
|---|---|
| ホストキー（Right Ctrl）+ F | フルスクリーン切り替え |
| ホストキー + H | ウィンドウモードに戻る |
| デバイス → Guest Additions のインストール | 画面リサイズ・共有フォルダを有効化 |
| スナップショット（機械 → スナップショット） | 現在の状態を保存（操作前に必ず取る） |

### 共有フォルダの設定

```
VirtualBox設定 → 共有フォルダ → フォルダを追加
→ 自動マウントにチェック
→ VM内で: sudo adduser $USER vboxsf
→ 再起動後 /media/sf_<フォルダ名> でアクセス可能
```

### ネットワーク設定

| モード | 用途 |
|---|---|
| NAT（デフォルト） | インターネット接続のみ（ホストからVMへはアクセス不可） |
| ホストオンリー | ホストとVM間の通信（インターネット不可） |
| ブリッジ | 同一ネットワーク上に独立したIPを持つ |
| NAT＋ホストオンリー（2枚NIC） | インターネット＋ホストアクセス両方（セキュリティ学習向け） |

---

## 8. SSH 接続

```bash
# 基本的な接続
ssh <ユーザー名>@<IPアドレス>

# ポートを指定して接続
ssh -p 2222 user@192.168.1.1

# 秘密鍵を指定して接続
ssh -i ~/.ssh/id_ed25519 user@192.168.1.1

# 接続を切断
exit  または  Ctrl + D

# SSH設定ファイル（~/.ssh/config）
Host myserver
    HostName 192.168.1.1
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
    Port 22

# 設定後はこれだけで接続可能
ssh myserver
```

### SCP（ファイル転送）

```bash
# ローカル → リモート
scp file.txt user@192.168.1.1:/home/user/

# リモート → ローカル
scp user@192.168.1.1:/home/user/file.txt ./

# ディレクトリごと転送
scp -r local_dir/ user@192.168.1.1:/home/user/
```

---

## 9. データベース（MariaDB / PostgreSQL）

### MariaDB（XAMPP）

```bash
# XAMPP経由での起動はGUI操作
# MySQLコマンドラインに接続
mysql -u root -p

# よく使うSQL操作
SHOW DATABASES;
USE <データベース名>;
SHOW TABLES;
DESCRIBE <テーブル名>;
SELECT * FROM <テーブル名>;
EXIT;
```

### PostgreSQL（Docker経由）

```bash
# コンテナに入る
docker exec -it <コンテナ名> psql -U <ユーザー名> -d <DB名>

# よく使う操作
\l           # データベース一覧
\c <DB名>   # データベースに接続
\dt          # テーブル一覧
\d <テーブル名>  # テーブル構造
\q           # 終了
```

---

## 10. よくあるエラーと対処

### WSL2

```bash
# WSL2が起動しない
wsl --shutdown && wsl

# Windowsのファイルに権限エラー
# /etc/wsl.conf に以下を追加
[automount]
options = "metadata"

# WSL2からWindowsのブラウザでURLを開く
explorer.exe http://localhost:8000
```

### Docker

```bash
# Dockerデーモンが起動していない
# → Docker Desktopを起動する

# ポートが既に使われている
# → lsof -i :8080 で確認して kill

# コンテナのディスク使用量が増えた
docker system prune -a    # イメージ・コンテナ・キャッシュを一括削除（注意）
docker volume prune       # 未使用ボリュームを削除
```
