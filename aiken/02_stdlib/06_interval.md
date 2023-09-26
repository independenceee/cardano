# aiken/interval

- Trong một blockchain dựa trên eUTxO như Cardano, việc quản lý thời gian có thể rất khó khăn.

- Thật vậy, để duy trì tính tất định hoàn toàn trong việc thực thi các tập lệnh, không thể đưa ra khái niệm về “thời gian hiện tại” vì khi đó việc thực thi sẽ phụ thuộc vào yếu tố bên ngoài bản thân giao dịch: dòng thời gian không thể tránh khỏi chảy vào vũ trụ của chúng ta.

- Do đó, để giải quyết vấn đề đó, chúng tôi thường xác định các khoảng thời gian, cung cấp khoảng thời gian – hay còn gọi là khoảng thời gian – trong đó giao dịch có thể được thực hiện. Từ bên trong một tập lệnh, không thể biết chính xác khi nào tập lệnh được thực thi, nhưng chúng ta có thể suy luận về giới hạn khoảng thời gian để xác thực các đoạn logic.

## Types

1. Interval<a>

- Một loại để biểu thị các khoảng giá trị. Khoảng là nơi sinh sống của một loại ahữu ích cho các khoảng không vô hạn có giới hạn dưới và/hoặc giới hạn trên hữu hạn.

- Điều này cho phép biểu diễn tất cả các loại khoảng toán học:

```aiken
// [1; 10]
let i0: Interval<PosixTime> = Interval
{   lower_bound:
        IntervalBound { bound_type: Finite(1), is_inclusive: True }
    , upper_bound:
        IntervalBound { bound_type: Finite(10), is_inclusive: True }
}

// (20; infinity)
let i1: Interval<PosixTime> = Interval
    {   lower_bound:
        IntervalBound { bound_type: Finite(20), is_inclusive: False }
    , upper_bound:
        IntervalBound { bound_type: PositiveInfinity, is_inclusive: False }
    }
```

Constructors

```aiken
Interval { lower_bound: IntervalBound<a>, upper_bound: IntervalBound<a> }
```

2. IntervalBound<a>

- Một khoảng bị ràng buộc, bao gồm hoặc loại trừ.

Constructors

```aiken
IntervalBound { bound_type: IntervalBoundType<a>, is_inclusive: Bool }
```

3. IntervalBoundType<a>

- Một loại khoảng bị ràng buộc. Trong trường hợp hữu hạn, một giá trị thuộc loại aphải được cung cấp. athường sẽ là một Int, biểu thị một số giây hoặc mili giây.

Constructors
    + NegativeInfinity
    + Finite(a)
    + PositiveInfinity

## Functions

1. after(lower_bound: a) -> Interval<a>

- Tạo một khoảng bao gồm tất cả các giá trị lớn hơn giới hạn đã cho. tức là [giới hạn thấp hơn, +INF)

```aiken
interval.after(10) == Interval {
    lower_bound: IntervalBound { bound_type: Finite(10), is_inclusive: True },
    upper_bound: IntervalBound { bound_type: PositiveInfinity, is_inclusive: True },
}
```

2. before(upper_bound: a) -> Interval<a>

- Tạo một khoảng bao gồm tất cả các giá trị trước (và bao gồm) giới hạn đã cho. tức là (-INF, giới hạn trên]

```aiken
interval.before(100) == Interval {
  lower_bound: IntervalBound { bound_type: NegativeInfinity, is_inclusive: True },
  upper_bound: IntervalBound { bound_type: Finite(100), is_inclusive: True },
}
```

3. between(lower_bound: a, upper_bound: a) -> Interval<a>

- Tạo một khoảng bao gồm tất cả các giá trị giữa hai giới hạn, bao gồm cả các giới hạn. tức là [giới hạn dưới, giới hạn trên]

```aiken
interval.between(10, 100) == Interval {
  lower_bound: IntervalBound { bound_type: Finite(10), is_inclusive: True },
  upper_bound: IntervalBound { bound_type: Finite(100), is_inclusive: True },
}
```

4. contains(self: Interval<Int>, elem: Int) -> Bool

- Kiểm tra xem một phần tử có nằm trong khoảng hay không.

```aiken
let iv =
  Interval {
    lower_bound: IntervalBound {
      bound_type: Finite(14), 
      is_inclusive: True
    },
    upper_bound: IntervalBound {
      bound_type: Finite(42), 
      is_inclusive: False
    },
  }

interval.contains(iv, 25) == True
interval.contains(iv, 0) == False
interval.contains(iv, 14) == True
interval.contains(iv, 42) == False
```

5. empty() -> Interval<a>

- Tạo một khoảng trống không chứa giá trị.

```aiken
interval.contains(empty(), 0) == False
interval.contains(empty(), 1000) == False
```

6. entirely_after(lower_bound: a) -> Interval<a>

- Tạo một khoảng bao gồm tất cả các giá trị sau (và không bao gồm) giới hạn đã cho. tức là (giới hạn thấp hơn, +INF)

```aiken
interval.entirely_after(10) == Interval {
  lower_bound: IntervalBound { bound_type: Finite(10), is_inclusive: False },
  upper_bound: IntervalBound { bound_type: PositiveInfinity, is_inclusive: True },
}
```

