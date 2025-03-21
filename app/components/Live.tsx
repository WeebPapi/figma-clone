"use client"
import React, { useCallback } from "react"
import LiveCursors from "./cursor/LiveCursors"
import { useOthers } from "@liveblocks/react/suspense"
import { useMyPresence } from "@/liveblocks.config"

const Live = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    updateMyPresence({ cursor: null, message: null })
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center text-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
