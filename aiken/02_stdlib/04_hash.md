# aiken/hash => OK

- Mô-đun này xác định Hash, một bí danh loại tự ghi lại với loại ảo để dễ đọc.

- Trên chuỗi, bất kỳ giá trị băm nào được biểu thị dưới dạng 'ByteArray' đơn giản. Mặc dù trong thực tế, hàm băm đến từ nhiều nguồn khác nhau và có ngữ nghĩa khác nhau.

- Do đó, mặc dù bí danh loại này không cung cấp bất kỳ sự đảm bảo loại mạnh mẽ nào, nhưng nó giúp viết chữ ký hàm với các loại có ý nghĩa hơn chỉ là 'ByteArray'.

So sánh chẳng hạn:

```aiken
pub type Credential {
    VerificationKeyCredential(ByteArray)
    ScriptCredential(ByteArray)
}

pub type Credential {
    VerificationKeyCredential(Hash<Blake2b_224, VerificationKey>)
    ScriptCredential(Hash<Blake2b_224, Script>)
}
```

Cả hai đều hoàn toàn tương đương, nhưng cái thứ hai đọc tốt hơn nhiều.


## Types

1. Blake2b_224

- Thuật toán băm blake2b-224.
- Thường được sử dụng cho:
    + Credential
    + PolicyId
- Lưu ý: không có chức năng nào để tính toán các bản tóm tắt băm blake2b-224 trên chuỗi.

2. Blake2b_256

- Thuật toán băm blake2b-256.
- Thường được sử dụng cho:
    + TransactionId

3. Hash<alg, a>

- A Hashkhông gì khác hơn là a ByteArray, nhưng nó mang thêm thông tin để dễ đọc.

Hash<alg, a> = ByteArray

4. Sha2_256

- A SHA2-256 hash algorithm.

5. Sha3_256

- A SHA3-256 hash algorithm.

## Functions

1. blake2b_256(bytes: ByteArray) -> Hash<Blake2b_256, a>

- Tính toán bản tóm tắt băm blake2b-256 của một số dữ liệu.

2. sha2_256(bytes: ByteArray) -> Hash<Sha2_256, a>

- Tính toán bản tóm tắt băm sha2-256 của một số dữ liệu.

3. sha3_256(bytes: ByteArray) -> Hash<Sha3_256, a>

- Tính toán bản tóm tắt băm sha3-256 của một số dữ liệu.