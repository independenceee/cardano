# aiken/transaction/value => OK

## Types

1. AssetName

- Bí danh loại cho 'AssetName`, là mảng byte dạng tự do trong khoảng từ 0 đến 32 byte.

2. MintedValue

- Một giá trị đa tài sản có thể được tìm thấy khi thực hiện giao dịch. Lưu ý rằng vì lý do lịch sử, điều này hơi khác so với Value kết quả đầu ra giao dịch. Lưu ý rằng bạn không bao giờ phải tự mình xây dựng một MintedValue công cụ. Nếu bạn cần thao tác với nhiều giá trị nội dung, hãy sử dụng Giá trị. Xem thêm from_minted_value.

3. PolicyId

- Bí danh loại cho a PolicyId. A PolicyIdluôn dài 28 byte
- Alias
    + PolicyId = Hash<Blake2b_224, Script>

4. Value

- Một đầu ra đa tài sản Value. Chứa các mã thông báo được lập chỉ mục bởi PolicyId và AssetName . Loại này duy trì một số bất biến bằng cách xây dựng; đặc biệt, a Valuesẽ không bao giờ chứa số lượng bằng 0 của một mã thông báo cụ thể.

## Constants

1. ada_asset_name: ByteArray = #""

- Ada, loại tiền tệ bản địa, không được liên kết với bất kỳ loại tiền nào AssetName(không thể đúc Ada!). Theo quy ước, nó là một tệp ByteArray.

2. ada_policy_id: ByteArray = #""

- Ada, loại tiền tệ bản địa, không được liên kết với bất kỳ loại tiền nào PolicyId(không thể đúc Ada!). Theo quy ước, nó là một tệp ByteArray.

## Functions

1. add( self: Value, policy_id: PolicyId, asset_name: AssetName, quantity: Int, ) -> Value

- Thêm số lượng ( dương hoặc âm ) của một mã thông báo vào một giá trị. Điều này hiệu quả hơn so merge với một tài sản duy nhất.

2. flatten(self: Value) -> List<(PolicyId, AssetName, Int)>

- Làm phẳng một giá trị dưới dạng danh sách 3 bộ (PolicyId, AssetName, Số lượng). Tiện dụng để thao tác các giá trị dưới dạng danh sách thống nhất.

3. flatten_with( self: Value, with: fn(PolicyId, AssetName, Int) -> Option<result>, ) -> List<result>

- Làm phẳng một giá trị dưới dạng danh sách kết quả, có thể loại bỏ một số giá trị trong quá trình thực hiện. Khi hàm biến đổi trả về None, kết quả sẽ bị loại bỏ hoàn toàn.

4. from_asset(policy_id: PolicyId, asset_name: AssetName, quantity: Int) -> Value

- Xây dựng a Valuetừ mã định danh tài sản (tức là PolicyId+ AssetName) và một số lượng nhất định.

5. from_lovelace(quantity: Int) -> Value

- Xây dựng một Valuetừ một số lượng đáng yêu. Lời nhắc thân thiện: 1 Ada = 1.000.000 Lovelace

6. from_minted_value(self: MintedValue) -> Value

- Chuyển đổi a MintedValuethành a Value.

7. lovelace_of(self: Value) -> Int

- Một phiên bản chuyên biệt quantity_ofdành cho tiền Ada.

8. merge(left: Value, right: Value) -> Value

- Kết hợp hai Valuelại với nhau.

9. negate(self: Value) -> Value

- Phủ định số lượng của tất cả các mã thông báo (bao gồm cả Ada) trong Value.

```aiken
v1
  |> value.negate
  |> value.merge(v1)
  |> value.is_zero
// True
```

10. policies(self: Value) -> List<PolicyId>

- Danh sách tất cả các chính sách mã thông báo trong Giá trị đó với mã thông báo khác 0.

11. quantity_of(self: Value, policy_id: PolicyId, asset_name: AssetName) -> Int

- Trích xuất số lượng của một tài sản nhất định.

12. to_dict(self: Value) -> Dict<PolicyId, Dict<AssetName, Int>>

- Chuyển đổi giá trị thành một từ điển từ điển.

13. to_minted_value(self: Value) -> MintedValue

- Chuyển đổi a Valuethành a MintedValue.

14. tokens(self: Value, policy_id: PolicyId) -> Dict<AssetName, Int>

- Nhận tất cả các mã thông báo được liên kết với một chính sách nhất định.

15. without_lovelace(self: Value) -> Value

- Nhận một Valueloại trừ Ada.

16. zero() -> Value

- Tạo một cái trống Valuekhông có gì trong đó.