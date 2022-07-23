# ![xpinc](https://user-images.githubusercontent.com/83525738/179291111-63806334-fa2a-45cb-9aec-cba55840fe1e.png)

Repositório destinado ao desafio técnico da XP Inc.

Case: BackEnd <br>

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [TypeORM](https://typeorm.io/)
- [mySQL](https://www.mysql.com/)
- [Jwt](https://jwt.io/)
- [Jest](https://jestjs.io/)
- [dotEnv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [ExpressAsyncErrors](https://www.npmjs.com/package/express-async-errors)
- [Eslint](https://eslint.org/)

### Escolha das tecnologias

Eu adoro desafios, então resolvi me desafiar a aprender novas tecnologias, para colocar em prática os últimos conceitos adquiridos no curso da Trybe,
dentre eles, Typescript com express, autenticação, SOLID (Responsabilidade única e Inversão de Dependência principalmente).
Escolhi o TypeORM por não ser abordado no curso, para trabalhar com o conceito de Entidades, Repositórios e aplicar a Inversão de Dependência,
onde as classes de Controller e Service não precisam conhecer onde ou como as ações serão executadas, oque também facilita a escrita de testes unitários,
pois é possível mockar o banco de dados facilmente.

### Pensamento sobre o case

Usei o excalidraw para pensar sobre como resolver o case, algumas regras usadas:

- 3 Tabelas, sendo elas, clientes, ações, e ações sobre custódia.
- A tabela de clientes(clients) guarda o nome, email, senha criptografada e o saldo da conta e um id único.
- A tabela de ações(assets) guarda o nome das ações, seu preço unitário, quantidade disponível na corretora e um id único.
- A tabela de ações sobre custódia(assets_in_custody) guarda o id do cliente(client_id) relacionado com o id da ação(asset_id), e a quantidade que ele possui em sua carteira.

#### Alguns detalhes:

- Ao criar uma nova conta, a senha será criptografada antes de ser gravada no banco de dados, e o saldo da conta será 0.0.
- Os valores foram definidos com 20 casas a esquerda e 6 a direita, para ter uma precisão maior na manipulação do dinheiro.
- Foi criado um middleware genérico, com a classe HttpError que herda o objeto Error, para lançar exceções personalizadas e não quebrar a aplicação.
- A aplicação inicia somente depois do banco de dados se conectar com o typeORM.

### Principais problemas durante o desenvolvimento:

- Erro ao tentar usar o this nos controllers, onde se perdia a referência da instância criada, resolvi depois de muito tempo pesquisando
no Google, StackOverflow e youtube. Obs: Era necessário capturar os parâmetros Req/Res nas rotas e retonar como parâmetro do Controller.
- Dificuldade em fazer seeds com o typeORM, criei um arquivo seeds/index isolado para isso.
Alguns problemas pequenos, mas esses consegui encontrar a solução mais rapidamente.

### Como rodar o projeto:

1 - Clone o repositório e entre na pasta Typescript.

2 - Instale as dependências com - npm i

3 - Confira se a porta 3306 e 3000 estão livres.
Talvez sejá necessário executar o script npm run kill3000, caso a porta esteja ocupada e sudo service mysql stop.

4 - Suba o container com o comando => docker-compose up -d
- Rode os testes com - npm test
- Inicie o servidor com npm run dev ou npm start.


5 - abra outro terminal e execute as migrations/seeds.

- npm run migration:run <br>
- npm run seeds:run

6 - :grin: Se tudo ocorreu bem, a aplicação já está rodando.

Um dos usuários criados apartir das seeds => <br>
name: XPInc <br>
email: xpinc@xp.com <br>
password: xpinc9

## Requisitos Totais
- [X] Endpoints listados;
- [X] Endpoint que retorna todas as ações de um cliente com o valor unitário e o total investido;

- [X] Registro e Login com Jwt;
-   Testes unitários - Realizados só na rota de ações(assets);
- [ ] Deploy;
- [ ] Swagger;

### Observações:

- O arquivo init.sql é usado para criar o banco de dados vazio e o TypeORM conseguir se conectar antes de rodas as migrations.

:smile: 

![xp](https://user-images.githubusercontent.com/83525738/180625523-f39a7df9-c755-40f8-a072-7a92ec786390.png)
