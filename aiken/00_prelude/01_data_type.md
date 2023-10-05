# aiken

## types

1. Bool

- A Bool là một giá trị boolean có thể là True hoặc False.

2. Int

- Loại số duy nhất của Aiken là số nguyên có kích thước tùy ý. Điều này có nghĩa là không có hiện tượng tràn hoặc tràn.

42
14
1337

- Các chữ cũng có thể được viết dưới _dạng dấu phân cách để nâng cao khả năng đọc: 

1_000_000

- Aiken cũng hỗ trợ viết các số nguyên ở các cơ số khác ngoài số thập phân. Các số nguyên nhị phân, bát phân và thập lục phân bắt đầu tương ứng bằng 0b, 0o, và 0x.

0b00001111 == 15
0o17 == 15
0xF == 15

3. ByteArray

4. Tuples

5. List

6. Void

7. Data

- A Data là một loại hỗn hợp mờ đục có thể đại diện cho bất kỳ loại nào do người dùng xác định trong Aiken. Chúng ta sẽ tìm hiểu thêm về Datathời điểm chúng tôi đề cập đến các loại tùy chỉnh. Trong khi chờ đợi, hãy coi Dữ liệu như một loại ký tự đại diện có thể đại diện cho bất kỳ giá trị nào.

- Điều này hữu ích khi bạn cần sử dụng các giá trị từ các loại khác nhau trong một cấu trúc đồng nhất. Bất kỳ loại nào do người dùng xác định đều có thể được chuyển thành a Datavà bạn có thể thử chuyển đổi từ Dữ liệu sang bất kỳ loại tùy chỉnh nào một cách an toàn. Ngoài ra, một số nội dung ngôn ngữ chỉ hoạt động Datanhư một cách để giải quyết tính đa hình.

8. String

- Trong Aiken, chuỗi văn bản có thể được viết dưới dạng văn bản được bao quanh bởi dấu ngoặc kép, có tiền tố là @.

@"Hello, Aiken!"

- Chúng có thể trải dài trên nhiều dòng.

@"Hello
Aiken!"

- Dưới chuỗi văn bản mui xe là UTF-8(mở trong tab mới)nhị phân được mã hóa và có thể chứa bất kỳ unicode hợp lệ nào.

@"🌘 アルバイト Aiken 🌒"