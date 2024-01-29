use aiken/transaction.{Output}
use aiken/transaction/creadential.{Address}
use aiken/transaction/value.{lovelace_of}

pub fn check_amount(output: Output, price: Int) -> Bool {
  todo
}

pub fn check_address(output: Output, address: Address) -> Bool {
  todo
}

pub fn check_none(
  output_seller: Option<Output>,
  output_author: Option<Output>,
  output_marketlace
) -> Bool {
  todo
}
