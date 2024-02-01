import { Datum } from "@/constants/datum";
import readValidator from "@/utils/read-validator";
import { Data, Lucid, Script, TxComplete, TxHash, TxSigned } from "lucid-cardano";
import { validators} from "@/libs/plutus.json"
type Props = {
    lucid: Lucid
}

const lock = async function({ lucid }: Props): Promise<TxHash> {
    const ownerPublicKeyHash: string = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash!;

    const beneficiaryPublicKeyHash: string = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash!;

    const datum = Data.to<Datum>(
        {
            beneficiary: beneficiaryPublicKeyHash,
            owner: ownerPublicKeyHash,
            lock_until: BigInt(1672843961000)
        }, 
        Datum
    )

    const validator: Script = await readValidator({ compiledCode: validators[0].compiledCode })
    const contractAddress: string = lucid.utils.validatorToAddress(validator)
    const tx: TxComplete = await lucid
        .newTx()
        .payToContract(contractAddress, {inline: datum}, {lovelace: BigInt(10)})
        .complete()
    const signedTx: TxSigned = await tx.sign().complete()
    const txHash = await signedTx.submit();
    await lucid.awaitTx(txHash)
    return txHash;
}

export default lock;