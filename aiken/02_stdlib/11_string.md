# aiken/string

1. concat(left: String, right: String) -> String

- kết hợp 2 chuỗi string lại với nhau

```aiken
string.concat(left: @"Hello", right: @"world!") == @"hello world!"
```

2. from_bytearray(bytes: ByteArray) -> String

- Chuyển đổi 1 ByteArray sang 1 String

```aiken
string.from_bytearray("foo") == @"foo"
string.from_bytearray(#"666f6f") == @"foo"
```

3. from_int(n: Int) -> String

- Chuyển đổi int thành biểu diễn String

```aiken
string.from_int(42) == @"42"
```

4. join(list: List<String>, delimiter: String) -> String

- Nối một danh sách các chuỗi, được phân tách bằng dấu phân cách nhất định.

```aiken
string.join([], @"+") == @""
string.join([@"a", @"b", @"c"], @",") == @"a,b,c"
```

5. to_bytearray(self: String) -> ByteArray

- Chuyển đổi một chuỗi thành ByteArray

```aiken
string.to_bytearray(@"foo") == "foo"
```