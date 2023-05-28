import { User } from 'lucide-react'

export function SignIn() {
  const uriURL = new URL(process.env.NEXT_PUBLIC_REDIRECT_URI!)

  const LOGINURL = `${process.env.NEXT_PUBLIC_CONGNITO_USERS_URL}/login?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&scope=email+openid+phone&redirect_uri=${uriURL}`

  const REGISTERURL = `${process.env.NEXT_PUBLIC_CONGNITO_USERS_URL}/signup?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&scope=email+openid+phone&redirect_uri=${uriURL}`

  return (
    <div className="flex items-center justify-start space-x-5">
      <User color="white" size={50} className="rounded-full bg-black p-2" />
      <span className=" w-1/2 font-medium leading-tight">
        Não tem uma conta?{' '}
        <a
          href={REGISTERURL}
          className="underline transition-colors hover:text-zinc-400"
        >
          Crie uma
        </a>{' '}
        ou faça
        <a href={LOGINURL} className="underline hover:text-zinc-400">
          {' '}
          login
        </a>{' '}
        para salvar suas notas!
      </span>
    </div>
  )
}
