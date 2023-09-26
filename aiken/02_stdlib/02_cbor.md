# aiken/cbor

## Function

1. diagnostic(self: Data) -> String

- Lấy một chuỗi biểu diễn của bất kỳ thứ gì . Điều này đặc biệt (và duy nhất) hữu ích cho việc theo dõi và gỡ lỗi. Hàm này đắt tiền và không nên sử dụng trong bất kỳ mã sản xuất nào vì nó rất có thể sẽ làm tiêu tốn ngân sách của người xác nhận. Đầu ra là chẩn đoán CBOR về biểu diễn nhị phân cơ bản trên chuỗi của dữ liệu. Nó không dễ đọc như mã Aiken đơn giản, nhưng nó rất hữu ích để khắc phục sự cố các giá trị khi chạy . Ngẫu nhiên, làm quen với việc đọc chẩn đoán CBOR là một ý tưởng hay trong thế giới Cardano.

```aiken
diagnostic(42) == "42"
diagnostic(#"a1b2") == "h'A1B2'"
diagnostic([1, 2, 3]) == "[_ 1, 2, 3]"
diagnostic([]) == "[]"
diagnostic((1, 2)) == "[_ 1, 2]"
diagnostic((1, #"ff", 3)) == "[_ 1, h'FF', 3]"
diagnostic([(1, #"ff")]) == "{_ 1: h'FF' }"
diagnostic(Some(42)) == "121([_ 42])"
diagnostic(None) == "122([])"
```

2. serialise(self: Data) -> ByteArray

- Nối tiếp bất kỳ giá trị nào thành nhị phân, mã hóa bằng CBOR . Điều này đặc biệt hữu ích khi kết hợp với các hàm băm, như một cách để có được biểu diễn byte khớp với biểu diễn tuần tự được sổ cái sử dụng trong ngữ cảnh mã trên chuỗi. Lưu ý rằng đầu ra khớp với đầu ra của diagnostic, mặc dù có mã hóa khác. diagnosticchỉ đơn thuần là sự thể hiện bằng văn bản của mã hóa CBOR thân thiện với con người và hữu ích cho việc gỡ lỗi.

```aiken
serialise(42) == #"182a"
serialise(#"a1b2") == #"42a1b2"
serialise([]) == #"80"
serialise((1, 2)) == #"9f0102ff"
serialise((1, #"ff", 3)) == #"9f0141ff03ff"
serialise([(1, #"ff")]) == #"a10141ff"
serialise(Some(42)) == #"d8799f182aff"
serialise(None) == #"d87a80"
```