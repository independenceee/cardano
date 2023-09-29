# aiken/math/rational

- Mô-đun này thực hiện các phép tính giữa các số hữu tỷ. Trong nội bộ, tính hợp lý không được tự động giảm bớt vì việc này chỉ được thực hiện theo yêu cầu .

```aiken
rational.new(2, 3) != rational.new(4, 6)
```

- Do đó, việc so sánh các giá trị hợp lý chỉ xảy ra sau khi rút gọn (xem less ) hoặc thông qua phương thức so sánh .

## Type 

1. Rational

- Loại Opaque dùng để đảm bảo dấu của Rational được quản lý chặt chẽ ở tử số.

## Functions

1. abs(self: Rational) -> Rational

- Giá trị tuyệt đối của a Rational.

```aiken
expect Some(x) = rational.new(3, 2)
expect Some(y) = rational.new(-3, 2)

rational.abs(x) == x
rational.abs(y) == x
```