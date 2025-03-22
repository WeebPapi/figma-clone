"use client"
import React, { useCallback, useEffect, useState } from "react"
import LiveCursors from "./cursor/LiveCursors"
import { useOthers } from "@liveblocks/react/suspense"
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
} from "@/liveblocks.config"
import CursorChat from "./cursor/CursorChat"
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type"
import ReactionSelector from "./reactions/ReactionSelector"
import FlyingReaction from "./reactions/FlyingReaction"
import useInterval from "@/hooks/useInterval"

const Live = () => {
  const others = useOthers()
  const broadcast = useBroadcastEvent()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  })
  const [reaction, setReaction] = useState<Reaction[]>([])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    if (!cursor || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y
      updateMyPresence({ cursor: { x, y } })
    }
  }, [])

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setCursorState((prev) => ({ ...prev, mode: CursorMode.Hidden }))
    updateMyPresence({ cursor: null, message: null })
  }, [])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y
      updateMyPresence({ cursor: { x, y } })

      setCursorState((prev) =>
        prev.mode === CursorMode.Reaction ? { ...prev, isPressed: true } : prev
      )
    },
    [cursorState.mode, setCursorState]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      setCursorState((prev) =>
        prev.mode === CursorMode.Reaction ? { ...prev, isPressed: true } : prev
      )
    },
    [cursorState.mode, setCursorState]
  )

  useInterval(() => {
    setReaction((r) => r.filter((item) => Date.now() - item.timestamp >= 1000))
  }, 3000)

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReaction((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            timestamp: Date.now(),
            value: cursorState.reaction,
          },
        ])
      )
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      })
    }
  }, 200)

  useEventListener((eventdata) => {
    const event = eventdata.event as ReactionEvent
    setReaction((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          timestamp: Date.now(),
          value: event.value,
        },
      ])
    )
  })

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
      } else if (e.key === "e") {
        setCursorState((prev) => ({
          ...prev,
          mode: CursorMode.ReactionSelector,
        }))
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

  const setReactions = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, isPressed: false, reaction })
  }, [])

  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center text-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {reaction.map((r) => (
        <FlyingReaction
          key={r.timestamp.toString()}
          x={r.point.x}
          y={r.point.y}
          timestamp={r.timestamp}
          value={r.value}
        />
      ))}
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={setReactions} />
      )}
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
