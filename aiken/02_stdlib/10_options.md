# aiken/option

## Functions

1. and_then(self: Option<a>, then: fn(a) -> Option<result>) -> Option<result>

- Xâu chuỗi nhiều phép tính có thể thất bại.

```aiken
self
  |> dict.get(policy_id)
  |> option.and_then(dict.get(_, asset_name))
  |> option.or_else(0)
```