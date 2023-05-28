export interface noteData {
  title: string | undefined
  content: string | undefined
}

export function GetNotes(): noteData[] {
  const dataInStorage = localStorage.getItem('local') ?? '[]'
  const notes = JSON.parse(dataInStorage) as noteData[]
  return notes
}
export function SaveNote(note: noteData) {
  const dataInStorage = localStorage.getItem('local') ?? '[]'
  let notes = JSON.parse(dataInStorage) as noteData[]
  notes = [...notes, note]
  localStorage.setItem('local', JSON.stringify(notes))
  return {
    msg: 'Nota armazenada com sucesso',
    nota: note,
  }
}
export function DeleteNote(note: noteData) {
  const dataInStorage = localStorage.getItem('local') ?? '[]'
  let notes = JSON.parse(dataInStorage) as noteData[]
  notes = notes.filter((values) => values.title !== note.title)
  localStorage.setItem('local', JSON.stringify(notes))
}
