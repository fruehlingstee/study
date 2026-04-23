# Security Lab Setup Guide
WSL2 + Docker + DVWA + Burp Suite

---

## 1. WSL2 のインストール

### 手順
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

---

## 3. DVWA のセットアップ

DVWA（Damn Vulnerable Web Application）は脆弱性学習用のWebアプリ。

### 起動

Burp Suite がデフォルトで 8080 を使うため、8888 ポートで起動する：

```bash
docker run -d --name dvwa -p 8888:80 vulnerables/web-dvwa
```

### アクセス

ブラウザで：

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
# 停止
docker stop dvwa

# 再起動
docker start dvwa

# 削除
docker rm -f dvwa
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
Proxy → Intercept → "Intercept is off" をクリックして ON にする
→ ブラウザで操作するとリクエストが止まる
→ "Forward" で1つずつ通す
→ 作業が終わったら OFF に戻す
```

---

## 5. Brute Force 攻撃（Burp Intruder）

### 手順

1. Intercept を ON にする
2. DVWA の Brute Force ページでログインを Submit
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

## 6. 今後の練習メニュー

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