7. entirely_before(upper_bound: a) -> Interval<a>

- Tạo một khoảng bao gồm tất cả các giá trị trước (và không bao gồm) giới hạn đã cho. tức là (-INF, giới hạn trên)

```aiken
interval.entirely_before(10) == Interval {
    lower_bound: IntervalBound { bound_type: NegativeInfinity, is_inclusive: True },
    upper_bound: IntervalBound { bound_type: Finite(10), is_inclusive: False },
}
```

8. entirely_between(lower_bound: a, upper_bound: a) -> Interval<a>

- Tạo một khoảng bao gồm tất cả các giá trị giữa hai giới hạn, ngoại trừ các giới hạn. tức là (giới hạn dưới, giới hạn trên)

```aiken
interval.entirely_between(10, 100) == Interval {
  lower_bound: IntervalBound { bound_type: Finite(10), is_inclusive: False },
  upper_bound: IntervalBound { bound_type: Finite(100), is_inclusive: False },
}
```

9. everything() -> Interval<a>

- Tạo một khoảng chứa mọi giá trị có thể. tức là (-INF, +INF)

```aiken
interval.contains(everything(), 0) == True
interval.contains(everything(), 1000) == True
```

10. hull(iv1: Interval<Int>, iv2: Interval<Int>) -> Interval<Int>

- Tính khoảng nhỏ nhất chứa hai khoảng đã cho, nếu có

```aiken
let iv1 = between(0, 10)
let iv2 = between(2, 14)
hull(iv1, iv2) == between(0, 14)

let iv1 = between(5, 10)
let iv2 = before(0)
hull(iv1, iv2) == before(10)

let iv1 = entirely_after(0)
let iv2 = between(10, 42)
hull(iv1, iv2) = entirely_after(0)
```

11. intersection(iv1: Interval<Int>, iv2: Interval<Int>) -> Interval<Int>

- Tính khoảng lớn nhất chứa trong hai khoảng đã cho, nếu có.

```aiken
let iv1 = interval.between(0, 10)
let iv2 = interval.between(2, 14)
interval.intersection(iv1, iv2) == interval.between(2, 10)

let iv1 = interval.entirely_before(10)
let iv2 = interval.entirely_after(0)
interval.intersection(iv1, iv2) == interval.entirely_between(0, 10)

let iv1 = interval.between(0, 1)
let iv2 = interval.between(2, 3)
interval.intersection(iv1, iv2) |> interval.is_empty
```

12. is_empty(self: Interval<Int>) -> Bool

- Cho biết một khoảng có trống hay không; tức là không chứa giá trị.

```aiken
let iv1 = interval.empty()

let iv2 = Interval {
    lower_bound: IntervalBound { bound_type: Finite(0), is_inclusive: False },
    upper_bound: IntervalBound { bound_type: Finite(0), is_inclusive: False },
  }

let iv3 = Interval {
    lower_bound: IntervalBound { bound_type: Finite(0), is_inclusive: False },
    upper_bound: IntervalBound { bound_type: Finite(100), is_inclusive: False },
  }

interval.is_empty(iv1) == True
interval.is_empty(iv2) == True
interval.is_empty(iv3) == False

// Note: Two empty intervals are not necessarily equal.
iv1 != iv2
```

13. is_entirely_after(self: Interval<Int>, point: Int) -> Bool

- Kiểm tra xem khoảng có hoàn toàn nằm sau điểm “a” không

```
interval.is_entirely_after(interval.after(10), 5) == True
interval.is_entirely_after(interval.after(10), 10) == False
interval.is_entirely_after(interval.after(10), 15) == False
interval.is_entirely_after(interval.between(10, 20), 30) == False
interval.is_entirely_after(interval.between(10, 20), 5) == True
```

14. is_entirely_before(self: Interval<Int>, point: Int) -> Bool

- Kiểm tra xem khoảng có hoàn toàn trước điểm “a” không

```aiken
interval.is_entirely_before(interval.before(10), 15) == True
interval.is_entirely_before(interval.before(10), 10) == False
interval.is_entirely_before(interval.before(10), 5) == False
interval.is_entirely_before(interval.between(10, 20), 30) == True
interval.is_entirely_before(interval.between(10, 20), 5) == False
```

15. max(left: IntervalBound<Int>, right: IntervalBound<Int>) -> IntervalBound<Int>

- Trả lại giới hạn cao nhất của cả hai.

```aiken
let ib1 = IntervalBound { bound_type: Finite(0), is_inclusive: False }
let ib2 = IntervalBound { bound_type: Finite(1), is_inclusive: False }

interval.max(ib1, ib2) == ib2
```

16. min(left: IntervalBound<Int>, right: IntervalBound<Int>) -> IntervalBound<Int>

- Trả về giới hạn nhỏ nhất của cả hai.

```aiken
let ib1 = IntervalBound { bound_type: Finite(0), is_inclusive: False }
let ib2 = IntervalBound { bound_type: Finite(1), is_inclusive: False }

interval.min(ib1, ib2) == ib1
```