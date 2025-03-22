import React from "react"

type Props = {
  setReaction: (reaction: string) => void
}

export default function ReactionSelector({ setReaction }: Props) {
  return (
    <div
      className="w-max absolute bottom-20 left-1/2 right-0 transform mx-auto bg-white rounded-full px-2"
      onPointerMove={(e) => e.stopPropagation()}
    >
      <ReactionButton reaction="👍" onSelect={setReaction} />
      <ReactionButton reaction="🔥" onSelect={setReaction} />
      <ReactionButton reaction="😍" onSelect={setReaction} />
      <ReactionButton reaction="👀" onSelect={setReaction} />
      <ReactionButton reaction="😱" onSelect={setReaction} />
      <ReactionButton reaction="🙁" onSelect={setReaction} />
    </div>
  )
}

function ReactionButton({
  reaction,
  onSelect,
}: {
  reaction: string
  onSelect: (reaction: string) => void
}) {
  return (
    <button
      className="transform select-none p-2 reaction-btn transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => onSelect(reaction)}
    >
      {reaction}
    </button>
  )
}
