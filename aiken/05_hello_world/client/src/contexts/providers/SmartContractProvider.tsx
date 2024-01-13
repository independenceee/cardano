"use client";

import React, { ReactNode, useContext } from "react";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/contexts/LucidContextType";


type Props = { children: ReactNode };

const SmartContractProvider = function ({ children }: Props) {
    const { lucid } = useContext<LucidContextType>(LucidContext)
    
    const lock = async function(): Promise<void> {
        try {
            if(lucid) {

            }
        }catch(error) {
            console.log(error);
        } finally {

        }
    }

    const unLock = async function(): Promise<void> {
        try {
            if(lucid) {

            }
        }catch(error) {
            console.log(error);
        } finally {
            
        }
    }

    return (
        <SmartContractContext.Provider
            value={{ lock, unLock }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;