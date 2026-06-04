// OKの出力
fun start(): String = "OK"

// fun joinToString(
//     separator: String = ", ", // 要素と要素の間に入る文字
//     prefix: String = "", // 先頭につける文字
//     postfix: String = "", // 末尾につける文字
// ): String

// joinToString()の名前付き引数を使って、JSON形式の文字列を返す
fun joinOptions(options: Collection<String>) =
        options.joinToString(prefix ="[", postfix = "]")

fun main(){
    println(joinOptions(listOf("a", "b", "c")))
}

// デフォルト引数を使用することで、関数呼び出しの際に引数を省略する
fun foo(name: String, number: Int = 42, toUpperCase: Boolean = false) =
        (if (toUpperCase) name.uppercase() else name) + number
// 名前付き引数を使うことで、引数の順番を変えたり一部を省略できる
fun useFoo() = listOf(
        foo("a"),
        foo("b", number = 1),
        foo("c", toUpperCase = true),
        foo(name = "d", number = 2, toUpperCase = true)
)

// トリプルクォートを使うことで、複数行の文字列を簡単に表現できる
const val question = "life, the universe, and everything"
const val answer = 42

val tripleQuotedString = """
    #question = "$question"
    #answer = $answer""".trimMargin("#")

fun main() {
    println(tripleQuotedString)
}

// 正規表現を使うことで、文字列のパターンを表現できる
val month = "(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)"

fun getPattern(): String = """\d{2} $month \d{4}"""

