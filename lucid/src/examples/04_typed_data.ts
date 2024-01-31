import { Blockfrost, Data, fromText, Lucid, TxComplete, TxHash, TxSigned } from "lucid-cardano";



const DatumSchema = Data.Object({
    name: Data.Bytes(),
    age: Data.Integer(),
    colors: Data.Array(Data.Bytes()),
    description: Data.Nullable(Data.Bytes())
})


type Datum = Data.Static<typeof DatumSchema>;
const Datum = DatumSchema as unknown as Datum;



const send = async function({lucid, address}: {lucid: Lucid, address: string}): Promise<TxHash> {
    const datum : Datum = {
        name: fromText("Nguyen Duy Khanh"),
        age: BigInt(20),
        colors: [fromText("Blue"), fromText("Dark")],
        description: null,
    }

    const tx: TxComplete = await lucid
        .newTx()
        .payToAddressWithData(address, Data.to(datum, Datum), {
            lovelace: BigInt(10),
        })
        .complete();
    const signedTx: TxSigned = await tx.sign().complete();
    const txHash: TxHash = await signedTx.submit();

    return txHash;
}


export { send }