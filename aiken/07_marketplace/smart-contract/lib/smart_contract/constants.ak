use aiken/transaction/credential.{Address, Inline, VerificationKeyCredential}
use smart_contract/types.{VerificationKeyHash}

pub const marketplace_payment_verifivation_key_hash =
  #"3a4e6757f24d9dddb65c8aef60d0999957b3650453e5e7721fb4fd42"

pub const marketplace_stake_verifivation_key_hash =
  #"32798960f1b4dc35be90add0d31aed0e3019ea0e47288296a5737e60"

pub fn marketplace_address() -> Address {
  Address {
    payment_credential: VerificationKeyCredential(
      marketplace_payment_verifivation_key_hash,
    ),
    stake_credential: Some(
      Inline(VerificationKeyCredential(marketplace_stake_verifivation_key_hash)),
    ),
  }
}

pub const marketplace_pct: Int = 1
