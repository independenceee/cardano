import { Lucid } from "lucid-cardano"

export type LucidContextType =  {
    lucid: Lucid,
    connectWallet: () => Promise<void>,
    disconnectWallet: () => Promise<void>
}