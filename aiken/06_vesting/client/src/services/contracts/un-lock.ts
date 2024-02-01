import readValidator from "@/utils/read-validator"
import { Data, Lucid, Script, TxComplete, TxHash, TxSigned, UTxO } from "lucid-cardano"
import { validators } from "@/libs/plutus.json"
import { Datum } from "@/constants/datum"

type Props = {
    lucid: Lucid
}

const unLock = async function({ lucid }: Props): Promise<TxHash | void> {
    const beneficiaryPublicKeyHash: string = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash!;
    const validator: Script = await readValidator({compiledCode: validators[0].compiledCode})
    const scriptAddress: string = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(scriptAddress);
    
    const currentTime = new Date().getTime();
    const utxos: UTxO[] = scriptUtxos.filter(function(utxo: UTxO) {
        const datum = Data.from<Datum>(
            utxo.datum!,
            Datum
        )
        return datum.beneficiary === beneficiaryPublicKeyHash && datum.lock_until <= currentTime;
    })

    if (utxos.length === 0) {
       return;
    }

    const redeemer = Data.void();
    const laterTime: number = new Date(currentTime + 2 * 60 * 60 * 1000).getTime();

    const tx: TxComplete = await lucid
        .newTx()
        .collectFrom(utxos, redeemer)
        .addSigner(await lucid.wallet.address())
        .validFrom(currentTime)
        .validTo(laterTime)
        .attachSpendingValidator(validator)
        .complete();

    const signedTx: TxSigned = await tx
        .sign()
        .complete();
     
    const txHash:TxHash = await signedTx.submit();
    await lucid.awaitTx(txHash);
    return txHash
}

export default unLock