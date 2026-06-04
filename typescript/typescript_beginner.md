# TypeScript 初学者ガイド

## TypeScriptとは？

TypeScript は Microsoft が開発した **JavaScript のスーパーセット**（上位互換）言語です。
JavaScript に **静的型付け** と **クラスベースのオブジェクト指向** を追加したもので、
最終的にはブラウザやNode.jsで動かせる JavaScript にコンパイルされます。

```
TypeScript → コンパイル（tsc） → JavaScript → 実行
```

### JavaScriptとの主な違い

| 特徴 | JavaScript | TypeScript |
|------|-----------|-----------|
| 型システム | 動的（実行時に判定） | 静的（コンパイル時に検査） |
| 型エラー検出 | 実行後にわかる | コーディング中にわかる |
| IDEサポート | 普通 | 強力（補完・エラー表示） |
| 学習コスト | 低い | 少し高い（でもすぐ慣れる） |

---

## 環境セットアップ

```bash
# Node.js がインストール済みであることを確認
node -v

# TypeScript をグローバルインストール
npm install -g typescript

# バージョン確認
tsc -v

# TypeScriptファイルをコンパイル
tsc hello.ts

# 実行
node hello.js
```

> **ts-node** を使えばコンパイルなしで直接実行できます
> ```bash
> npm install -g ts-node
> ts-node hello.ts
> ```

---

## 基本的な型

### プリミティブ型

```typescript
let name: string = "太郎";
let age: number = 25;
let isStudent: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

### 型推論
型を省略しても TypeScript が自動で推論してくれます。

```typescript
let city = "東京";        // string と推論
let count = 0;            // number と推論
let flag = false;         // boolean と推論
```

### any 型（なるべく使わない）
型チェックを無効化する「逃げ道」。基本的に使用は避けましょう。

```typescript
let data: any = "文字列でも";
data = 42;          // 数値でも
data = true;        // booleanでも OK（型の恩恵がなくなる）
```

### unknown 型（any より安全）
型が不明な場合は `any` より `unknown` を使うのが安全です。

```typescript
let input: unknown = getUserInput();

// unknown は使う前に型チェックが必要
if (typeof input === "string") {
  console.log(input.toUpperCase()); // ここでは string として使える
}
```

---

## 配列・タプル

```typescript
// 配列
let fruits: string[] = ["りんご", "バナナ", "みかん"];
let scores: number[] = [90, 85, 78];

// Array<T> 記法でも書ける
let items: Array<string> = ["A", "B", "C"];

// タプル（各要素の型が固定の配列）
let person: [string, number] = ["花子", 20];
// person[0] は string、person[1] は number
```

---

## オブジェクト型とインターフェース

### インターフェース（Interface）
オブジェクトの「形（shape）」を定義します。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;   // ? をつけると省略可能（オプショナル）
}

const user: User = {
  id: 1,
  name: "田中",
  email: "tanaka@example.com",
  // age は省略してもOK
};
```

### 型エイリアス（Type Alias）
`type` キーワードでも型を定義できます。

```typescript
type Point = {
  x: number;
  y: number;
};

type ID = string | number;  // ユニオン型にも使える
```

**Interface vs Type の使い分け**
- オブジェクトの形を定義するなら → `interface`（拡張しやすい）
- ユニオン型や複雑な型表現 → `type`

---

## 関数の型

```typescript
// 引数と戻り値に型をつける
function add(a: number, b: number): number {
  return a + b;
}

// アロー関数
const multiply = (x: number, y: number): number => x * y;

// オプショナル引数
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "こんにちは"}, ${name}！`;
}

// デフォルト引数
function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}

// 戻り値なし → void
function log(message: string): void {
  console.log(message);
}
```

---

## ユニオン型とリテラル型

### ユニオン型（`|`）
複数の型のどれかを受け入れます。

```typescript
let id: string | number;
id = "abc123";  // OK
id = 42;        // OK
id = true;      // エラー！

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

### リテラル型
特定の値だけを許可します。

