"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const SmartContractContext = lazy(() => import("@/contexts/providers/SmartContractProvider"));


type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <SmartContractContext>
                {children} 
            </SmartContractContext>
        </LucidProvider>
    );
};


export default ContextProvider