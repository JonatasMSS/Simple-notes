import { GetUser } from '@/lib/user'
import { User } from 'lucide-react'

export function UserData() {
  const { email } = GetUser()

  return (
    <div className="flex items-center justify-start space-x-5">
      <User color="white" size={50} className="rounded-full bg-black p-2" />
      <span className=" w-1/2 font-medium leading-tight">
        {' '}
        Logado com email <span className="underline"> {email}</span>
      </span>
      <a href="/api/auth/logout" className="rounded-lg bg-black p-2 text-white">
        Sair
      </a>
    </div>
  )
}
