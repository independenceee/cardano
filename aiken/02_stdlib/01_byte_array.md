# aiken/bytearray

## Function

1. compare(left: ByteArray, right: ByteArray) -> Ordering

- So sánh hai bytearray theo từ điển

```aiken
bytearray.compare(#"00", #"FF") == Less
bytearray.compare(#"42", #"42") == Equal
bytearray.compare(#"FF", #"00") == Greater
```

2. concat(left: ByteArray, right: ByteArray) -> ByteArray

- Kết hợp hai bytearray lại với nhau

```aiken
bytearray.concat(left: #[1, 2, 3], right: #[4, 5, 6]) == #[1, 2, 3, 4, 5, 6]
```

3. drop(self: ByteArray, zero: result, with: fn(Int, result) -> result) -> result

- Trả về hậu tố của phần tử a ByteArraysau n.

```aiken
bytearray.drop(#[1, 2, 3], n: 2) == #[3]
```

4. foldl(self: ByteArray, zero: result, with: fn(Int, result) -> result) -> result

- Gấp trái trên byte của a ByteArray. Lưu ý rằng mỗi byte được cung cấp cho hàm gọi lại có giá trị từ 0 đến 255.

```aiken
bytearray.foldl(#"acab", 0, fn(byte, acc) { acc * 256 + byte }) == 44203
bytearray.foldl(#[1, 2, 3], #"", flip(bytearray.push)) == #[3, 2, 1]
```

5. foldr(self: ByteArray, zero: result, with: fn(Int, result) -> result) -> result

- Gấp phải các byte của tệp ByteArray. Lưu ý rằng mỗi byte được cung cấp cho hàm gọi lại có giá trị từ 0 đến 255.

```aiken
bytearray.foldr(#"acab", 0, fn(byte, acc) { acc * 256 + byte }) == 43948
bytearray.foldl(#[1, 2, 3], #"", flip(bytearray.push)) == #[1, 2, 3]
```

6. from_string ( str :  String ) ->  ByteArray

- Chuyển đổi a Stringthành a ByteArray.

```aiken
bytearray.from_string(@"ABC") == #"414243"
```

7. index_of(self: ByteArray, bytes: ByteArray) -> Option<(Int, Int)>

- Tìm kiếm vị trí bắt đầu và kết thúc của một mảng con trong tệp ByteArray.

```aiken
bytearray.index_of("Hello, World!", "World") == Some((7, 11))
bytearray.index_of("Hello, World!", "foo") == None
bytearray.index_of("Hello, World!", "!") == Some((12, 12))
bytearray.index_of("Hello, World!", "o") == Some((4, 4))
bytearray.index_of("Hello, World!", "Hello, World!") == Some((0, 12))
```

8. is_empty(self: ByteArray) -> Bool

- Trả về Truekhi giá trị đã cho ByteArraytrống.

```aiken
bytearray.is_empty(#"") == True
bytearray.is_empty(#"00ff") == False
```

9. length(self: ByteArray) -> Int

- Trả về số byte trong một tệp ByteArray.

```aiken
bytearray.length(#[1, 2, 3]) == 3
```

10. push(self: ByteArray, byte: Int) -> ByteArray

- Thêm phần tử byte vào trước a ByteArray. Khi byte đã cho lớn hơn 255, nó sẽ bao quanh. Vì vậy, 256 được ánh xạ tới 0, 257 thành 1, v.v.

```aiken
bytearray.push(#"", 0) == #"00"
bytearray.push(#"0203", 1) == #"010203"
bytearray.push(#"0203", 257) == #"010203"
```

11. reduce(self: ByteArray, zero: result, with: fn(result, Int) -> result) -> result

- Giảm số byte trong ByteArray từ trái sang phải bằng cách sử dụng bộ tích lũy làm toán hạng bên trái. Nói cách khác, đây là foldlvới các đối số gọi lại được hoán đổi.

```aiken
bytearray.reduce(#[1,2,3], #[], bytearray.push) == #[3, 2, 1]
```

12. slice(self: ByteArray, start: Int, end: Int) -> ByteArray

- Trích xuất một ByteArrayphần của một phần khác ByteArray.
- Các chỉ mục dựa trên 0 và bao gồm.

```aiken
bytearray.slice(#[0, 1, 2, 3, 4, 5, 6], start: 1, end: 3) == #[1, 2, 3]
```

13. take(self: ByteArray, n: Int) -> ByteArray

- Trả về tiền tố có độ dài n của a ByteArray.

```aiken
bytearray.take(#[1, 2, 3], n: 2) == #[1, 2]
```

14. test_bit(self: ByteArray, ix: Int) -> Bool

- Kiểm tra xem một bit (Bit có ý nghĩa nhất đầu tiên) có được đặt trong 'ByteArray' đã cho hay không. Ví dụ: hãy xem xét bytearray sau: #"8b765f". Nó cũng có thể được viết dưới dạng chuỗi bit sau:

```aiken
test_bit(#"8b765f", 0) == True
test_bit(#"8b765f", 1) == False
test_bit(#"8b765f", 2) == False
test_bit(#"8b765f", 3) == False
test_bit(#"8b765f", 7) == True
test_bit(#"8b765f", 8) == False
test_bit(#"8b765f", 20) == True
test_bit(#"8b765f", 21) == True
test_bit(#"8b765f", 22) == True
test_bit(#"8b765f", 23) == True
```

15. to_hex(self: ByteArray) -> String

- Mã hóa a ByteArraydưới dạng thập lục phân String.

```aiken
use aiken/bytearray
bytearray.to_hex("Hello world!") == @"48656c6c6f20776f726c6421"
```

16. to_string(self: ByteArray) -> String

- Chuyển đổi a ByteArraythành a String.

```aiken
bytearray.to_string(#"414243") == "ABC"
```