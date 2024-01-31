import { fromText, Lucid, SignedMessage } from "lucid-cardano";


const signMessage = async function(lucid: Lucid): Promise<SignedMessage> {
    const address = await lucid.wallet.address();
    const payload=  fromText("Hello, world!")
    const sign: SignedMessage = await lucid.newMessage(address, payload).sign()
    return sign;
}


const verifyMessage = async function(lucid: Lucid) :Promise<boolean> {
    const address = await lucid.wallet.address();
    const payload=  fromText("Hello, world!")
    const hasSigned: boolean = lucid.verifyMessage(address, payload,await signMessage(lucid))

    return hasSigned
}


export {
    signMessage, verifyMessage
}