import { Lucid } from "lucid-cardano"

export type LucidContextType =  {
    lucidWallet: Lucid,
    connectWallet: () => Promise<void>,
    disconnectWallet: () => Promise<void>
}