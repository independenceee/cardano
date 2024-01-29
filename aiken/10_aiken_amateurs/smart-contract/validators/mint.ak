use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{InlineDatum, Redeemer, ScriptContext, Spend, find_input}
use aiken/transaction/credential.{VerificationKey}

// validator {
//   fn mint(_redeemer: Redeemer, _ctx: ScriptContext) -> Bool {
//     True
//   }
// }

// type TokenRedeemer {
//   guessed_word: ByteArray,
// }
// validator {
//   fn mint(redeemer: TokenRedeemer, _ctx: ScriptContext) -> Bool {
//     let code_word = "secret"
//     redeemer.guessed_word == code_word
//   }
// }

// type VerificationKeyHash =
//   Hash<Blake2b_224, VerificationKey>

// type OwnerDatum {
//   owner: VerificationKeyHash,
// }

// validator {
//   fn only_for_owner(
//     _datum: Data,
//     _redeemer: Redeemer,
//     ctx: ScriptContext,
//   ) -> Bool {
//     let ScriptContext { transaction, purpose } = ctx

//     expect Spend(spent_utxo_reference) = purpose
//     expect Some(input) = find_input(transaction.inputs, spent_utxo_reference)
//     expect InlineDatum(maybe_owner_datum) = input.output.datum
//     expect owner_datum: OwnerDatum = maybe_owner_datum
//     list.has(transaction.extra_signatories, owner_datum.owner)
//   }
// }

// type VerificationKeyHash =
//   Hash<Blake2b_224, VerificationKey>

// type CountDatum {
//   owner: VerificationKeyHash,
//   count: Int,
// }

// validator {
//   fn count(_datum: Data, _redeemer: Redeemer, ctx: ScriptContext) -> Bool {
//     let ScriptContext { transaction, purpose } = ctx
//     expect Spend(spent_utxo_reference) = purpose
//     expect Some(input) = find_input(transaction.inputs, spent_utxo_reference)

//     expect InlineDatum(maybe_old_count_datum) = input.output.datum
//     expect old_count_datum: CountDatum = maybe_old_count_datum

//     let count_script_address = input.output.address

//     expect Some(output) =
//       transaction.outputs
//         |> list.filter(fn(output) { output.address == count_script_address })
//         |> list.head()

//     expect InlineDatum(maybe_new_count_datum) = output.datum
//     expect new_count_datum: CountDatum = maybe_new_count_datum

//     and {
//       list.has(transaction.extra_signatories, old_count_datum.owner),
//       new_count_datum.count == old_count_datum.count + 1,
//       new_count_datum.owner == old_count_datum.owner,
//     }
//   }
// }

type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

type CountDatum {
  owner: VerificationKeyHash,
  count: Int,
  authorizing_policy: ScriptHash,
}

validator(count_script_hash: ByteArray) {
  fn count_authorizer(_redeemer: Redeemer, ctx: ScriptContext) {
    let ScriptContext { transaction, purpose } = ctx
    let Transaction { inputs, outputs, mint, .. } = transaction
    expect Mint(policy_id) = purpose
    let authorizing_token_name = "INDEPENDENCE"
    expect no_count_data_in_inputs(inputs, count_script_hash)
    let new_count_outputs = find_script_outputs(outputs, count_script_hash)

    expect
      no_invalid_count_data(
        transaction,
        new_count_outputs,
        authorizing_token_name,
        policy_id,
      )
    let num_minted =
      mint
        |> value.from_minted_value
        |> quantity_of(policy_id, authorizing_token_name)
    list.length(new_count_outputs) == num_minted
  }
}

fn no_count_data_in_inputs(
  inputs: List<Input>,
  count_script_hash: ScriptHash,
) -> Bool {
  list.map(inputs, fn(input) { input.output })
    |> find_script_output(count_script_hash)
    |> list.is_empty()
}

fn no_invalid_count_data(
  transaction: Transaction,
  script_outputs: List<Output>,
  authorizing_token_name: ByteArray,
  policy_id: ScriptHash,
) -> Bool {
  list.all(
    script_outputs,
    fn(output) {
      expect InlineDatum(maybe_new_count_datum) = output.datum
      expect new_count_datum: CountDatum = maybe_new_count_datum
      let has_exaclty_one_authorizing_nft =
        1 == quantity_of(output.value, policy_id, authorizing_token_name)
      and {
        list.hash(transaction.extra_signatories, new_count_datum.owner),
        has_exaclty_one_authorizing_nft,
        new_count_datum.count == 0,
        new_count_datum.authorizing_policy == policy_id,
      }
    },
  )
}
