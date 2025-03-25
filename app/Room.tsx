"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"
import { LiveMap } from "@liveblocks/core"
import Loader from "./components/Loader"

const API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string
export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={API_KEY}>
      <RoomProvider
        id="my-room"
        initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
        initialStorage={{
          canvasObjects: new LiveMap(),
        }}
      >
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
