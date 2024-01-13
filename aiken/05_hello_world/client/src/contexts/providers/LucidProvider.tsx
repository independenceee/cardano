"use client";

import React, { ReactNode, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "@/contexts/components/LucidContext";


type Props = { children: ReactNode };

const LucidProvider = function ({ children }: Props) {
    
    const [lucidWallet, setLucidWallet] = useState<Lucid>(null!)

    const connectWallet = async function() {
        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0", 
                    "preprodQfe5parraxgP3k0IqDnrptIvZVBejjsS"),
                    "Preprod",
                );
            lucid.selectWallet(await window.cardano.nami.enable());
            setLucidWallet(lucid)
            console.log(lucid)
        }catch(error) {
            console.log(error);
        } finally {

        }
    }

    const disconnectWallet = async function() {
        try {
        }catch(error) {
            console.log(error);
        } finally {
            
        }
    }

    return (
        <LucidContext.Provider
            value={{
                lucidWallet,
                connectWallet,
                disconnectWallet
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;