# Kali Linux + TryHackMe 環境構築ログ

## 概要

ペネトレーションテストおよびTryHackMe学習用のKali Linux環境をWindowsのVirtualBox上に構築する。

---

## ✅ 完了済み作業

### 1. ファイルのダウンロード
- [x] `kali-linux-2026.1-virtualbox-amd64.7z` をKali公式サイトからダウンロード
- [x] `nmap-7.99-setup.exe` をダウンロード（後で使用）

### 2. フォルダ構成
- [x] `C:\VMs\` フォルダを作成
- [x] 7-ZipでKali VMを `C:\VMs\` に解凍

```
C:\VMs\
└── kali-linux-2026.1-virtualbox-amd64\
    ├── kali-linux-2026.1-virtualbox-amd64.vbox
    └── kali-linux-2026.1-virtualbox-amd64.vdi
```

### 3. VirtualBox セットアップ
- [x] VirtualBox 7.2.8 をインストール（Windows hosts）
- [x] デフォルトVM保存先を `C:\VMs\` に変更
- [x] `.vbox` ファイルをダブルクリックしてKaliをインポート
- [x] メインメモリーを **4096 MB** に変更

### 4. Kali Linux 初期設定
- [x] 初回起動・ログイン（`kali` / `kali`）
- [x] パスワード変更（`passwd`）
- [x] パッケージ更新

```bash
sudo apt update && sudo apt full-upgrade -y
```

- [x] 再起動（`sudo reboot`）
- [x] スナップショット作成（名前：`clean-install`）

---

## 🔲 残りの作業

### 5. TryHackMe VPN接続
- [ ] KaliのFirefoxで https://tryhackme.com にアクセス
- [ ] Resources → VPN Access → OpenVPNファイルをダウンロード
- [ ] KaliのターミナルでVPN接続

```bash
sudo openvpn ~/Downloads/your-username.ovpn
```

- [ ] 接続確認

```bash
ip a show tun0
# IPアドレスが表示されればOK
```

### 6. ツール確認
- [ ] nmap動作確認

```bash
nmap --version
```

- [ ] Burp Suite起動確認

```bash
burpsuite &
```

### 7. TryHackMe 学習開始
- [ ] Pre-Security パス（無料）を完走
- [ ] Introduction to Cybersecurity（無料）
- [ ] Jr Penetration Tester パス

#### 推奨学習順序

```
Pre-Security
    ↓
Introduction to Cybersecurity
    ↓
Jr Penetration Tester
    ├── Nmap
    ├── Burp Suite
    ├── Metasploit
    └── Web Fundamentals
    ↓
OWASP Top 10
    ↓
CTF部屋（Advent of Cyber, Pickle Rick など）
```

---

## 📝 覚えておくこと

| 操作 | コマンド / 方法 |
|---|---|
| VM内からWindowsに戻る | `Right Ctrl` キー |
| Kaliシャットダウン | `sudo shutdown now` |
| Kali再起動 | `sudo reboot` |
| VPN接続 | `sudo openvpn ~/Downloads/xxxx.ovpn` |
| スナップショット作成 | VirtualBox → 仮想マシン → スナップショットを作成 |
| パッケージ更新 | `sudo apt update && sudo apt full-upgrade -y` |

---

## 環境情報

| 項目 | 内容 |
|---|---|
| ホストOS | Windows（Cドライブのみ） |
| 仮想化ソフト | Oracle VirtualBox 7.2.8 |
| ゲストOS | Kali Linux 2026.1 |
| メモリ割り当て | 4096 MB |
| ストレージ | 80 GB (vdi) |
| VM保存先 | `C:\VMs\` |