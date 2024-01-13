import React, { useContext } from "react"
import LucidContext from "@/contexts/components/LucidContext"
import { LucidContextType } from "@/types/contexts/LucidContextType"



type Props = {}
const ConnectWallet = function({}: Props) {

    const { connectWallet } = useContext<LucidContextType>(LucidContext)

    return (
        <button onClick={connectWallet}>Connect Wallet</button>
    )
}

export default ConnectWallet;