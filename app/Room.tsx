"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"

const API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string
export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={API_KEY}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