```typescript
type Direction = "up" | "down" | "left" | "right";
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

let move: Direction = "up";   // OK
move = "diagonal";            // エラー！
```

---

## ジェネリクス（Generics）

型を「パラメータ」として受け取る仕組みで、再利用性が高まります。

```typescript
// T は型パラメータ（任意の名前でOK）
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // string型
identity<number>(42);       // number型
identity("world");          // 型推論で自動的に string

// ジェネリクスを使った配列の先頭要素を返す関数
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first([1, 2, 3]);           // number | undefined
first(["a", "b", "c"]);     // string | undefined
```

---

## クラス

```typescript
class Animal {
  // アクセス修飾子：public（デフォルト）/ private / protected
  private name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // コンストラクタの省略記法（上と同じ意味）
  // constructor(private name: string, protected age: number) {}

  speak(): void {
    console.log(`私は${this.name}です`);
  }

  getName(): string {
    return this.name;
  }
}

// 継承
class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);   // 親クラスのコンストラクタを呼ぶ
    this.breed = breed;
  }

  speak(): void {
    console.log(`ワン！（${this.getName()}）`);
  }
}

const dog = new Dog("ポチ", 3, "柴犬");
dog.speak();  // ワン！（ポチ）
```

---

## 型アサーション（Type Assertion）

コンパイラに「この型として扱って」と教える構文。

```typescript
// as 構文（推奨）
const input = document.getElementById("name") as HTMLInputElement;
console.log(input.value);

// <型> 構文（JSX では使えない）
const input2 = <HTMLInputElement>document.getElementById("name");
```

> ⚠️ 型アサーションは型チェックを強制的に上書きするため、誤用すると実行時エラーになります。確信がある場合のみ使用しましょう。

---

## Enum（列挙型）

関連する定数をまとめて管理できます。

```typescript
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

let userStatus: Status = Status.Active;
console.log(userStatus);  // "ACTIVE"

// 数値 Enum
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
```

---

## よくある型ユーティリティ

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T>：すべてのプロパティをオプショナルにする
type PartialUser = Partial<User>;
// → { id?: number; name?: string; email?: string; age?: number }

// Required<T>：すべてのプロパティを必須にする
type RequiredUser = Required<PartialUser>;

// Readonly<T>：すべてのプロパティを読み取り専用にする
const readonlyUser: Readonly<User> = { id: 1, name: "A", email: "a@a.com", age: 20 };
// readonlyUser.name = "B";  // エラー！

// Pick<T, K>：特定のプロパティだけ選ぶ
type UserPreview = Pick<User, "id" | "name">;
// → { id: number; name: string }

// Omit<T, K>：特定のプロパティを除く
type UserWithoutEmail = Omit<User, "email">;
// → { id: number; name: string; age: number }
```

---

## tsconfig.json の基本

プロジェクトルートに置く TypeScript の設定ファイルです。

```json
{
  "compilerOptions": {
    "target": "ES2020",          // 出力するJSのバージョン
    "module": "commonjs",        // モジュール形式
    "strict": true,              // 厳格な型チェックを有効化（推奨）
    "outDir": "./dist",          // コンパイル先フォルダ
    "rootDir": "./src",          // ソースファイルのフォルダ
    "esModuleInterop": true,     // CommonJS モジュールのデフォルトimportを許可
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

> `"strict": true` は必ず有効にしましょう。型安全性が格段に上がります。

---

## 学習ロードマップ

```
1. 基本型・型推論
        ↓
2. インターフェース・型エイリアス
        ↓
3. 関数の型・オプショナル引数
        ↓
4. ユニオン型・リテラル型
        ↓
5. クラス・アクセス修飾子
        ↓
6. ジェネリクス
        ↓
7. 型ユーティリティ（Partial, Pick, Omit...）
        ↓
8. 型ガード・型の絞り込み
        ↓
9. 高度な型（Conditional Types, Mapped Types...）
```

---

## 参考リンク

- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)（ブラウザで試せる）
- [サバイバルTypeScript](https://typescriptbook.jp/)（日本語の超わかりやすい解説）
