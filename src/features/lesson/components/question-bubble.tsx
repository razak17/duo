type QuestionBubbleProps = {
  question: string
}

export function QuestionBubble({ question }: QuestionBubbleProps) {
  return (
    <div className="mb-6 flex items-center gap-x-4">
      <img
        src="/mascot.svg"
        alt="Mascot"
        className="h-10 w-10 lg:h-[60px] lg:w-[60px]"
      />
      <div className="relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base">
        {question}
        <div className="absolute top-1/2 -left-3 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-x-transparent border-t-8" />
      </div>
    </div>
  )
}
