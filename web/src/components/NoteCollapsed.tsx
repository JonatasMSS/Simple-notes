import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface NoteCollapsedProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string | undefined
  content: string | undefined
}

export function NoteCollapsed({ title, content, ...rest }: NoteCollapsedProps) {
  return (
    <div
      onClick={rest.onClick}
      className="w-full  cursor-pointer space-y-2  p-2 transition-colors hover:bg-black hover:text-white"
    >
      <span className="text-xl font-bold">{title}</span>
      <p className="text-xs font-light">{content}</p>
    </div>
  )
}
