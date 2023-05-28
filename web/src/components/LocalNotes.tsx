'use client'
import { noteData, GetNotes } from '@/lib/LocalStorage'
import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { EditorView, EditorViewProps } from './EditorView'
import { NoteCollapsed } from './NoteCollapsed'

export function LocalNotes() {
  const [localNotes, setLocalNotes] = useState<noteData[] | undefined>([])
  const [isEditing, setIsEditing] = useState<Boolean>(false)
  const [dataToEditor, setDataToEditor] = useState<EditorViewProps>()

  const handleSubmitNewNote = () => {
    setIsEditing(true)
  }
  const handleSeeNote = (title: string, content: string) => {
    setDataToEditor({
      titleProp: title,
      contentProp: content,
    })
    setIsEditing(true)
  }

  useEffect(() => {
    const notes = GetNotes()
    setLocalNotes(notes)
  }, [])
  return (
    <>
      <div className="flex w-1/4 flex-col items-center justify-between border-r-2 border-black  ">
        {/* Notes  */}
        <div className="w-full flex-col ">
          {localNotes?.map((note, i) => (
            <NoteCollapsed
              key={i}
              onClick={() =>
                handleSeeNote(note.title ?? '', note.content ?? '')
              }
              title={note.title}
              content={note.content}
            />
          ))}
        </div>

        <button onClick={handleSubmitNewNote} className="my-5">
          <Plus color="white" size={42} className="rounded-full bg-black p-2" />
        </button>
      </div>
      {isEditing ? (
        <EditorView
          contentProp={dataToEditor?.contentProp}
          titleProp={dataToEditor?.titleProp}
        />
      ) : (
        <div className="flex w-full flex-col items-center justify-center  ">
          <span className="text-xl font-bold">
            Adicione ou visualize uma nota
          </span>
        </div>
      )}
    </>
  )
}
