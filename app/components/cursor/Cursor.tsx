import CursorSVG from "@/public/assets/CursorSVG"
import React from "react"

interface CursorProps {
  x: number
  y: number
  color: string
  message: string
}

const Cursor: React.FC<CursorProps> = ({ x, y, color, message }) => {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <CursorSVG color={color} />
      {message && (
        <div
          className="absolute top-5 left-2 rounded-3xl chat-bubble flex items-center"
          style={{ backgroundColor: color, borderRadius: 20 }}
        >
          <p className="text-white text-sm leading-relaxed whitespace-nowrap">
            {message}
          </p>
        </div>
      )}
    </div>
  )
}

export default Cursor
