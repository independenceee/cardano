"use client"

import React, { lazy } from 'react'

const Lock = lazy(() => import("@/components/Lock"));
const UnLock = lazy(() => import("@/components/UnLock"));
const ConnectWallet = lazy(() => import("@/components/ConnectWallet"));


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Lock/>
        <ConnectWallet/>
        <UnLock/>
    </main>
  )
}
