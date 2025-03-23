import React from "react"

const RightSideBar = () => {
  return (
    <div
      className="flex flex-col items-center border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-2-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto"
      style={{ paddingBottom: "5rem" }}
    >
      <h3
        className="text-xs uppercase"
        style={{ padding: "1rem 1.25rem 0 1.25rem", fontSize: "12px" }}
      >
        Design
      </h3>
    </div>
  )
}

export default RightSideBar
