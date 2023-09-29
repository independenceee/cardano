# aiken/dict

- Một mô-đun để làm việc với từ điển bytearray.
- Những từ điển này về cơ bản là danh sách các cặp khóa-giá trị được sắp xếp theo thứ tự, bảo tồn một số bất biến. Đặc biệt, mỗi khóa chỉ xuất hiện một lần trong từ điển.

## Types

1. Dict<key, value>

- Một tệp Dict. Loại này mờ vì mô-đun duy trì một số bất biến, cụ thể là: chỉ có một lần xuất hiện của một khóa nhất định trong từ điển.

- Lưu ý rằng keytham số này là loại ảo và chỉ hiển thị dưới dạng phương tiện tài liệu. Khóa có thể thuộc bất kỳ loại nào, nhưng sẽ cần phải tương đương để sử dụng các hàm như insert.

```aiken
pub type Value = Dict<PolicyId, Dict<AssetName, Int>>
```

## Functions