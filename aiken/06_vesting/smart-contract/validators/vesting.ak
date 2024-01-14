use aiken/hash.{Blake2b_224, Hash}
use aiken/interval.{Finite}
use aiken/list
use aiken/transaction.{ScriptContext, Spend, Transaction, ValidityRange}
use aiken/transaction/credential.{VerificationKey}

type POSIXTime =
  Int

type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

type Datum {
  lock_until: POSIXTime,
  owner: VerificationKeyHash,
  beneficiary: VerificationKeyHash,
}

validator {
  fn vesting(datum: Datum, redeemer: Void, ctx: ScriptContext) -> Bool {
    when ctx.purpose is {
      Spend(_) -> or {
          must_be_signed_by(ctx.transaction, datum.owner),
          and {
            must_be_signed_by(ctx.transaction, datum.beneficiary),
            must_start_after(ctx.transaction.validity_range, datum.lock_until),
          },
        }
      _ -> False
    }
  }
}

fn must_be_signed_by(transaction: Transaction, vk: VerificationKeyHash) -> Bool {
  list.has(transaction.extra_signatories, vk)
}

fn must_start_after(
  range: ValidityRange,
  lock_expiration_time: POSIXTime,
) -> Bool {
  when range.lower_bound.bound_type is {
    Finite(tx_earliest_time) -> lock_expiration_time <= tx_earliest_time
    _ -> False
  }
}
