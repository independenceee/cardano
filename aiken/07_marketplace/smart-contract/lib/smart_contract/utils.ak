use aiken/list
use aiken/transaction.{Output, Transaction}
use aiken/transaction/credential.{Address}
use aiken/transaction/value.{lovelace_of}
use smart_contract/types.{VerificationKeyHash}

pub fn check_amount(output: Output, price: Int) -> Bool {
  lovelace_of(output.value) >= price
}

pub fn check_address(output: Output, address: Address) -> Bool {
  output.address.payment_credential == address.payment_credential
}

pub fn must_be_signed_by(
  transaction: Transaction,
  verification_key_hash: VerificationKeyHash,
) -> Bool {
  list.has(transaction.extra_signatories, verification_key_hash)
}

pub fn check_none(
  output_seller: Option<Output>,
  output_author: Option<Output>,
  output_marketplace: Option<Output>,
) -> Bool {
  if
  output_author == None || output_marketplace == None || output_seller == None{
  
    False
  } else {
    True
  }
}

pub fn find_output(
  outputs: List<Output>,
  price: Int,
  address: Address,
) -> Option<Output> {
  list.find(
    outputs,
    fn(output) { check_amount(output, price) && check_address(output, address) },
  )
}

pub fn check_price_duplicate(out_sell: Output, out_royal: Output) -> Bool {
  lovelace_of(out_sell.value) > lovelace_of(out_royal.value)
}

pub fn check_address_duplicate(out_sell: Output, out_royal: Output) -> Bool {
  out_sell.address.payment_credential == out_royal.address.payment_credential
}
