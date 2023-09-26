# aiken/int

## Function

1. compare(left: Int, right: Int) -> Ordering

- So sánh hai số nguyên.

```aiken
int.compare(14, 42) == Less
int.compare(14, 14) == Equal
int.compare(42, 14) == Greater
```

2. from_utf8(bytes: ByteArray) -> Option<Int>

- Phân tích cú pháp số nguyên từ 'ByteArray' được mã hóa utf-8, khi có thể.

```
int.from_utf8("14") == Some(14)
int.from_utf8("-42") == Some(-42)
int.from_utf8("007") == Some(7)
int.from_utf8("foo") == None
int.from_utf8("1.0") == None
int.from_utf8("1-2") == None
```