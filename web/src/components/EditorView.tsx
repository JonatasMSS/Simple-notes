'use client'

import { DeleteNote, SaveNote } from '@/lib/LocalStorage'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

export interface EditorViewProps {
  id?: string
  userId?: string
  titleProp?: string
  contentProp?: string
  token?: string
  setEditing?: Dispatch<SetStateAction<Boolean>>
}

export function EditorView({ titleProp, contentProp }: EditorViewProps) {
  const [title, setTitle] = useState<string | undefined>(titleProp)
  const [content, setContent] = useState<string | undefined>(contentProp)
  const [buttonType, setButtonType] = useState<'send' | 'remove'>('send')

  const handleSubmit = (e: FormEvent) => {
    if (!title || !content) {
      return alert('Digite um titulo e/ou conteudo')
    }

    if (buttonType === 'remove') {
      return DeleteNote({
        title,
        content,
      })
    }
    SaveNote({
      title,
      content,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-10 px-5  py-2"
    >
      <div className="flex w-full flex-col">
        <label className="text-3xl font-normal leading-none" htmlFor="title">
          Titulo da nota
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(value) => setTitle(value.target.value)}
          id="title"
          className="rounded-lg border-2 border-zinc-400 p-2"
        />
      </div>
      <textarea
        name="content"
        id="tontent"
        cols={30}
        value={content}
        rows={10}
        onChange={(value) => setContent(value.target.value)}
        className="rounded-lg border-2 border-zinc-400 p-2"
      />
      <div className="flex gap-5 ">
        <button
          type="submit"
          onClick={() => setButtonType('send')}
          className="w-fit rounded-lg border-2 bg-black p-2 font-bold text-white transition-all hover:scale-110 hover:bg-black/90"
        >
          Salvar nota
        </button>
        <button
          type="submit"
          onClick={() => setButtonType('remove')}
          className="w-fit rounded-lg border-2 bg-red-600 p-2 font-bold text-white transition-all hover:scale-110 hover:bg-red-600/90"
        >
          Excluir nota
        </button>
      </div>
    </form>
  )
}
