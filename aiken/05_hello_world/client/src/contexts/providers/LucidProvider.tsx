"use client";

import React, { ReactNode, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "@/contexts/components/LucidContext";


type Props = { children: ReactNode };

const LucidProvider = function ({ children }: Props) {
    
    const [lucid, setLucid] = useState<Lucid>(null!)

    const connectWallet = async function() {
        try {

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
                lucid,
                connectWallet,
                disconnectWallet
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;