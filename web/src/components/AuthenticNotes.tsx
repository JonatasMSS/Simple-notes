'use client'
import { Plus } from 'lucide-react'
import { EditorView, EditorViewProps } from './EditorView'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

import { NoteModel } from '@/model/note'
import { NoteCollapsed } from './NoteCollapsed'
import { EditorViewAuth } from './EditorViewAuth'

export function AuthenticatedNotes({ token }: { token: string }) {
  const [notes, setNotes] = useState<NoteModel[] | undefined>([])
  const [isEditing, setIsEditing] = useState<Boolean>(false)
  const [dataToEditor, setDataToEditor] = useState<EditorViewProps>()

  const handleSubmitNewNote = () => {
    setIsEditing(true)
  }
  const handleSeeNote = (
    id: string | undefined,
    title: string,
    content: string,
  ) => {
    setDataToEditor({
      id,
      titleProp: title,
      contentProp: content,
    })

    isEditing ? setIsEditing(false) : setIsEditing(true)
  }

  useEffect(() => {
    api
      .get('/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((value) => {
        const collectedNotes = value.data as NoteModel[]
        setNotes(collectedNotes)
      })
    if (!isEditing) {
      setDataToEditor({})
    }
  }, [token, isEditing])

  return (
    <>
      <div className="flex w-1/4 flex-col items-center justify-between border-r-2 border-black  ">
        {/* Notes  */}
        <div className="w-full flex-col ">
          {notes?.map((value) => (
            <NoteCollapsed
              key={value.id}
              title={value.title}
              content={value.content}
              onClick={() =>
                handleSeeNote(
                  value.id ?? '',
                  value.title ?? 'Vazio',
                  value.content ?? '',
                )
              }
            />
          ))}
        </div>

        <button onClick={handleSubmitNewNote} className="my-5">
          <Plus color="white" size={42} className="rounded-full bg-black p-2" />
        </button>
      </div>
      {isEditing ? (
        token ? (
          <EditorViewAuth
            id={dataToEditor?.id}
            setEditing={setIsEditing}
            contentProp={dataToEditor?.contentProp}
            titleProp={dataToEditor?.titleProp}
            token={token}
          />
        ) : (
          <EditorView
            contentProp={dataToEditor?.contentProp}
            titleProp={dataToEditor?.titleProp}
          />
        )
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
