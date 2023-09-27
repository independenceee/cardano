# aiken/builtin

1. add_integer(left: Int, right: Int) -> Int

- Cộng hai số nguyên (+).

2. append_bytearray(left: ByteArray, right: ByteArray) -> ByteArray

- Nối hai mảng byte lại với nhau.

3. append_string(left: String, right: String) -> String

- Nối hai chuỗi

4. b_data(bytes: ByteArray) -> Data

- Xây dựng một Datatừ ByteArray

5. blake2b_256(preimage: ByteArray) -> ByteArray

- Tính giá trị băm blake2b-256 của một bytearray nhất định. Đầu ra luôn dài 32 byte.

6. choose_data(
  data: Data,
  when_constr: a,
  when_map: a,
  when_list: a,
  when_int: a,
  when_bytearray: a,
) -> a

- Chọn một nhánh để tiếp tục dựa trên dữ liệu thực sự là gì.

7. choose_list(list: List<a>, when_empty: b, when_non_empty: b) -> b

- Chọn một nhánh để tiếp tục tùy thuộc vào việc danh sách có trống hay không.

8. choose_void(void: Void, when_void: a) -> a

- Tiếp tục phần tiếp theo khi thuật ngữ đã cho là Void.

9. cons_bytearray(byte: Int, bytes: ByteArray) -> ByteArray

- Đẩy một byte vào trước bytearray.

10. cons_list(elem: a, list: List<a>) -> List<a>

- Đẩy một phần tử vào trước danh sách

11. constr_data(index: Int, fields: List<Data>) -> Data

- Xây dựng a Datatừ chỉ mục hàm tạo và danh sách các trường.

12. debug(message: String, continuation: a) -> a

- Theo dõi tin nhắn được cung cấp và tiếp tục phần tiếp theo.

13. decode_utf8(bytes: ByteArray) -> String

- Giải thích mảng byte được mã hóa UTF-8 dưới dạng Chuỗi. Không thành công nếu byte không được mã hóa UTF-8.

14. divide_integer(numerator: Int, denominator: Int) -> Int

- Phép chia số nguyên bị cắt cụt về phía âm vô cực (/).

15. encode_utf8(str: String) -> ByteArray

- Chuyển đổi một chuỗi thành một mảng byte được mã hóa UTF-8.

16. equals_bytearray(left: ByteArray, right: ByteArray) -> Bool

- Bytearray bình đẳng.

17. equals_data(left: Data, right: Data) -> ByteArray
- Bình đẳng về dữ liệu.

18. equals_integer(left: Int, right: Int) -> Bool

- Bình đẳng số nguyên.

19. equals_string(left: String, right: String) -> Bool

- Chuỗi bình đẳng.

20. fst_pair(pair: (a, b)) -> a

- Lấy phần tử đầu tiên của một cặp.

21. head_list(list: List<a>) -> a

- Người đứng đầu một danh sách. Thất bại nếu trống rỗng.

22. i_data(i: Int) -> Data

- Xây dựng a Datatừ một số nguyên.

23. if_then_else(condition: Bool, when_true: a, when_false: a) -> a

- Trả về phép tính đầu tiên khi điều kiện đúng và phép tính thứ hai nếu ngược lại.

24. index_bytearray(bytes: ByteArray, index: Int) -> Int

- Truy cập byte tại chỉ mục đã cho trong bytearray.

25. length_of_bytearray(bytes: ByteArray) -> Int

- Số byte trong một bytearray.

26. less_than_bytearray(left: ByteArray, right: ByteArray) -> Bool

- Bytearray bất bình đẳng nghiêm ngặt.

27. less_than_equals_bytearray(left: ByteArray, right: ByteArray) -> Bool

- Bất đẳng thức Bytearray

28. less_than_equals_integer(left: Int, right: Int) -> Int

- Bất đẳng thức số nguyên.

29. less_than_integer(left: Int, right: Int) -> Int

- Số nguyên bất đẳng thức chặt chẽ.

