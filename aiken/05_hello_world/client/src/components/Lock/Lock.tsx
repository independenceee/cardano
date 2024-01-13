"use client"

import React, { useContext } from "react";
import { validators } from "@/libs/hello-world.json"
import lock from "@/services/contracts/lock"
import { LucidContextType } from "@/types/contexts/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { Constr, Data, SpendingValidator } from "lucid-cardano";
import readValidator from "@/utils/read-validator";

type Props = {}
const Lock = function({}: Props) {
    const { lucidWallet } = useContext<LucidContextType>(LucidContext)
    const handleLock = async function() {
        try {
            if(lucidWallet) {
                const validator: SpendingValidator = await readValidator(validators[0].compiledCode)
                const publicKeyHash:string = lucidWallet.utils.getAddressDetails(await lucidWallet.wallet.address()).paymentCredential?.hash as string;
                const datum = Data.to(new Constr(0, [publicKeyHash]))
                const txHash = await lock({ lucid: lucidWallet, lovelace: BigInt(1000000), to: validator,owner: datum })
                console.log(txHash)
            }
        } catch(error) {
            console.log(error)
        } finally {

        }
    }

    return (
        <button onClick={handleLock}>Lock</button>
    )
}

export default Lock;