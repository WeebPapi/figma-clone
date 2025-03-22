"use client"
import React, { useCallback, useEffect, useState } from "react"
import LiveCursors from "./cursor/LiveCursors"
import { useOthers } from "@liveblocks/react/suspense"
import { useMyPresence } from "@/liveblocks.config"
import CursorChat from "./cursor/CursorChat"
import { CursorMode } from "@/types/type"

const Live = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any
  const [cursorState, setCursorState] = useState<{
    mode: CursorMode
    message: string
    previousMessage: null | string
  }>({ mode: CursorMode.Hidden, message: "", previousMessage: null })

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setCursorState((prev) => ({ ...prev, mode: CursorMode.Hidden }))
    updateMyPresence({ cursor: null, message: null })
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        })
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" })
        setCursorState((prev) => ({ ...prev, mode: CursorMode.Hidden }))
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault()
      }
    }

    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [updateMyPresence])

  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center text-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
