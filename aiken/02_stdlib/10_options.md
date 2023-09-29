# aiken/option => OK

## Functions

1. and_then(self: Option<a>, then: fn(a) -> Option<result>) -> Option<result>

- Xâu chuỗi nhiều phép tính có thể thất bại.

```aiken
self
  |> dict.get(policy_id)
  |> option.and_then(dict.get(_, asset_name))
  |> option.or_else(0)
```

2. choice(self: List<Option<a>>) -> Option<a>

- Chọn phần tử đầu tiên không phải là Không. Nếu không có phần tử nào như vậy, hãy trả về Không.

```aiken
option.choice([]) == None
option.choice([Some(14), Some(42)]) == Some(14)
option.choice([None, Some(42)]) == Some(42)
option.choice([None, None]) == None
```

3. flatten(opt: Option<Option<a>>) -> Option<a>

- Chuyển đổi từ Option<Option<a>>sang Option<a>.

```aiken
option.flatten(Some(Some(42))) == Some(42)
option.flatten(Some(None)) == None
option.flatten(None) == None
```

- Việc làm phẳng chỉ loại bỏ một cấp độ lồng nhau tại một thời điểm:

```aiken
flatten(Some(Some(Some(42)))) == Some(Some(42))
Some(Some(Some(42))) |> flatten |> flatten == Some(42)
```

4. is_none(self: Option<a>) -> Bool

- Xác nhận xem một tùy chọn có phải là None.

5. is_some(self: Option<a>) -> Bool

- Xác nhận xem một tùy chọn có phải là Some, bất kể giá trị mà nó chứa hay không.

6. map(self: Option<a>, with: fn(a) -> result) -> Option<result>

- Áp dụng hàm cho giá trị bên trong của mộtOption

```aiken
option.map(None, fn(n) { n * 2 }) == None
option.map(Some(14), fn(n) { n * 2 }) == Some(28)
```

7. map2(
  opt_a: Option<a>,
  opt_b: Option<b>,
  with: fn(a, b) -> result,
) -> Option<result>

- Kết hợp hai Optionlại với nhau.

```aiken
type Foo {
  Foo(Int, Int)
}

option.map2(Some(14), Some(42), Foo) == Some(Foo(14, 42))
option.map2(None, Some(42), Foo) == None
option.map2(Some(14), None, Foo) == None
```

8. map3(
  opt_a: Option<a>,
  opt_b: Option<b>,
  opt_c: Option<c>,
  with: fn(a, b, c) -> result,
) -> Option<result>

- Kết hợp ba Option lại với nhau.

```aiken
type Foo {
  Foo(Int, Int, Int)
}

option.map3(Some(14), Some(42), Some(1337), Foo) == Some(Foo(14, 42, 1337))
option.map3(None, Some(42), Some(1337), Foo) == None
option.map3(Some(14), None, None, Foo) == None
```

9. or_else(self: Option<a>, default: a) -> a

- Cung cấp giá trị mặc định, biến giá trị tùy chọn thành giá trị bình thường.

```aiken
option.or_else(None, "aiken") == "aiken"
option.or_else(Some(42), 14) == 42
```

10. or_try(self: Option<a>, compute_default: fn(Void) -> Option<a>) -> Option<a>

- Giống như or_elsenhưng cho phép trả về một tệp Option. Đây là cách ánh xạ nhánh lỗi một cách hiệu quả.

```aiken
option.or_try(None, fn(_) { Some("aiken") }) == Some("aiken")
option.or_try(Some(42), fn(_) { Some(14) }) == Some(42)
```