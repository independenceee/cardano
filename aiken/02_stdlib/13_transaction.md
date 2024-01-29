# aiken/transaction => OK

## Types

1. Datum

- Một đầu ra Datum

- Constructors
    + NoDatum
    + DatumHash(Hash<Blake2b_256, Data>) => Một mốc thời gian được tham chiếu bởi bản tóm tắt băm của nó.
    + InlineDatum(Data) => Một mốc thời gian hoàn toàn được nội tuyến trong đầu ra.

2. Input

- Được Input tạo từ một tham chiếu đầu ra và giá trị được giải quyết liên quan đến đầu ra đó.

- Constructors
    + Input { 
        output_reference: OutputReference, 
        output: Output 
    }

3. Output

- Một giao dịch Output, có địa chỉ, giá trị và các tham chiếu tập lệnh và dữ liệu tùy chọn.

- Constructor
    + Output {
        address: Address,
        value: Value,
        datum: Datum,
        reference_script: Option<Hash<Blake2b_224, Script>>,
    }

4. Redeemer

- Một loại bí danh dành cho Người chuộc lỗi, được chuyển tới các tập lệnh để xác thực. Nó Datamờ vì nó do người dùng xác định và tập lệnh có trách nhiệm phân tích nó thành dạng mong đợi.

- Alias
    + Redeemer = Data

##### 5. ScriptContext

- Bối cảnh được sổ cái Cardano cung cấp cho tập lệnh khi được thực thi. Ngữ cảnh chứa thông tin về toàn bộ giao dịch có chứa tập lệnh. Giao dịch cũng có thể chứa các tập lệnh khác; để phân biệt giữa nhiều tập lệnh, tập lệnh này ScriptContext cũng chứa tập purpose lệnh cho biết tập lệnh nào (hoặc vì mục đích gì) của giao dịch đang được thực thi.

- Constructor 
    + ScriptContext { 
        transaction: Transaction, 
        purpose: ScriptPurpose 
    }

6. ScriptPurpose

- Đặc trưng cho loại tập lệnh đang được thực thi.

- Constructor
    + Mint(PolicyId) => Đối với các tập lệnh được thực thi dưới dạng chính sách đúc/đốt, để chèn hoặc xóa nội dung khỏi lưu thông. Nó được tham số hóa bằng mã định danh của chính sách liên quan.

    + Spend(OutputReference) => Đối với các tập lệnh được sử dụng làm thông tin xác thực thanh toán cho các địa chỉ trong kết quả đầu ra giao dịch. Chúng chi phối quy tắc mà theo đó đầu ra mà chúng tham chiếu có thể được sử dụng.

    + WithdrawFrom(StakeCredential) => Đối với các tập lệnh xác thực việc rút tiền thưởng từ tài khoản thưởng. Đối số xác định tài khoản phần thưởng mục tiêu.

    + Publish(Certificate) => Cần thiết khi ủy quyền cho một nhóm sử dụng thông tin xác thực cổ phần được xác định dưới dạng tập lệnh Plutus. Mục đích này cũng được kích hoạt khi hủy đăng ký thông tin xác thực cổ phần đó. Nó nhúng chứng chỉ đang được xác thực.

7. OutputReference

- An OutputReference là một tham chiếu duy nhất cho một đầu ra trên chuỗi. Tương output_index ứng với vị trí trong danh sách đầu ra của giao dịch (được xác định bằng id của nó) tạo ra đầu ra đó

- Constructor
    + OutputReference { 
        transaction_id: TransactionId, 
        output_index: Int 
    }

8. Transaction

- Một Cardano Transaction, như được thấy trong tập lệnh Plutus. Lưu ý rằng đây là sự thể hiện của một giao dịch chứ không phải bản dịch 1: 1 của giao dịch như được thấy trong sổ cái. Đặc biệt, tập lệnh Plutus không thể nhìn thấy đầu vào bị khóa bởi địa chỉ bootstrap, đầu ra tới địa chỉ bootstrap hoặc chỉ siêu dữ liệu giao dịch.

- Constructor
    + Transaction {
        inputs: List<Input>,
        reference_inputs: List<Input>,
        outputs: List<Output>,
        fee: Value,
        mint: MintedValue,
        certificates: List<Certificate>,
        withdrawals: Dict<StakeCredential, Int>,
        validity_range: ValidityRange,
        extra_signatories: List<Hash<Blake2b_224, VerificationKey>>,
        redeemers: Dict<ScriptPurpose, Redeemer>,
        datums: Dict<Hash<Blake2b_256, Data>, Data>,
        id: TransactionId,
    }

9. TransactionId

- Mã định danh giao dịch duy nhất, dưới dạng hàm băm của nội dung giao dịch. Lưu ý rằng id giao dịch không phải là hàm băm trực tiếp của mã Transactionhiển thị trên chuỗi. Đúng hơn, chúng tương ứng với các bản tóm tắt băm của nội dung giao dịch khi chúng được tuần tự hóa trên mạng.

- Constructor
    + TransactionId { 
        hash: Hash<Blake2b_256, Transaction> 
    }

10. ValidityRange

- Khoảng thời gian POSIX, được đo bằng số mili giây kể từ 1970-01-01T00:00:00Z.

- Alias
    + ValidityRange = Interval<PosixTime>

## Function

1. find_datum( outputs: List<Output>, datums: Dict<Hash<Blake2b_256, Data>, Data>, datum_hash: Hash<Blake2b_256, Data>, ) -> Option<Data>

- Tìm a Datumbằng hàm băm của nó, nếu có. Trước tiên, hàm này tìm kiếm các mốc thời gian trong tập hợp nhân chứng, sau đó tìm các mốc thời gian nội tuyến nếu nó không tìm thấy bất kỳ mốc thời gian nào trong các nhân chứng.

2. find_input( inputs: List<Input>, output_reference: OutputReference, ) -> Option<Input>

- Tìm đầu vào bằng OutputReference. Điều này thường được sử dụng kết hợp với Spend ScriptPurpose để tìm đầu vào của tập lệnh.

```aiken
validator {
    fn(datum, redeemer, ctx: ScriptContext) {
        expect Spend(my_output_reference) =
         ctx.purpose

        expect Some(input) =
        ctx.transaction.inputs
            |> transaction.find_input(my_output_reference)
    }
}
```
3. find_script_outputs(outputs: List<Output>,script_hash: Hash<Blake2b_224, Script>, ) -> List<Output>

- Tìm tất cả các kết quả đầu ra đang trả vào hàm băm tập lệnh đã cho, nếu có. Điều này rất hữu ích cho các hợp đồng chạy trên nhiều giao dịch.