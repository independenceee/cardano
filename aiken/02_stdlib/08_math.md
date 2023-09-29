# aiken/math

- Mô-đun này chứa một số tiện ích Toán học cơ bản. Các phép toán số học tiêu chuẩn trên số nguyên có sẵn thông qua các toán tử gốc:

Nhà điều hành	Sự miêu tả
+	            tổng số học
-	            Sự khác biệt số học
/	            Toàn bộ bộ phận
*	            phép nhân số học
%	            Phần còn lại của cả bộ phận

1 + 1   // 2
10 - 2  // 8
40 / 14 // 2
3 * 4   // 12
10 % 3  // 1

## Functions

1. abs(self: Int) -> Int

- Tính giá trị tuyệt đối của một số nguyên.

```aiken
math.abs(-42) == 42
math.abs(14) == 14
```

2. clamp(self: Int, min: Int, max: Int) -> Int

- Hạn chế giá trị của một số nguyên giữa hai giới hạn tối thiểu và tối đa

```aiken
math.clamp(14, min: 0, max: 10) == 10
```

3. gcd(x: Int, y: Int) -> Int

- Ước chung lớn nhất của hai số nguyên.

```aiken
math.gcd(42, 14) == 14
math.gcd(14, 42) == 14
math.gcd(0, 0) == 0
```

4. log(self: Int, base: Int) -> Int

- Logarit cơ số bcủa một phần tử sử dụng phép chia số nguyên.

```aiken
math.log(10, base: 2) == 3
math.log(42, base: 2) == 5
math.log(42, base: 3) == 3
math.log(5, base: 0) == 0
math.log(4, base: 4) == 1
math.log(4, base: 42) == 0
```

5. max(a: Int, b: Int) -> Int

- Trả về giá trị lớn nhất của hai số nguyên.

6. min(a: Int, b: Int) -> Int

- Trả về giá trị tối thiểu của hai số nguyên.

7. pow(self: Int, e: Int) -> Int

- Tính một số lũy thừa bằng cách esử dụng lũy ​​thừa bằng phương pháp bình phương.

```aiken
math.pow(3, 5) == 243
math.pow(7, 2) == 49
math.pow(3, -4) == 0
math.pow(0, 0) == 1
math.pow(513, 3) == 135005697
```

8. pow2(e: Int) -> Int

- Tính lũy thừa của 2 cho một số mũ nhất định e. Rẻ hơn nhiều so với sử dụng pow(2, _)cho số mũ nhỏ (0 < e < 256).

```aiken
math.pow2(-2) == 0
math.pow2(0) == 1
math.pow2(1) == 2
math.pow2(4) == 16
math.pow2(42) == 4398046511104
```

9. sqrt(self: Int) -> Option<Int>

- Tính căn bậc hai của một số nguyên bằng phương pháp Babylon . Điều này trả về kết quả chính xác hoặc số nguyên nhỏ nhất gần căn bậc hai nhất.

- Trả về None giá trị âm.

```aiken
math.sqrt(0) == Some(0)
math.sqrt(25) == Some(5)
math.sqrt(44203) == Some(210)
math.sqrt(-42) == None
```