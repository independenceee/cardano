# Custom Type

- Các loại tùy chỉnh của Aiken được đặt tên là tập hợp các khóa và/hoặc giá trị. Chúng tương tự như các đối tượng trong ngôn ngữ hướng đối tượng, mặc dù chúng không có phương thức.

- Các loại tùy chỉnh được xác định bằng type từ khóa.

```aiken
type Datum {
    Datum { signer: ByteArray, count: Int }
}
```

- Ở đây chúng tôi đã xác định một loại tùy chỉnh được gọi là Datum. Hàm tạo của nó được gọi Datum và nó có hai trường: Một signer trường là a ByteArray và một count trường là Int.

- Sau khi xác định loại tùy chỉnh có thể được sử dụng trong các hàm:

```aiken
fn datums() {
    let datum1 = Datum { signer: #[0xAA, 0xBB], count: 2001 }
    let datum2 = Datum { count: 1805, signer: #[0xAA, 0xCC] }
    [datum1, datum2]
}
```

# Shorthand notation

- Bởi vì các hàm tạo đơn lẻ khá phổ biến nên tồn tại một ký hiệu tốc ký đặc biệt khi kiểu và hàm tạo có cùng tên. Vì vậy, thay vì ở trên, người ta có thể viết:

```aiken
type Datum {
  signer: ByteArray,
  count: Int
}
```

- Hai ký hiệu này là từ đồng nghĩa. Với cách viết tắt này, chúng tôi ngầm chỉ ra rằng có một hàm tạo duy nhất được đặt tên Datumcó thể được sử dụng để xây dựng các giá trị thuộc loại Datumhoặc cũng có thể được sử dụng khi cấu trúc (xem bên dưới).

# Multiple constructors

- Các loại tùy chỉnh trong Aiken có thể được xác định bằng nhiều hàm tạo, biến chúng thành một cách mô hình hóa dữ liệu có thể là một trong một số biến thể khác nhau.

- Chúng tôi đã thấy một loại tùy chỉnh có nhiều hàm tạo trong Tham quan ngôn ngữ - Bool.

- Kiểu tích hợp của Aiken Boolđược định nghĩa như thế này:

```aiken
type Bool {
  True
  False
}
```

- Đó là một kiểu tùy chỉnh đơn giản với các hàm tạo không có đối số nào cả! Sử dụng nó để trả lời các câu hỏi có/không và để cho biết điều gì đó là True hay False.

- Các bản ghi được tạo bởi các hàm tạo khác nhau cho một loại tùy chỉnh có thể chứa các giá trị khác nhau. Ví dụ: một Userloại tùy chỉnh có thể có một LoggedIn hàm tạo tạo các bản ghi có tên và một Guesthàm tạo tạo các bản ghi không chứa bất kỳ giá trị nào.

```aiken
type User {
  LoggedIn { count: Int }  // A logged in user
  Guest                    // A guest user with no details
}

let user1 = LoggedIn { count: 4 }
let user2 = LoggedIn { count: 2 }
let visitor = Guest

```

## Options

```aiken
type Option<a> {
    None
    Some(a)
}

fn get_head(a: List<a>) -> Option<a> {
    when a is {
        [a, ..] -> Some(a)
        [] -> None
    }
}
```