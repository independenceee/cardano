# MODULES

- Các chương trình Aiken được tạo thành từ các nhóm chức năng và loại được gọi là mô-đun. Mỗi mô-đun có không gian tên riêng và có thể xuất các loại cũng như giá trị để các mô-đun khác trong chương trình sử dụng.

```aiken
fn count_down() {
    "3... 2... 1..."
}

fn blast_off() {
    "BOOM!"
}

pub fn set_sail() {
    [
        count_down(),
        blast_off(),
    ]
}
```

- Ở đây chúng ta có thể thấy một mô-đun có tên straw_hats/sunny, tên được xác định bởi tên tệp lib/straw_hats/sunny.ak. Thông thường, tất cả các mô-đun cho một dự án sẽ nằm trong một thư mục có tên của dự án, chẳng hạn như straw_hatstrong ví dụ này.
- Từ pubkhóa làm cho loại này có thể sử dụng được từ các mô-đun khác.
- Đối với các hàm count_down và blast_off chúng tôi đã bỏ qua pub từ khóa nên các hàm này là các hàm mô-đun riêng . Chúng chỉ có thể được gọi bởi các 
chức năng khác trong cùng một mô-đun.
- Tất cả các hàm, bí danh loại và hằng số đều có thể được xuất từ ​​một mô-đun bằng pub từ khóa.

# IMPORT 

- Để sử dụng các hàm hoặc loại từ một mô-đun khác, chúng ta cần nhập chúng bằng use từ khóa.

```aiken
use straw_hats/sunny

pub fn find_the_one_piece () {
    sunny.set_sail()
}

```
- Định nghĩa use straw_hats/sunny tạo ra một biến mới có tên sunny và giá trị của sunny mô-đun.
- Trong find_the_one_piece hàm, chúng ta gọi set_sail hàm công khai của mô-đun đã nhập bằng cách sử dụng .toán tử. Nếu chúng tôi cố gắng gọi count_down nó sẽ dẫn đến lỗi thời gian biên dịch vì chức năng này là riêng tư đối với sunny mô-đun.

# NAMED IMPORT 

- Cũng có thể đặt tên tùy chỉnh cho mô-đun khi nhập mô-đun bằng từ as khóa.

```aiken
use unix/dog
use animal/dog as kitty
```

- Điều này có thể hữu ích để phân biệt giữa nhiều mô-đun có cùng tên mặc định khi được nhập.

# UNQUALIFIED IMPORT

- Các giá trị và loại cũng có thể được nhập theo cách không đủ tiêu chuẩn.

```aiken
use animal/dog.{Dog, stroke}

pub fn foo() {
    let puppy = Dog {
        name: "Dog",
        stroke(puppy)
    }
}
``` 

- Điều này có thể hữu ích cho các giá trị được sử dụng thường xuyên trong một mô-đun, nhưng thông thường các thao tác nhập đủ tiêu chuẩn sẽ được ưu tiên hơn vì nó làm cho giá trị được xác định rõ ràng hơn. 

- Bạn cũng có thể kết hợp các mục nhập không đủ tiêu chuẩn với các tên tùy chỉnh như sau:

```aiken
use animal/dog.{ Dog, stroke }
```

# Opaque types

- Đôi khi, có thể hữu ích khi tạo một loại và đặt hàm tạo cũng như các trường ở chế độ riêng tư để người dùng thuộc loại này chỉ có thể sử dụng loại đó thông qua các hàm được xuất công khai.
- Ví dụ: chúng ta có thể tạo một Counterkiểu chứa int có thể tăng lên. Chúng tôi không muốn người dùng thay đổi Intgiá trị ngoài việc tăng giá trị đó, vì vậy chúng tôi có thể làm cho loại này mờ đi để ngăn họ có thể thực hiện việc này.

```aiken
pub opaque type Counter {
  Counter(value: Int)
}
 
pub fn new() {
  Counter(0)
}
 
pub fn increment(counter: Counter) {
  Counter(counter.value + 1)
}
```

- Bởi vì Counter loại đã được đánh dấu là opaque mã trong các mô-đun khác không thể xây dựng hoặc khớp mẫu trên các giá trị bộ đếm hoặc truy cập vào value trường. Thay vào đó, các mô-đun khác phải thao tác loại mờ bằng cách sử dụng các hàm được xuất từ ​​mô-đun, trong trường hợp này new và increment.

# The prelude module

- Có hai mô-đun được tích hợp vào ngôn ngữ, mô-đun đầu tiên là aikenmô-đun khúc dạo đầu. Theo mặc định, loại và giá trị của nó được nhập tự động vào mọi mô-đun bạn viết, nhưng bạn vẫn có thể chọn nhập nó theo cách thông thường. Điều này có thể hữu ích nếu bạn đã tạo một loại hoặc giá trị có cùng tên với một mục từ phần mở đầu.

```aiken
use aiken
pub type Option {
  Some
}

pub fn go() -> aiken.Option<Int> {
  aiken.Some(1)
}
```

# The builtin module

Mô-đun thứ hai đi kèm với ngôn ngữ này dùng để hiển thị các hàm dựng sẵn hữu ích từ lõi Plutus. Hầu hết các hàm nền tảng cơ bản đều có sẵn ở đây bằng tên "snake_case". Phần lớn cú pháp của Aiken cuối cùng được biên dịch thành sự kết hợp của một số bultin nhất định nhưng nhiều cú pháp không được "trình bày" thông qua cú pháp và cần được sử dụng trực tiếp. Thư viện tiêu chuẩn bao bọc những thứ này trong một giao diện thân thiện với Aiken hơn nên có thể bạn sẽ không bao giờ cần sử dụng chúng trực tiếp trừ khi bạn tạo thư viện tiêu chuẩn của riêng mình.

```aiken
use aiken/builtin

fn eq(a, b) {
    builtin.equals_integer(a, b)
}
  
a == b
```