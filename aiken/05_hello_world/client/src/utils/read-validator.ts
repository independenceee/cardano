import { encode } from 'cbor-x' 
import { SpendingValidator, toHex, fromHex } from 'lucid-cardano'

const readValidator = async function(compliedCode: string): Promise<SpendingValidator> {
    const script: string = toHex(encode(fromHex(compliedCode)))
    return {
        type: "PlutusV2",
        script: script
    }
}

export default readValidator