'use client'

import { FormEvent, useEffect, useState } from 'react'
import { EditorViewProps } from './EditorView'
import { api } from '@/lib/api'

export function EditorViewAuth({
  titleProp,
  contentProp,
  id,
  token,
  setEditing,
}: EditorViewProps) {
  const [title, setTitle] = useState<string | undefined>(titleProp)
  const [content, setContent] = useState<string | undefined>(contentProp)
  const [isEditorEmpty, setEditorEmpty] = useState(true)

  useEffect(() => {
    if (title && content) {
      setEditorEmpty(false)
    }
  }, [content, title])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title || !content) {
      return alert('Digite um titulo e um conteudo')
    }

    if (!isEditorEmpty) {
      await api.put(
        `/notes/${id}`,
        {
          content,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setTitle('')
      setContent('')
      setEditing?.(false)

      return alert('Nota atualizada')
    }

    await api
      .post(
        '/notes',
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .catch((error) => {
        console.log(error)
      })
    setTitle('')
    setContent('')
    setEditing?.(false)
    return alert('Nota Criada com sucesso')
  }

  const handleDeletNote = async () => {
    try {
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Nota removida com sucesso')
      setEditing?.(false)
    } catch (error) {
      return alert(error)
    }
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
          className="w-fit rounded-lg border-2 bg-black p-2 font-bold text-white transition-all hover:scale-110 hover:bg-black/90"
        >
          Salvar nota
        </button>
        <button
          type="button"
          onClick={handleDeletNote}
          className="w-fit rounded-lg border-2 bg-red-600 p-2 font-bold text-white transition-all hover:scale-110 hover:bg-red-600/90"
        >
          Excluir nota
        </button>
      </div>
    </form>
  )
}
