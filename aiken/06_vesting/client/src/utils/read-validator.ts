import { encode } from "cbor-x";
import { SpendingValidator, toHex, fromHex, Script } from "lucid-cardano";

type Props = {
    compiledCode: string
}

const readValidator = async function({ compiledCode }: Props): Promise<SpendingValidator> {
    const script: string = toHex(encode(fromHex(compiledCode)))

    return {
        type: "PlutusV2",
        script: script
    }
}

export default readValidator