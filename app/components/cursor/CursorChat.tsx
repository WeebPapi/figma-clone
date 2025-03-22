import CursorSVG from "@/public/assets/CursorSVG"
import { CursorChatProps, CursorMode } from "@/types/type"
import React from "react"

const CursorChat: React.FC<CursorChatProps> = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value })
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
    })
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: "",
      })
    } else if (e.key === "Escape") {
      setCursorState({
        mode: CursorMode.Hidden,
      })
    }
  }
  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />
          <div className="absolute w-60 top-5 left-2 bg-blue-500 px-6 py-2 text-sm leading-relaxed text-white rounded-[20px] flex justify-center items-center">
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}
            <input
              className="z-10 w-55 border-none bg-transparent text-white placeholder-blue-300 outline-none"
              autoFocus
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={
                cursorState.previousMessage ? "" : "Type a message here"
              }
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default CursorChat
