"use client"

import React, { useContext } from "react";
import unLock from "@/services/contracts/un-lock";
import readValidator from "@/utils/read-validator";
import { validators } from "@/libs/hello-world.json"
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { Constr, Data, OutRef, toHex } from "lucid-cardano";



function utf8ToHex(str: string) {
    return  Array.from(str).map(c =>
        c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
        encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
    ).join('');
}
type Props = {}
const UnLock = function({}: Props) {
    const { lucidWallet } = useContext<LucidContextType>(LucidContext)

    const handleUnLock = async function() {
        try {
            if(lucidWallet) {
                const utxo: OutRef = { 
                    outputIndex: 0 ,
                    txHash: "c961f304c3b313c8656be22e0182dca73eb0ed5fceae77b49e9b0ee52f843c7f",
                }

                const validator = await readValidator(validators[0].compiledCode)
                const redeemer = Data.to(new Constr(0, [utf8ToHex("Hello, World!")]))
            
                const txHash = await unLock({
                    lucid: lucidWallet,
                    from: validator,
                    redeemer: redeemer,
                    ref: utxo,
                })

                console.log(txHash)
            }
        }catch(error) {
            console.log(error);
        } finally {

        }
    }

    return <button onClick={handleUnLock}>Un Lock</button>
}

export default UnLock