import { Blockfrost, fromText, Lucid, MintingPolicy, PolicyId, TxComplete, TxHash, TxSigned, Unit } from "lucid-cardano";


const mintingPolicyId = async function(lucid: Lucid): Promise<{policyId: PolicyId, mintingPolicy: MintingPolicy}> {

    const { paymentCredential } = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    )

    const mintingPolicy: MintingPolicy = lucid.utils.nativeScriptFromJson({
        type: "all",
        scripts: [
            { type: "sig", keyHash: paymentCredential?.hash!},
            { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000)}
        ]
    })

    const policyId: PolicyId = lucid.utils.mintingPolicyToId(mintingPolicy);

    return {
        policyId: policyId,
        mintingPolicy: mintingPolicy
    }
}



const mint = async function(name: string, lucid: Lucid): Promise<TxHash> {
    const { policyId, mintingPolicy } = await mintingPolicyId(lucid);

    const unit: Unit = policyId + fromText(name)
    const tx: TxComplete = await lucid
        .newTx()
        .mintAssets({ [unit]: BigInt(1)})
        .validTo(Date.now() + 100000)
        .attachMintingPolicy(mintingPolicy)
        .complete();
    const signedTx: TxSigned = await tx.sign().complete();
    const txHash: TxHash = await signedTx.submit();
    lucid.awaitTx(txHash)
    return txHash;
}

const burn = async function(name: string, lucid: Lucid): Promise<TxHash> {
    const { policyId, mintingPolicy } = await mintingPolicyId(lucid)

    const unit: Unit = policyId + fromText(name);
    const tx: TxComplete = await lucid
        .newTx()
        .mintAssets({ [unit]: BigInt(-1)})
        .validTo(Date.now() + 100000)
        .attachMintingPolicy(mintingPolicy)
        .complete();
    const signedTx: TxSigned = await tx.sign().complete();
    const txHash: TxHash = await signedTx.submit();
    lucid.awaitTx(txHash)
    return txHash;
}

export { mint, burn}