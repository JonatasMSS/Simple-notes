# 📗 Simple Notes 📗

![Screenshoot](https://github.com/JonatasMSS/Simple-notes/assets/74430293/06ed845a-8c0a-4f30-ace9-c558c56851f4)

## Descrição do Projeto

O projeto foi desenvolvido durante o bootcamp da AWS na DIO e consiste em um web app para anotações rápidas online. O aplicativo permite que os usuários criem e armazenem anotações de forma prática e segura. Os dados das anotações são armazenados no localstorage para usuários não autenticados e de forma persistente no banco de dados para usuários autenticados. A autenticação do usuário é feita por meio da conexão com o AWS Cognito, que coleta e cria tokens JWT para permitir o acesso seguro e autenticado aos dados. Essa abordagem foi escolhida com o objetivo de colocar em prática os aprendizados do curso de AWS, especialmente em relação à autenticação e segurança dos dados. Além disso, essa dinâmica de autenticação adiciona uma camada extra de proteção às anotações dos usuários, garantindo que apenas usuários autorizados possam acessá-las. Isso proporciona uma experiência mais completa e segura aos usuários do aplicativo de anotações online.
## Tecnologias Utilizadas

### Linguagens de Programação

- JavaScript
- TypeScript

### Frameworks e Bibliotecas

- React
- Next.js

### Banco de Dados

- Prisma ORM

### Plataforma em Nuvem

- AWS (Amazon Web Services)

## Instalação

1. Clone o repositório: `git clone https://github.com/seu-usuario/seu-projeto.git`
2. Acesse a pasta `web`: `cd web`
3. Instale as dependências da pasta `web`: `npm install` ou `yarn install`
4. Volte à pasta raiz do projeto: `cd ..`
5. Acesse a pasta `server`: `cd server`
6. Instale as dependências da pasta `server`: `npm install` ou `yarn install`

## Configuração

### Variáveis de ambiente - Server

Crie um `.env`

~~~shell script

DATABASE_URL="file:./dev.db"
SECRET_KEY_JWT = [Chave de assinatura JWT]
COGNITO_USER_POOL_URL = [Url de acesso ao user pool do cognito]

SECRET_ID_CLIENT = [O Secret ID Configurado no Cognito - É preciso habilitar essa função na criação do user pool]
PUBLIC_ID_CLIENT = [O Public ID do Cognito User Pool]
REDIRECT_URL = "localhost:3000/api/auth/callback" [A url de redirecionamento - De preferência mantenha semelhantemente assim - Se alterar no cognito altere-a aqui]

~~~

### Variáveis de Ambiente - Web

Crie um `.env.local`

~~~~shell script
NEXT_PUBLIC_CONGNITO_USERS_URL = [Url de access ao user pool do cognito]
NEXT_PUBLIC_CLIENT_ID = [O Public ID do Cognito ]
NEXT_PUBLIC_REDIRECT_URI = "http://localhost:3000/api/auth/callback"
~~~~

## Execução

Agora basta abrir a pasta `web` e executar `npm run dev`. Execute o mesmo dentro da pasta `server`

## Contato

Gostou? Me segue no linkedIn 😉😉
https://www.linkedin.com/in/jonatasmss/

