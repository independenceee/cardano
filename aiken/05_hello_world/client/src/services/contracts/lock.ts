import { Lucid, SpendingValidator, TxHash } from "lucid-cardano";

type Props = {
    lovelace: bigint
    owner: string,
    lucid: Lucid,
    to: SpendingValidator
}

const lock = async function({lucid, owner, to, lovelace}: Props): Promise<TxHash> {
    const contractAddress = lucid.utils.validatorToAddress(to)

    const tx = await lucid
        .newTx()
        .payToContract(contractAddress, 
            { inline: owner }, 
            { lovelace:lovelace }
        )
        .complete()
    
    const signdTx = await tx.sign().complete()
    const txHash = await signdTx.submit();
    await lucid.awaitTx(txHash);
    return txHash;
}

export default lock;