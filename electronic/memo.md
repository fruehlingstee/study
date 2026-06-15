# RPi.GPIO 基礎リファレンス
## Raspberry Pi 5 + Python で GPIO を操作する

---

## 目次

1. [GPIO とは何か](#1-gpio-とは何か)
2. [ピン番号の数え方（BCM vs BOARD）](#2-ピン番号の数え方bcm-vs-board)
3. [RPi.GPIO の基本構造（型）](#3-rpigpio-の基本構造型)
4. [出力（Output）— LED を光らせる](#4-出力output--led-を光らせる)
5. [入力（Input）— スイッチを読む](#5-入力input--スイッチを読む)
6. [プルアップ / プルダウン抵抗](#6-プルアップ--プルダウン抵抗)
7. [チャタリングと対策](#7-チャタリングと対策)
8. [イベント駆動（割り込み）](#8-イベント駆動割り込み)
9. [PWM — 明るさ・速さを変える](#9-pwm--明るさ速さを変える)
10. [複数ピンの管理とクラス化](#10-複数ピンの管理とクラス化)
11. [よくあるエラーと対処](#11-よくあるエラーと対処)
12. [チートシート](#12-チートシート)

---

## 1. GPIO とは何か

GPIO（General Purpose Input/Output）は、ラズパイ基板上に並んだ「汎用の端子」です。
プログラムから電圧を制御する（出力）、または電圧を読み取る（入力）ことができます。

```
出力（Output）: プログラム → ピン → LED・モーターなど
入力（Input） : スイッチ・センサー → ピン → プログラム
```

ピンに出力できる電圧は **3.3V（HIGH）か 0V（LOW）の2値のみ**。
アナログ電圧は直接出力できません（それをやるのが PWM、後述）。

> **Pi 5 の注意点**
> Pi 5 は内部チップが変わり、素の `RPi.GPIO` パッケージでは動かない場合があります。
> `rpi-lgpio` パッケージが入っていれば `import RPi.GPIO as GPIO` の書き方はそのまま動きます。
> 動いているなら何もしなくてOKです。

---

## 2. ピン番号の数え方（BCM vs BOARD）

ラズパイには 40本のピンがありますが、番号の数え方が**2種類**あります。

| 方式 | 内容 | 例 |
|------|------|----|
| **BCM** | チップ内部の GPIO 番号（ Broadcom の番号）| GPIO17、GPIO27 |
| **BOARD** | 基板上の物理的な配置順の番号 | 11番ピン、13番ピン |

**このドキュメントは BCM 統一**で書きます。ネット上のサンプルのほとんども BCM です。

```python
GPIO.setmode(GPIO.BCM)    # BCM を使う ← こちらを推奨
GPIO.setmode(GPIO.BOARD)  # BOARD を使う場合
```

どちらが正しいというわけではありませんが、**1つのプログラムの中で混在させてはいけません**。

### ピン配置早見表（よく使うもの）

```
3.3V  [ 1][ 2] 5V
GPIO2 [ 3][ 4] 5V
GPIO3 [ 5][ 6] GND
GPIO4 [ 7][ 8] GPIO14
GND   [ 9][10] GPIO15
GPIO17[11][12] GPIO18
GPIO27[13][14] GND
GPIO22[15][16] GPIO23
3.3V  [17][18] GPIO24
GPIO10[19][20] GND
GPIO9 [21][22] GPIO25
GPIO11[23][24] GPIO8
GND   [25][26] GPIO7
      ...
GPIO19[35][36] GPIO16
GPIO26[37][38] GPIO20
GND   [39][40] GPIO21
```

---

## 3. RPi.GPIO の基本構造（型）

すべての RPi.GPIO プログラムは、この**4段の骨格**でできています。
まずこの型を体に入れてください。

```python
import RPi.GPIO as GPIO
from time import sleep

# ─── ① setmode：ピン番号の数え方を宣言 ───
GPIO.setmode(GPIO.BCM)

# ─── ② setup：使うピンの役割を設定 ───
GPIO.setup(17, GPIO.OUT)   # GPIO17 を出力に
GPIO.setup(18, GPIO.IN)    # GPIO18 を入力に

# ─── ③ 処理：やりたいことを書く ───
try:
    while True:
        GPIO.output(17, GPIO.HIGH)
        sleep(1)
        GPIO.output(17, GPIO.LOW)
        sleep(1)
except KeyboardInterrupt:
    pass  # Ctrl+C で抜ける

# ─── ④ cleanup：後始末（必ず実行する） ───
finally:
    GPIO.cleanup()
```

### `try / finally` を使う理由

`finally` は、エラーが起きても・Ctrl+C で中断しても、**必ず実行されるブロック**です。
`GPIO.cleanup()` を `finally` に書くことで、終了時に必ずピンをリセットできます。

`cleanup()` を忘れると何が起きるか：
- 次回起動時に「RuntimeWarning: This channel is already in use」が出る
- ピンが意図しない状態のままになる（LED が消えないなど）

---

## 4. 出力（Output）— LED を光らせる

### 基本：ON / OFF

```python
import RPi.GPIO as GPIO
from time import sleep

LED = 17  # 定数は先頭にまとめる（後で変更しやすい）

GPIO.setmode(GPIO.BCM)
GPIO.setup(LED, GPIO.OUT)

try:
    while True:
        GPIO.output(LED, GPIO.HIGH)  # 点灯（3.3V 出力）
        sleep(0.5)
        GPIO.output(LED, GPIO.LOW)   # 消灯（0V 出力）
        sleep(0.5)
except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()
```

### 初期状態を指定する

```python
# 起動時点から LOW（消灯）の状態にする
GPIO.setup(LED, GPIO.OUT, initial=GPIO.LOW)
```

`initial` を指定しないと、セットアップ直後のピンの状態は不定です。
LEDなどを使う場合、起動時に一瞬光る「チラつき」を防ぐために指定する習慣をつけると良いです。

### 複数 LED を同時制御

```python
LEDS = [17, 27, 22]  # 複数ピンをリストで管理

for pin in LEDS:
    GPIO.setup(pin, GPIO.OUT, initial=GPIO.LOW)

# 全部点灯
for pin in LEDS:
    GPIO.output(pin, GPIO.HIGH)

# 全部消灯（まとめて書く方法）
GPIO.output(LEDS, GPIO.LOW)  # リストごと渡せる
```

---

## 5. 入力（Input）— スイッチを読む

### 基本：ピンの状態を読む

```python
import RPi.GPIO as GPIO
from time import sleep

BTN = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(BTN, GPIO.IN, pull_up_down=GPIO.PUD_UP)  # 内部プルアップ（後述）

try:
    while True:
        state = GPIO.input(BTN)          # HIGH(1) か LOW(0) を返す
        print("押されている" if state == GPIO.LOW else "離れている")
        sleep(0.1)
except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()
```

`GPIO.input()` が返す値：

| 状態 | 戻り値 | 定数 |
|------|--------|------|
| 電圧あり（3.3V） | 1 | `GPIO.HIGH` |
| 電圧なし（0V）   | 0 | `GPIO.LOW`  |

---

## 6. プルアップ / プルダウン抵抗

スイッチをそのまま GPIO に繋ぐと、離した状態のピンの電圧が「不定」になります（ノイズを拾ってランダムに HIGH / LOW になる）。これを防ぐのが**プルアップ / プルダウン抵抗**です。

### プルアップ（PUD_UP）

```
3.3V ──┬── GPIO ピン
        │
       抵抗（内部）
        │
       スイッチ
        │
       GND
```

- スイッチを**離す** → ピンは 3.3V（HIGH）
- スイッチを**押す** → ピンは GND（LOW）

**押す = LOW になる**。直感と逆に感じますが、これが最も一般的な配線です。

```python
GPIO.setup(BTN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

if GPIO.input(BTN) == GPIO.LOW:  # 押されている
    ...
```

### プルダウン（PUD_DOWN）

```
GND ──┬── GPIO ピン
       │
      抵抗（内部）
       │
      スイッチ
       │
      3.3V
```

- スイッチを**離す** → ピンは GND（LOW）
- スイッチを**押す** → ピンは 3.3V（HIGH）

```python
GPIO.setup(BTN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

if GPIO.input(BTN) == GPIO.HIGH:  # 押されている
    ...
```

### プルアップ/ダウンなし（PUD_OFF）

外付けで抵抗を配線している場合に使います。

```python
GPIO.setup(BTN, GPIO.IN, pull_up_down=GPIO.PUD_OFF)
```

> **どちらを使えばいい？**
> 外付け抵抗を省ける**内部プルアップ（PUD_UP）を使うのが一番シンプル**です。
> ただし「押す = LOW」になることを忘れないようにしましょう。

---

## 7. チャタリングと対策

物理スイッチは押した瞬間に接点がバウンドして、一瞬だけ「押す → 離す → 押す」を繰り返します。これを**チャタリング**と言います。
プログラムはそれをすべて検知してしまうため、1回押したのに複数回反応することがあります。

### 対策1: `sleep` で様子を見る（ポーリング時）

```python
prev = GPIO.HIGH

while True:
    curr = GPIO.input(BTN)
    if curr == GPIO.LOW and prev == GPIO.HIGH:
        # 立ち下がり検出
        sleep(0.02)                    # 20ms 待ってから再確認
        if GPIO.input(BTN) == GPIO.LOW:  # まだ押されていれば本物
            print("押された")
    prev = curr
    sleep(0.005)
```

### 対策2: `bouncetime` を指定する（イベント駆動時）

```python
GPIO.add_event_detect(BTN, GPIO.FALLING, callback=on_press, bouncetime=200)
#                                                             ↑ 200ms 以内の連続検知を無視
```

`bouncetime` は**ミリ秒単位**。200ms が一般的な値。短すぎると誤検知が残り、長すぎると連打に反応しなくなります。

### 対策3: 「離されるまで待つ」で誤動作を防ぐ

```python
def wait_release(btn_pin):
    while GPIO.input(btn_pin) == GPIO.LOW:
        sleep(0.01)   # 離されるまでここで待機
```

ゲームのような「1回の押しで1回だけ動く」ロジックに特に有効です。

---

## 8. イベント駆動（割り込み）

`while` ループで延々とピンを読み続ける「ポーリング」は、CPU を無駄に使います。
代わりに「押された瞬間に関数を呼ぶ」仕組みが**イベント駆動（割り込み）**です。

### `add_event_detect` の使い方

```python
import RPi.GPIO as GPIO
from signal import pause

LED = 17
BTN = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(LED, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(BTN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

state = False

def on_press(channel):
    """ボタンが押されたときに呼ばれる（コールバック関数）"""
    global state
    state = not state          # ON / OFF 切り替え
    GPIO.output(LED, state)
    print(f"LED: {'ON' if state else 'OFF'}")

# 検知するエッジの種類を指定して登録する
GPIO.add_event_detect(
    BTN,              # 監視するピン
    GPIO.FALLING,     # 検知するエッジ（HIGH→LOWへ落ちる瞬間）
    callback=on_press,  # 呼び出す関数
    bouncetime=200    # チャタリング対策（ms）
)

try:
    pause()           # イベントを待つだけ。while True + sleep の代わり
except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()
```

### エッジの種類

| 定数 | 意味 | 用途 |
|------|------|------|
| `GPIO.FALLING` | HIGH → LOW | プルアップ配線でボタンを押した瞬間 |
| `GPIO.RISING`  | LOW → HIGH | プルアップ配線でボタンを離した瞬間 |
| `GPIO.BOTH`    | 両方        | 押した瞬間と離した瞬間の両方を検知 |

### イベントが発生したか確認する

コールバックを使わず、自分でチェックする方法もあります。

```python
GPIO.add_event_detect(BTN, GPIO.FALLING)

while True:
    if GPIO.event_detected(BTN):
        print("押された")
    sleep(0.05)
```

### イベント検知を削除する

```python
GPIO.remove_event_detect(BTN)
```

---

## 9. PWM — 明るさ・速さを変える

GPIO は HIGH / LOW の 2値しか出力できませんが、**高速に ON/OFF を繰り返す**ことで「見かけ上の中間電圧」を作れます。これが **PWM（Pulse Width Modulation、パルス幅変調）**です。

```
デューティ比 25%:  ■□□□ ■□□□ ■□□□ ...  → 暗い（25% の明るさ）
デューティ比 50%:  ■■□□ ■■□□ ■■□□ ...  → 中程度
デューティ比 75%:  ■■■□ ■■■□ ■■■□ ...  → 明るい
デューティ比100%:  ■■■■ ■■■■ ■■■■ ...  → 最大（常時 ON）
```

### 基本の使い方

```python
import RPi.GPIO as GPIO
from time import sleep

LED = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(LED, GPIO.OUT)

pwm = GPIO.PWM(LED, 1000)  # PWM オブジェクト作成（周波数 1000Hz）
pwm.start(0)               # デューティ比 0%（消灯）でスタート

try:
    while True:
        # じわっと明るく
        for duty in range(0, 101, 5):
            pwm.ChangeDutyCycle(duty)
            sleep(0.05)
        # じわっと暗く
        for duty in range(100, -1, -5):
            pwm.ChangeDutyCycle(duty)
            sleep(0.05)
except KeyboardInterrupt:
    pass
finally:
    pwm.stop()         # PWM を止める（cleanup の前に必要）
    GPIO.cleanup()
```

### 周波数の選び方

| 用途 | 推奨周波数 |
|------|-----------|
| LED の調光 | 100〜1000 Hz（高いほどチラつきなし） |
| サーボモーター | **50 Hz**（規格で決まっている） |
| ブザーで音を出す | 音程の周波数（例：ラ = 440 Hz） |

### サーボモーターの制御

サーボは PWM の**パルス幅（時間）**で角度を指定します。周波数は 50Hz 固定。

```python
SERVO = 18

GPIO.setup(SERVO, GPIO.OUT)
pwm = GPIO.PWM(SERVO, 50)   # 50Hz 固定
pwm.start(0)

def set_angle(angle):
    """0〜180 度でサーボを動かす"""
    # 角度をデューティ比（2.5〜12.5）に変換
    duty = 2.5 + (angle / 180.0) * 10.0
    pwm.ChangeDutyCycle(duty)
    sleep(0.3)   # 動き終わるまで待つ
    pwm.ChangeDutyCycle(0)   # 保持電流を切る（発熱防止）

try:
    set_angle(0)    # 0度
    set_angle(90)   # 90度
    set_angle(180)  # 180度
except KeyboardInterrupt:
    pass
finally:
    pwm.stop()
    GPIO.cleanup()
```

### ブザーで音を出す

```python
BUZZER = 17

GPIO.setup(BUZZER, GPIO.OUT)
pwm = GPIO.PWM(BUZZER, 440)  # 440Hz = ラ（A4）

pwm.start(50)   # デューティ比 50% で鳴らす
sleep(0.5)
pwm.stop()
GPIO.cleanup()

# 音程を変えるには ChangeDutyCycle ではなく ChangeFrequency を使う
pwm.ChangeFrequency(523)  # 523Hz = ド（C5）
```

---

## 10. 複数ピンの管理とクラス化

LED とボタンが複数になると、変数が増えてコードが散らかります。
**クラス**にまとめると、関連する部品と操作を1つの単位にできます。

### クラス化の前（散らかった状態）

```python
led1, btn1 = 17, 18
led2, btn2 = 27, 23
led3, btn3 = 22, 24

GPIO.setup(led1, GPIO.OUT)
GPIO.setup(btn1, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(led2, GPIO.OUT)
GPIO.setup(btn2, GPIO.IN, pull_up_down=GPIO.PUD_UP)
# ...どんどん増える
```

### クラス化した後

```python
import RPi.GPIO as GPIO
from time import sleep

class Pad:
    """LED + ボタンを1組にした部品クラス"""

    def __init__(self, led_pin, btn_pin, name):
        self.led_pin = led_pin
        self.btn_pin = btn_pin
        self.name = name
        GPIO.setup(led_pin, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(btn_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    def on(self):
        GPIO.output(self.led_pin, GPIO.HIGH)

    def off(self):
        GPIO.output(self.led_pin, GPIO.LOW)

    def flash(self, duration=0.4):
        """指定秒数だけ光らせる"""
        self.on()
        sleep(duration)
        self.off()

    def is_pressed(self):
        """押されていれば True"""
        return GPIO.input(self.btn_pin) == GPIO.LOW

    def wait_press(self):
        """押されるまでブロックする"""
        while not self.is_pressed():
            sleep(0.01)
        while self.is_pressed():   # 離されるまで待つ
            sleep(0.01)


# ─── 使う側 ───
GPIO.setmode(GPIO.BCM)

pads = [
    Pad(17, 18, "red"),
    Pad(27, 23, "green"),
    Pad(22, 24, "blue"),
]

try:
    # 赤 → 緑 → 青 と順番に点滅
    for pad in pads:
        pad.flash()
        sleep(0.2)

    # どれかが押されるまで待つ
    print("ボタンを押してください")
    while True:
        for pad in pads:
            if pad.is_pressed():
                print(f"{pad.name} が押された")

except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()
```

### クラス化のポイント

- `__init__` の中で `GPIO.setup` を呼ぶ → **Pad を作るだけでセットアップ完了**
- メソッド名はやりたいこと（`flash`、`is_pressed`）にする → **メイン側のコードが読みやすくなる**
- ピン番号や GPIO の細かい操作はクラスの中に隠れる → **変更したいときはクラスだけ直せばいい**

---

## 11. よくあるエラーと対処

### `RuntimeWarning: This channel is already in use`

前回の実行で `GPIO.cleanup()` が呼ばれなかったのが原因。

```python
# 対処法1：警告を抑制する（根本解決ではない）
GPIO.setwarnings(False)

# 対処法2：cleanup してから再実行（ターミナルで）
python3 -c "import RPi.GPIO as GPIO; GPIO.cleanup()"

# 根本解決：必ず try / finally で cleanup を書く
```

### `RuntimeError: Not running on a RPi!`

ラズパイ以外のマシン（開発用PCなど）で実行しようとしている。
GPIOはラズパイのハードに直接アクセスするので、ラズパイ上でのみ動きます。

### LED が光らない

配線を確認するチェックリスト：

```
□ GND に繋がっているか
□ 抵抗を挟んでいるか（330Ω 前後。ないと LED が壊れる）
□ LED の向き（長い足がプラス側）
□ GPIO.setup で OUT を指定しているか
□ GPIO.setmode を呼んでいるか
□ BCM と BOARD を混在させていないか
```

### ボタンが反応しない / 誤動作する

```
□ pull_up_down を指定しているか
□ PUD_UP なら「押す = LOW」になっているか確認
□ チャタリングが疑われる → bouncetime または sleep を入れる
□ 配線：ボタンの片足が GPIO、もう片足が GND になっているか（PUD_UP の場合）
```

### `ModuleNotFoundError: No module named 'RPi'`

```bash
# Pi OS Bookworm 以降
sudo apt install python3-rpi-lgpio

# または（Pi 4 以前）
sudo apt install python3-rpi.gpio
```

---

## 12. チートシート

### よく使う関数一覧

```python
# 初期化
GPIO.setmode(GPIO.BCM)                          # BCM 番号を使う
GPIO.setwarnings(False)                          # 警告を抑制

# ピン設定
GPIO.setup(pin, GPIO.OUT)                        # 出力
GPIO.setup(pin, GPIO.OUT, initial=GPIO.LOW)      # 出力（初期値指定）
GPIO.setup(pin, GPIO.IN)                         # 入力
GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)   # 入力 + プルアップ
GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # 入力 + プルダウン

# 出力
GPIO.output(pin, GPIO.HIGH)   # HIGH（3.3V）出力
GPIO.output(pin, GPIO.LOW)    # LOW（0V）出力
GPIO.output(pin, True)        # HIGH（True / False でも書ける）
GPIO.output([p1, p2], GPIO.HIGH)  # 複数ピンをまとめて制御

# 入力
val = GPIO.input(pin)         # HIGH(1) か LOW(0) を返す

# PWM
pwm = GPIO.PWM(pin, freq)     # PWM オブジェクト生成（freq は Hz）
pwm.start(duty)               # 開始（duty は 0〜100 の %）
pwm.ChangeDutyCycle(duty)     # デューティ比を変更
pwm.ChangeFrequency(freq)     # 周波数を変更
pwm.stop()                    # 停止

# イベント駆動
GPIO.add_event_detect(pin, edge, callback=fn, bouncetime=ms)
GPIO.event_detected(pin)      # True / False を返す
GPIO.remove_event_detect(pin) # 検知を削除

# 後始末
GPIO.cleanup()                # 全ピンをリセット
GPIO.cleanup(pin)             # 指定ピンだけリセット
```

### エッジ定数

```python
GPIO.RISING   # LOW → HIGH
GPIO.FALLING  # HIGH → LOW
GPIO.BOTH     # 両方
```

### HIGH / LOW の真偽値

```python
GPIO.HIGH == 1 == True
GPIO.LOW  == 0 == False
```

### コードのテンプレート（コピペ用）

```python
import RPi.GPIO as GPIO
from time import sleep

# ピン定数
LED = 17
BTN = 18

# 初期化
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(BTN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
    while True:
        # ─ ここに処理を書く ─
        pass

except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()
```

---

*このドキュメントは Raspberry Pi 5 + rpi-lgpio（RPi.GPIO 互換）環境を基準に書いています。*
*Pi 4 以前でも、同じコードがそのまま動きます。*