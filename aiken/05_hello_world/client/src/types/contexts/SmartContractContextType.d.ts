export type SmartContractContextType = {
    lock: () => Promise<void>
    unLock: () => Promise<void>
}