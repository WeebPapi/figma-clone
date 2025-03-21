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
    </div>
  )
}

export default Cursor
