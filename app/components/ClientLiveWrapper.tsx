"use client"

import dynamic from "next/dynamic"

// Dynamically import the Live component with SSR disabled
const Live = dynamic(() => import("./Live"), { ssr: false })

export default function ClientLiveWrapper() {
  return <Live />
}
