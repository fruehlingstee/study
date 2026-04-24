# Security Lab Setup Guide
WSL2 + Docker + DVWA + Burp Suite + Nmap

---

## 目次

1. [WSL2 のインストール](#1-wsl2-のインストール)
2. [Docker Desktop の WSL2 連携](#2-docker-desktop-の-wsl2-連携)
3. [DVWA のセットアップ](#3-dvwa-のセットアップ)
4. [Burp Suite のセットアップ](#4-burp-suite-のセットアップ)
5. [Nmap のインストール](#5-nmap-のインストール)
6. [Brute Force 攻撃（Burp Intruder）](#6-brute-force-攻撃burp-intruder)
7. [Nmap で DVWA コンテナをスキャン](#7-nmap-で-dvwa-コンテナをスキャン)
8. [Nmap でローカルネットワークをスキャン](#8-nmap-でローカルネットワークをスキャン)
9. [今後の練習メニュー](#9-今後の練習メニュー)

---

## 1. WSL2 のインストール

PowerShell を**管理者として実行**して以下を実行：

```powershell
wsl --install
```

再起動後、Ubuntu が自動で起動するのでユーザー名・パスワードを設定する。

### パスワード設定に失敗した場合

PowerShell から root で Ubuntu に入り直して設定する：

```powershell
wsl -d Ubuntu -u root
```

```bash
passwd <ユーザー名>
```

### インストール確認

```bash
wsl --list
```

---

## 2. Docker Desktop の WSL2 連携

Docker Desktop をインストール済みの前提。

### 設定手順

```
Docker Desktop → Settings → Resources → WSL Integration
→ "Enable integration with my default WSL distro" を ON
→ Ubuntu のトグルを ON
→ Apply & Restart
```

### 確認

Ubuntu ターミナルで：

```bash
docker --version
docker ps
```

> ⚠️ Docker Desktop を再起動すると連携が切れることがある。その場合は Apply & Restart を再度実行する。

---

## 3. DVWA のセットアップ

DVWA（Damn Vulnerable Web Application）は脆弱性学習用のWebアプリ。

### 起動

Burp Suite がデフォルトで 8080 を使うため、8888 ポートで起動する：

```bash
docker run -d --name dvwa -p 8888:80 vulnerables/web-dvwa
```

### アクセス

Burp Suite の内蔵ブラウザで：

```
http://localhost:8888
```

### ログイン情報

```
Username: admin
Password: password
```

ログイン後、**「Setup / Reset DB」** → **「Create / Reset Database」** を押す。
再度ログインするとメイン画面に入れる。

### 難易度設定

```
左メニュー → DVWA Security → Security Level を "Low" → Submit
```

### コンテナの管理

```bash
# 状態確認
docker ps

# 停止
docker stop dvwa

# 再起動
docker start dvwa

# 削除して作り直す
docker rm -f dvwa
docker run -d --name dvwa -p 8888:80 vulnerables/web-dvwa
```

---

## 4. Burp Suite のセットアップ

### インストール

Community Edition（無料）をダウンロード：

```
https://portswigger.net/burp/communitydownload
```

インストーラーを実行してデフォルト設定でインストール。

### 起動手順（毎回）

```
1. Burp Suite を起動
2. "Temporary project in memory" → Next → Start Burp
3. Proxy → Intercept タブ → "Open Browser" をクリック
4. 内蔵ブラウザで http://localhost:8888 にアクセス
```

> ⚠️ Community Edition はプロジェクト保存不可。毎回 Temporary project で起動する。

### Intercept の使い方

```
Proxy → Intercept → "Intercept is off" をクリックして ON
→ ブラウザで操作するとリクエストが止まる
→ "Forward" で1つずつ通す
→ 作業が終わったら OFF に戻す
```

---

## 5. Nmap のインストール

```bash
sudo apt install nmap -y
nmap --version
```

---

## 6. Brute Force 攻撃（Burp Intruder）

### 手順

1. Intercept を ON にする
2. DVWA の Brute Force ページで**わざと間違ったパスワード**でログインを Submit
3. Burp にリクエストが止まる
4. リクエストを右クリック → **"Send to Intruder"**
5. Intercept を OFF にする
6. Intruder タブを開く
7. **Positions** タブ → **"Clear §"** → `password=` の値部分を選択 → **"Add §"**
8. **Payloads** タブ → パスワード候補を1つずつ Add：
   ```
   wrongpass
   123456
   password
   admin
   letmein
   ```
9. **"Start attack"** を押す

### 結果の読み方

| 項目 | 意味 |
|------|------|
| Length | レスポンスのサイズ |
| 他より Length が大きい | ログイン成功のレスポンス |

---

## 7. Nmap で DVWA コンテナをスキャン

### WSL2 環境の注意点

WSL2 の `localhost` はDockerの内部ネットワークと分離されているため、
コンテナのIPを直接指定する必要がある。

### Step 1｜コンテナのIPを調べる

```bash
docker inspect dvwa | grep IPAddress
# → 例: "IPAddress": "172.17.0.2"
```

### Step 2｜Windows側のゲートウェイIPを調べる

```bash
cat /etc/resolv.conf | grep nameserver
# → 例: nameserver 10.255.255.254
```

### Step 3｜スキャン実行

```bash
# ポート指定スキャン（バージョン検出付き）
nmap -Pn -sV -p 8888 10.255.255.254
```

### 実際の結果例

```
PORT     STATE  SERVICE  VERSION
8888/tcp open   http     Apache httpd 2.4.25 (Debian)
```

---

## 8. Nmap でローカルネットワークをスキャン

### 自分のIPを確認

```bash
ip addr show eth0 | grep inet
# → 例: inet 172.22.116.102/20
```

### ゲートウェイを確認

```bash
ip route | grep default
# → 例: default via 172.22.112.1
```

### スキャン実行

```bash
# ゲートウェイをスキャン
nmap -Pn -T4 --open -p 22,80,443,3389 172.22.112.1

# ネットワーク範囲をスキャン（256台）
nmap -Pn -T4 --open -p 22,80,443,3389 172.22.116.0/24
```

### オプション早見表

| オプション | 意味 |
|-----------|------|
| `-Pn` | pingをスキップ（ファイアウォール対策） |
| `-sV` | サービスのバージョンを検出 |
| `-T4` | スキャン速度を上げる |
| `--open` | 開いているポートだけ表示 |
| `-p` | スキャンするポートを指定 |

### 結果の読み方

| STATE | 意味 |
|-------|------|
| `open` | ポートが開いている |
| `closed` | ポートは到達できるが閉じている |
| `filtered` | ファイアウォールで遮断されている |

---

## 9. 今後の練習メニュー（DVWA）

| 攻撃 | 場所 | 概要 |
|------|------|------|
| SQL Injection | DVWA → SQL Injection | `1' OR '1'='1` でDB全件取得 |
| XSS | DVWA → XSS (Reflected) | `<script>alert(1)</script>` |
| Command Injection | DVWA → Command Injection | `127.0.0.1; ls` |
| CSRF | DVWA → CSRF | リクエスト偽造 |
| File Upload | DVWA → File Upload | PHPファイルのアップロード |

---

## 参考リンク

- [PortSwigger Web Academy](https://portswigger.net/web-security) - Burp Suite 公式無料ラボ
- [DVWA GitHub](https://github.com/digininja/DVWA)
- [Docker Desktop WSL2](https://docs.docker.com/go/wsl2/)
- [Nmap 公式](https://nmap.org/)
