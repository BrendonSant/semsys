# SemSys 🚀

SemSys é um sistema simplificado de gestão de serviços e clientes, desenvolvido para auxiliar profissionais que prestam pequenos serviços. Este projeto foi criado com fins de estudo e utiliza tecnologias modernas para proporcionar uma experiência eficiente e intuitiva.

## Tecnologias Utilizadas 🔧

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Prisma**: ORM para interações com o banco de dados.
- **Tailwind CSS**: Framework de CSS para estilização.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **MongoDB**: Banco de dados.

## Funcionalidades ✨

- **Cadastro e Gerenciamento de Clientes**: Registre e gerencie clientes com facilidade.
- **Registro e Acompanhamento de Serviços**: Controle os serviços prestados e acompanhe o histórico.
- **Autenticação de Usuários**: Garante que apenas usuários autorizados possam acessar as funcionalidades.

## Instalação 🔨

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/BrendonSant/semsys.git
   cd semsys
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o banco de dados:**

   Atualize o arquivo `.env` com as credenciais do seu banco de dados e execute as migrações:

   ```bash
   npx prisma migrate dev
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000) 🚀

## Estrutura do Projeto 📁

```
semsys/
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   ├── components/
│   └── styles/
├── .env
├── package.json
└── README.md
```

- **prisma/**: Contém o esquema do banco de dados.
- **public/**: Arquivos públicos, como imagens.
- **src/**: Código-fonte da aplicação.
  - **app/**: Páginas da aplicação.
  - **components/**: Componentes reutilizáveis.
 

## Exemplos de Código 👨‍💻

### Cadastro de Cliente (Endpoint POST) 💼

Este endpoint realiza a criação de um novo cliente. Ele valida a sessão do usuário e, caso o usuário não esteja autenticado, retorna um erro de autorização. Se a criação for bem-sucedida, retorna uma mensagem de sucesso; caso contrário, retorna uma mensagem de erro.

```typescript
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, {
            status: 401
        });
    }

    const { name, email, phone, address, document, userId } = await request.json();

    try {
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address || '',
                document,
                userId: userId
            }
        });

        return NextResponse.json({ message: 'Cliente cadastrado!' });
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed create new customer' }, {
            status: 400
        });
    }
}
```

### Listagem de Serviços 🎫

Este trecho de código verifica a sessão do usuário e, se o usuário estiver autenticado, busca os tickets (serviços) associados a ele. Além disso, inclui os dados do cliente em cada ticket, facilitando a visualização completa das informações.

```typescript
const session = await getServerSession(authOptions);

if (!session || !session.user) {
    redirect("/");
}

const service = await prismaClient.ticket.findMany({
    where: {
        userId: session.user.id,
    },
    include: {
        customer: true, // Inclui os dados do cliente
    },
});
```

## Contribuição 🤝

Contribuições são super bem-vindas! Se você tem alguma sugestão, correção ou melhoria, sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_. Sua colaboração é muito importante para nós! 🌟

## Licença 📜

Este projeto é licenciado sob a Licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).

---

Este README fornece uma visão geral do projeto **SemSys**, detalhando suas funcionalidades, instruções de instalação e exemplos de código. Esperamos que seja útil para você e que contribua para um aprendizado ainda maior! 🚀
