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

2. add(left: Rational, right: Rational) -> Rational

3. arithmetic_mean(self: List<Rational>) -> Option<Rational>

4. ceil(self: Rational) -> Int

5. compare(left: Rational, right: Rational) -> Ordering

6. compare_with( left: Rational, with: fn(Int, Int) -> Bool, right: Rational, ) -> Bool

7. denominator(self: Rational) -> Int

8. div(left: Rational, right: Rational) -> Option<Rational>

9. floor(self: Rational) -> Int

10. from_int(numerator: Int) -> Rational

11. geometric_mean(left: Rational, right: Rational) -> Option<Rational>

12. mul(left: Rational, right: Rational) -> Rational

13. negate(a: Rational) -> Rational

14. new(numerator: Int, denominator: Int) -> Option<Rational>

15. numerator(self: Rational) -> Int

16. proper_fraction(self: Rational) -> (Int, Rational)

17. reciprocal(self: Rational) -> Option<Rational>

18. reduce(self: Rational) -> Rational

19. round(self: Rational) -> Int

20. round_even(self: Rational) -> Int

21. sub(left: Rational, right: Rational) -> Rational

22. truncate(self: Rational) -> Int

23. zero() -> Rational