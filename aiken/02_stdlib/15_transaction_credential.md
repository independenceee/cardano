# aiken/transaction/credential => OK

## Type 

1. Address

- Cardano Address thường chứa một hoặc hai tài liệu tham khảo thông tin xác thực.

Lưu ý rằng các địa chỉ bootstrap kế thừa (còn gọi là 'địa chỉ Byron') bị loại trừ hoàn toàn khỏi bối cảnh Plutus. Do đó, từ góc độ trên chuỗi chỉ tồn tại các địa chỉ loại 00, 01, …, 07 như được nêu chi tiết trong CIP-0019 :: Địa chỉ Shelley .

Constructor

```aiken
Address {
  payment_credential: PaymentCredential,
  stake_credential: Option<StakeCredential>,
}
```

2. Credential

- Cấu trúc chung để biểu diễn một chuỗi Credential.

- Thông tin xác thực luôn thuộc một trong hai loại: cặp khóa công khai/riêng tư trực tiếp hoặc tập lệnh (gốc hoặc Plutus).

Constructor
    VerificationKeyCredential(Hash<Blake2b_224, VerificationKey>)
    ScriptCredential(Hash<Blake2b_224, Script>)

3. PaymentCredential

- 'Thông tin xác thực thanh toán' thể hiện các điều kiện chi tiêu liên quan đến một số đầu ra. Kể từ đây,
+ a VerificationKeyCredentialnắm bắt một đầu ra bị khóa bởi cặp khóa chung/riêng;
+ và ScriptCredentialghi lại đầu ra bị khóa bởi tập lệnh gốc hoặc tập lệnh Plutus.

Alias
    PaymentCredential = Credential

4. PoolId

- Mã định danh nhóm cổ phần duy nhất, dưới dạng hàm băm của khóa xác minh chủ sở hữu của nó.

Alias
    PoolId = Hash<Blake2b_224, VerificationKey>

5. Referenced<a>

- Đại diện cho một loại đối tượng có thể được biểu diễn nội tuyến (bằng hàm băm) hoặc thông qua một tham chiếu (tức là một con trỏ tới một vị trí trên chuỗi).

- Điều này chủ yếu được sử dụng để thu thập các con trỏ tới chứng chỉ đăng ký thông tin xác thực cổ phần trong trường hợp được gọi là địa chỉ con trỏ.

Constructor
    Inline(a)
    Pointer { slot_number: Int, transaction_index: Int, certificate_index: Int }

6. Script

Alias
    Script = ByteArray

7. Signature

Alias
    Signature = ByteArray

8. StakeCredential

- A StakeCredentialđại diện cho việc ủy ​​quyền và điều kiện rút thưởng được liên kết với một số địa chỉ/tài khoản cổ phần.

- A StakeCredentialđược cung cấp nội tuyến hoặc bằng cách tham chiếu bằng cách sử dụng con trỏ trên chuỗi.

- Đọc thêm về con trỏ trong CIP-0019 :: Con trỏ .

Alias
    StakeCredential = Referenced<Credential>

9. VerificationKey

Alias
    VerificationKey = ByteArray

## Functions

1. from_script(script: Hash<Blake2b_224, Script>) -> Address

- Trình xây dựng thông minh cho Địa chỉ từ hàm băm tập lệnh . Địa chỉ không có quyền ủy quyền nào.

2. from_verification_key(vk: Hash<Blake2b_224, VerificationKey>) -> Address

- Trình xây dựng thông minh cho Địa chỉ từ hàm băm khóa xác minh . Địa chỉ kết quả không có quyền ủy quyền nào.

3. verify_signature(key: VerificationKey, msg: ByteArray, sig: Signature) -> Bool

- Verify an Ed25519 signature using the given verification key. Returns True when the signature is valid.

4. with_delegation_key( self: Address, vk: Hash<Blake2b_224, VerificationKey>, ) -> Address

- Đặt (hoặc đặt lại) phần ủy quyền của Địa chỉ bằng cách sử dụng hàm băm khóa xác minh . Điều này rất hữu ích khi kết hợp với from_verification_keyvà/hoặc from_script.

with_delegation_script( self: Address, script: Hash<Blake2b_224, Script>,) -> Address

- Đặt (hoặc đặt lại) phần ủy quyền của Địa chỉ bằng cách sử dụng hàm băm tập lệnh . Điều này rất hữu ích khi kết hợp với from_verification_keyvà/hoặc from_script.