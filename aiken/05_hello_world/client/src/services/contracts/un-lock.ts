import { Lucid, OutRef, Redeemer, SpendingValidator, TxHash } from "lucid-cardano"


type Props = {
    lucid: Lucid;
    ref: OutRef;
    from: SpendingValidator;
    redeemer: Redeemer
}


const unLock = async function({ lucid, ref, redeemer, from  }: Props): Promise<TxHash> {
    const [utxo] = await lucid.utxosByOutRef([ref])

    const tx = await lucid
        .newTx()
        .collectFrom([utxo], redeemer)
        .addSigner(await lucid.wallet.address())
        .attachSpendingValidator(from)
        .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    await lucid.awaitTx(txHash);
    return txHash;
}


export default unLock;