import { Address, Blockfrost, Data, Lovelace, Lucid, SpendingValidator, TxComplete, TxHash, TxSigned } from "lucid-cardano";

const Datum = () => Data.void();
const Redeemer = () => Data.void();

const lockUtxo = async function(alwaysSuccessedScript: SpendingValidator ,alwaysSuccessedAddress: Address, lucid: Lucid, lovelace: Lovelace): Promise<TxHash> {
    const tx: TxComplete = await lucid
        .newTx()
        .payToContract(alwaysSuccessedAddress, {inline: Datum()}, {lovelace: lovelace})
        .payToContract(alwaysSuccessedAddress, {
            asHash: Datum(),
            scriptRef: alwaysSuccessedScript
        }, {})
        .complete();

    const signedTx: TxSigned = await tx.sign().complete();
    const txHash: TxHash = await signedTx.submit();

    return txHash
}


const unLockUtxo = async function(alwaysSuccessedAddress: Address, lucid: Lucid) : Promise<TxHash> {
    const referenceScriptUtxo = ((await lucid.utxosAt(alwaysSuccessedAddress)).find(
        function(utxo) {
            return Boolean(utxo.scriptRef)
        }
    ))
    if(!referenceScriptUtxo) throw new Error("Reference script not found.")
    const utxo = (await lucid.utxosAt(alwaysSuccessedAddress)).find(
        function(utxo) {
            return utxo.datum === Datum() && !utxo.scriptRef;
        }
    )
    if(!utxo) throw new Error("Spending script not found.");

    const tx: TxComplete = await lucid
        .newTx()
        .readFrom([referenceScriptUtxo])
        .collectFrom([utxo], Redeemer())
        .complete();
    
    const signedTx: TxSigned = await tx.sign().complete()
    const txHash: TxHash = await signedTx.submit();

    return txHash;
}

const alwaysSuccessed = async function() {
    try {
        const lucid = await Lucid.new(
            new Blockfrost(
                "https://cardano-preview.blockfrost.io/api/v0", 
                "<projectId>"
            ),
            "Preview"
        )
        const api = await window.cardano.nami.enable();
        lucid.selectWallet(api);
        
        const alwaysSuccessedScript: SpendingValidator = {
            type: "PlutusV2",
            script: ""
        }

        const alwaysSuccessedAddress: Address = lucid.utils.validatorToAddress(alwaysSuccessedScript);

       

    }catch(error) {
        console.log(error)
    }
}

export default alwaysSuccessed;