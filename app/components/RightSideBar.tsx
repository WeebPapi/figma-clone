import React, { useRef } from "react"
import Dimensions from "./settings/Dimensions"
import Text from "./settings/Text"
import Color from "./settings/Color"
import Export from "./settings/Export"
import { RightSidebarProps } from "@/types/type"
import { modifyShape } from "@/lib/shapes"

const RightSideBar: React.FC<RightSidebarProps> = ({
  elementAttributes,
  setElementAttributes,
  activeObjectRef,
  fabricRef,
  isEditingRef,
  syncShapeInStorage,
}) => {
  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true

    setElementAttributes((prev) => ({
      ...prev,
      [property]: value,
    }))

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    })
  }
  const colorInputRef = useRef(null)
  const strokeInputRef = useRef(null)
  return (
    <div
      className="min-w-max z-40 flex flex-col items-center border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-2-[227px] sticky right-0 h-full max-sm:hidden select-none overflow-y-auto"
      style={{ paddingBottom: "5rem" }}
    >
      <h3
        className="text-xs uppercase"
        style={{ padding: "1rem 1.25rem 0 1.25rem", fontSize: "12px" }}
      >
        Design
      </h3>
      <span
        className="text-xs text-primary-grey-300 w-full"
        style={{
          marginTop: "0.75rem",
          paddingInline: "1.25rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--color-primary-grey-200)",
        }}
      >
        Modify Canvas
      </span>
      <Dimensions
        width={elementAttributes.width}
        height={elementAttributes.height}
        handleInputChange={handleInputChange}
        isEditingRef={isEditingRef}
      />
      <Text
        fontFamily={elementAttributes.fontFamily}
        fontSize={elementAttributes.fontSize}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={handleInputChange}
      />
      <Color
        inputRef={colorInputRef}
        attribute={elementAttributes.fill}
        placeholder="color"
        handleInputChange={handleInputChange}
        attributeType="fill"
      />
      <Color
        inputRef={strokeInputRef}
        attribute={elementAttributes.stroke}
        placeholder="stroke"
        handleInputChange={handleInputChange}
        attributeType="stroke"
      />

      <Export />
    </div>
  )
}

export default RightSideBar
