// val num: Int = 1 データ変更不可
// var name: String = "Kotlin" データ変更可能
fun main(){
    val num1: Int = 1
    var num2: Int = 2
    println(num1)
    println(num2)
    // val num1 Int = 3 エラーになる
    var num2 Int = 4
    println(num1)
    println(num2)
}

fun main(){
    var var1:Byte = 1;
    var var2:Short = 12345;
    var var3:Int = 123456789;
    var var4:Long = 123456789012345L;
}

fun main(){
    var var1:Double = 1.23456789;
    var var2:Float = 1.23F;

    println(var1)
    println(var2)
}

// Char 文字一つ String 二文字以上文字列
fun main(){
    var var1:Char = 'c';
    var var2:String = "Hello, Kotlin!";

    println(var1)
    println(var2)
}

fun main(){
    val var_a:Int = 10;
    val var_b:Int = 1;
    var var_bool: Boolean;

    var_bool = (var_a > var_b);
    println(var_bool);
}

fun main(){
    val var01 = 1;
    val var01 = 12345;
    val var03 = 1234567890;
    val var04 = 123456789000;

    println(var01.javaClass.kotlin)
    println(var02.javaClass.kotlin)
    println(var03.javaClass.kotlin)
    println(var04.javaClass.kotlin)
}