30. list_data(items: List<Data>) -> Data

- Xây dựng a Datatừ danh sách các phần tử.

31. map_data(items: List<(Data, Data)>) -> Data

- Xây dựng a Datatừ danh sách các cặp.

32. mk_nil_data() -> List<Data>

- Xây dựng một danh sách dữ liệu trống.

33. mk_nil_pair_data() -> List<(Data, Data)>

- Xây dựng một danh sách trống các cặp dữ liệu.

34. mk_pair_data(left: Data, right: Data) -> (Data, Data)

- Xây dựng dữ liệu từ một cặp phần tử.

35. mod_integer(numerator: Int, denominator: Int) -> Int

- Mô đun số nguyên (%), thỏa mãn

divide_integer(x, y) * y + mod_integer(x, y) == x

36. multiply_integer(left: Int, right: Int) -> Int

- Nhiều hai số nguyên (*).

37. null_list(list: List<a>) -> Bool

- Đúng khi danh sách trống.

38. quotient_integer(numerator: Int, denominator: Int) -> Int

- Phép chia số nguyên bị cắt cụt về 0.

39. remainder_integer(numerator: Int, denominator: Int) -> Int

- Số nguyên còn lại, thỏa mãn

quotient_integer(x, y) * y + remainder_integer(x, y) == x

40. serialise_data(data: Data) -> ByteArray

- Tuần tự hóa Dữ liệu thành byte bằng cách sử dụng CBOR.

41. sha2_256(preimage: ByteArray) -> ByteArray

- Tính giá trị băm SHA2-256 của một bytearray nhất định. Đầu ra luôn dài 32 byte.

42. sha3_256(preimage: ByteArray) -> ByteArray

- Tính giá trị băm SHA3-256 của một bytearray nhất định. Đầu ra luôn dài 32 byte.

43. slice_bytearray(start: Int, end: Int, bytes: ByteArray) -> ByteArray

- Trích xuất một mảng con từ một bytearray cho trước các chỉ mục bắt đầu và kết thúc.

44. snd_pair(pair: (a, b)) -> b

- Lấy phần tử thứ hai của một cặp.

45. subtract_integer(left: Int, right: Int) -> Int

- Trừ hai số nguyên (-).

46. tail_list(list: List<a>) -> List<a>

- Phần đuôi của một danh sách. Thất bại nếu trống rỗng.

47. un_b_data(data: Data) -> ByteArray

- Giải thích a Datadưới dạng bytearray. Thất bại nếu nó không phải là bytearray.

48. un_constr_data(data: Data) -> (Int, List<Data>)

- Diễn giải a Datanhư một hàm tạo. Thất bại nếu nó không phải là hàm tạo.

49. un_i_data(data: Data) -> Int

- Giải thích a Datadưới dạng số nguyên. Thất bại nếu nó không phải là số nguyên.

50. un_list_data(data: Data) -> List<Data>

- Diễn giải a Datadưới dạng một danh sách. Thất bại nếu nó không phải là một danh sách.

51. un_map_data(data: Data) -> List<(Data, Data)>

- Giải thích a Datanhư một bản đồ. Thất bại nếu nó không phải là bản đồ.

52. verify_ecdsa_secp256k1_signature(
  verification_key: ByteArray,
  message: ByteArray,
  signature: ByteArray,
) -> ByteArray

- Xác minh chữ ký ECDSA-SECP256k1 từ khóa xác minh được liên kết.

53. verify_ed25519_signature(
  verification_key: ByteArray,
  message: ByteArray,
  signature: ByteArray,
) -> ByteArray

- Xác minh chữ ký Ed25519 từ khóa xác minh được liên kết.

54. verify_schnorr_secp256k1_signature(
  verification_key: ByteArray,
  message: ByteArray,
  signature: ByteArray,
) -> ByteArray

- Xác minh chữ ký SCHNORR-SECP256k1 từ khóa xác minh được liên kết.