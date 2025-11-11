# Sistema de Agendamentos - Backend API

API REST desenvolvida com Node.js, Express e Prisma para gerenciamento de agendamentos.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **CORS** - Controle de acesso
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── config.js              # Mensagens e constantes
├── dao/
│   ├── ClienteDAO.js          # DAO de Clientes
│   ├── ServicoDAO.js          # DAO de Serviços
│   ├── ProfissionalDAO.js     # DAO de Profissionais
│   ├── AgendamentoDAO.js      # DAO de Agendamentos
│   └── HorarioDisponivelDAO.js # DAO de Horários
├── controller/
│   ├── ClienteController.js
│   ├── ServicoController.js
│   ├── ProfissionalController.js
│   ├── AgendamentoController.js
│   └── HorarioDisponivelController.js
├── app.js                     # Rotas da API
└── server.js                  # Servidor principal
prisma/
└── schema.prisma              # Schema do banco de dados
```

## ⚙️ Instalação

1. Clone o repositório

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env`:
```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
PORT=3000
```

4. Execute as migrations do Prisma:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

## 📊 Banco de Dados

O sistema utiliza as seguintes tabelas:

- **clientes** - Cadastro de clientes
- **servicos** - Serviços disponíveis
- **profissionais** - Profissionais cadastrados
- **agendamentos** - Agendamentos realizados
- **horarios_disponiveis** - Horários de funcionamento

## 🛣️ Rotas da API

### Clientes
- `GET /v1/clientes` - Listar todos os clientes
- `GET /v1/cliente/:id` - Buscar cliente por ID
- `GET /v1/clientes/agendamentos` - Listar clientes com agendamentos
- `GET /v1/cliente/:id/agendamentos` - Buscar cliente com agendamentos
- `POST /v1/cliente` - Criar novo cliente
- `PUT /v1/cliente/:id` - Atualizar cliente
- `DELETE /v1/cliente/:id` - Deletar cliente

### Serviços
- `GET /v1/servicos` - Listar todos os serviços
- `GET /v1/servico/:id` - Buscar serviço por ID
- `POST /v1/servico` - Criar novo serviço
- `PUT /v1/servico/:id` - Atualizar serviço
- `DELETE /v1/servico/:id` - Deletar serviço

### Profissionais
- `GET /v1/profissionais` - Listar todos os profissionais
- `GET /v1/profissional/:id` - Buscar profissional por ID
- `GET /v1/profissionais/agendamentos` - Listar profissionais com agendamentos
- `POST /v1/profissional` - Criar novo profissional
- `PUT /v1/profissional/:id` - Atualizar profissional
- `DELETE /v1/profissional/:id` - Deletar profissional

### Agendamentos
- `GET /v1/agendamentos` - Listar todos os agendamentos
- `GET /v1/agendamento/:id` - Buscar agendamento por ID
- `GET /v1/agendamentos/data/:data` - Buscar por data
- `GET /v1/agendamentos/status/:status` - Buscar por status
- `GET /v1/agendamentos/profissional/:id` - Buscar por profissional
- `POST /v1/agendamento` - Criar novo agendamento
- `PUT /v1/agendamento/:id` - Atualizar agendamento
- `DELETE /v1/agendamento/:id` - Deletar agendamento

### Horários Disponíveis
- `GET /v1/horarios` - Listar todos os horários
- `GET /v1/horario/:id` - Buscar horário por ID
- `GET /v1/horarios/dia/:dia` - Buscar por dia da semana
- `GET /v1/horarios/ativos` - Buscar horários ativos
- `POST /v1/horario` - Criar novo horário
- `PUT /v1/horario/:id` - Atualizar horário
- `DELETE /v1/horario/:id` - Deletar horário

## 🔒 Regras de Negócio

- Não é possível excluir clientes, serviços ou profissionais que possuem agendamentos associados
- A data de cadastro do cliente é automaticamente preenchida com a data atual se não for informada
- O status padrão de um agendamento é "agendado"
- Horários disponíveis podem ser marcados como disponíveis ou indisponíveis

## 🎯 Status HTTP

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Requisição inválida
- **404** - Não encontrado
- **415** - Tipo de conteúdo não suportado
- **500** - Erro interno do servidor

## 👨‍💻 Desenvolvimento

```bash
# Rodar em modo desenvolvimento
npm run dev

# Abrir Prisma Studio (interface gráfica do banco)
npm run prisma:studio

# Gerar cliente Prisma
npm run prisma:generate
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
# API-tcc
# API-tcc
