# 📄 Relatório de Projeto – Milestone 1: mockups da Loja Online

## 1. Identificação do Grupo

- **Ari Manuel Gamboa Aguilar** – USP nº 16796572  
- **Luis Enrique Asuncion Velasquez** – USP nº 16796593  
- **Sandro Fabrizio Cárdenas Vilca** – USP nº 16796589  

---

## 2. Requisitos

### 2.1. Requisitos Funcionais do Sistema

- O sistema deve ter dois tipos de usuários: **Clientes** e **Administradores**.
- **Administradores**:
  - Podem cadastrar, atualizar e remover produtos e usuários.
  - Devem ter os campos: nome, ID, telefone e email.
- **Clientes**:
  - Acessam a loja para comprar produtos.
  - Devem ter os campos: nome, ID, endereço, telefone e email.
- **Produtos/Serviços**:
  - Campos obrigatórios: nome, ID, foto, descrição, preço, quantidade em estoque, quantidade vendida.
  - Podem ser adicionados ao carrinho, com escolha de quantidade.
  - O estoque é atualizado após compra.
- **Carrinho de Compras**:
  - Armazena produtos até o pagamento.
  - O pagamento pode ser feito com qualquer número de cartão de crédito (simulado).
- O sistema deve:
  - Ser **acessível** e **usável**.
  - Ser **responsivo**, ou seja, reagir bem às ações do usuário.
    
### 2.2. Funcionalidade Específica do Projeto

A loja implementa uma funcionalidade especial chamada **“Produtos Mais Vendidos”**, visível no catálogo de produtos. Essa funcionalidade exibe uma seleção automática dos produtos com maior número de vendas, permitindo que os usuários vejam rapidamente os itens mais populares.

Atualmente, essa funcionalidade está representada de forma estática, mas nas próximas etapas será conectada ao backend, que calculará dinamicamente os produtos com maior quantidade vendida (`quantidade_vendida`).

Essa funcionalidade contribui para a experiência do usuário ao destacar itens com maior interesse do público, facilitando a tomada de decisão e promovendo a visibilidade de produtos populares.

---

## 3. Descrição do Projeto

### 3.1. Telas Implementadas em HTML/CSS

As seguintes páginas foram desenvolvidas com HTML5 e CSS3:

- `homepage.html` – Home page com apresentação e navegação.
- `loginpage.html` – Tela de login estática.
- `contactopage.html` – Formulário de contato com campos nome, e-mail e mensagem.

#### 🖼️ Capturas das Telas HTML Implementadas

- **Home Page**  
  ![Home Page](imgs/mockups/Home_Page.png)

- **Página de Login**  
  ![Login Page](imgs/mockups/Log_In.png)

- **Página de Contato**  
  ![Contato Page](imgs/mockups/Contáctanos.png)

### 3.2. Telas Criadas em Mockup (Figma)

As telas abaixo foram criadas no Figma e exportadas como imagens:

- Página de catálogo de produtos
- Página de detalhes do produto
- Página de carrinho de compras
- Página de registro de usuário

#### 🖼️ mockups (Figma)

- **Catálogo de Produtos**  
  ![Catálogo](imgs/mockups/productspage.png)

- **Detalhes do produto**
  ![Detalhes](imgs/mockups/Sobreo_o_Producto.png)

- **Carrinho de compras**
  ![Carrinho](imgs/mockups/Carrito_de_Compras.png)

- **Registro de usuário**
  ![Registro](imgs/mockups/Register_de_Usuarios.png)

---

## 4. Diagrama de Navegação

Abaixo está o diagrama representando as rotas entre as principais páginas do sistema:

![Nagacion](imgs/navegation_diagram/navegation_diagram.jpg)

---

## 5. Comentários sobre o Código

- Estrutura clara com `header`, `main`, `footer`.
- Navegação simulada por menus e links estáticos.
- CSS modularizado por página.
- As telas têm estilo visual coeso e moderno.

---

## 6. Plano de Testes

**Testes manuais realizados:**
- Carregamento correto dos arquivos HTML e CSS em navegadores modernos.
- Checagem da responsividade básica das páginas.
- Verificação de funcionamento dos links de navegação.

**Futuro:**
- Testes automatizados com ferramentas como Selenium.
- Integração de validações, autenticação e persistência de dados.

---

## 7. Resultados dos Testes

- As 3 páginas HTML renderizam corretamente no Chrome, Firefox e Edge.
- Estilos e estrutura visual mantêm consistência.
- Links de navegação operam de acordo com o fluxo proposto.

---

## 8. Procedimentos de Execução

### 8.1. Requisitos
- Navegador atualizado: Chrome, Firefox ou Edge.

### 8.2. Como Executar
1. Clonar o repositório:
   ```bash
   git clone https://github.com/GAMA544/milestone1-Supermarket.git
2. **Acessar a pasta do projeto.**

3. **Abrir localmente os seguintes arquivos HTML em seu navegador:**

   - `homepage.html`
   - `loginpage.html`
   - `contactopage.html`

---

## 9. Problemas Encontrados

- Tempo limitado para implementar navegação dinâmica no estilo SPA com JavaScript.
- Integração com backend (servidor e banco de dados) ainda não realizada.
- Melhorias futuras planejadas para responsividade completa e acessibilidade (uso em diferentes tamanhos de tela e dispositivos).

---

## 10. Comentários Finais

- O **Milestone 1** cumpre os objetivos principais: mockups das telas, proposta de navegação clara e desenvolvimento das páginas iniciais com HTML5/CSS3.
- O projeto está bem estruturado para ser expandido nas próximas etapas com JavaScript dinâmico, funcionalidades completas, banco de dados e autenticação.
- A equipe seguiu boas práticas de separação de arquivos, clareza de layout e organização do repositório.

---

## ✅ Arquivos Incluídos no Repositório

- `homepage.html`, `loginpage.html`, `contactopage.html`
- `styleshomepage.css`, `stylesloginpage.css`, `stylescontactopage.css`
- **mockups exportados do Figma:** armazenados na pasta `/img`
- **Diagrama de navegação:** `./img/navegation_diagram.png`
- `README.md` contendo este relatório completo

# 📄 Relatório de Projeto – Milestone 2: funcionalidades do cliente e Administrador

## 1. Identificação do Grupo

- **Ari Manuel Gamboa Aguilar** – USP nº 16796572  
- **Luis Enrique Asuncion Velasquez** – USP nº 16796593  
- **Sandro Fabrizio Cárdenas Vilca** – USP nº 16796589  

---

## 2. Requisitos Atualizados

### 2.1. Requisitos Funcionais

O sistema cumpre os requisitos básicos estabelecidos no Milestone 1 e, no Milestone 2, passou a implementar as seguintes funcionalidades:

#### 🔐 Funcionalidades Gerais de Acesso e Sessão

- **Login com diferenciação de perfis**:
  - O sistema reconhece o tipo de usuário após o login.
  - **Clientes** são redirecionados para a página de catálogo.
    ![Page Produtos](imgs/imagenes/Page_Productos.png)
  - **Administradores** são redirecionados para o painel administrativo.
   ![Page Admin](imgs/imagenes/Inicio_Admin)

- **Persistência da sessão com `localStorage`**:
  - A sessão do usuário permanece ativa entre páginas.
  - O nome do usuário logado é exibido dinamicamente no cabeçalho.
  ![Page Admin](imgs/imagenes/Login_Dinamico.png)

- **Formulários com validações e máscaras**:
  - Aplicação de máscaras automáticas para CPF e número de telefone.
  - Campos obrigatórios como nome, email e senha são validados no cliente.
  ![Page Admin](imgs/imagenes/Parametros_ingresodeDados.png)
---

#### 🛒 Funcionalidades do Cliente

- **Visualização de produtos por categoria**:
  - Catálogo dinâmico com filtro por categorias como "Frutas", "Bebidas", etc.
  ![Page Admin](imgs/imagenes/Categorias}.png)

- **Renderização automática dos produtos**:
  - Os produtos são carregados a partir do `localStorage` e exibidos dinamicamente na página `Produtos_Page.html`.

- **Página de produto individual (`Produto_Individual.html`)**:
  - Exibe imagem, descrição e informações detalhadas do produto.
  - Possui botão para adicionar diretamente ao carrinho.
  ![Page Admin](imgs/imagenes/Producto_Individual.png)
- **Carrinho de compras dinâmico (`carrito_compras.html`)**:
  - Adição e remoção de produtos em tempo real.
  - Atualização automática de quantidades e preços.
  - Itens persistem entre sessões via `localStorage`.
  ![Page Admin](imgs/imagenes/Carrito.png)
- **Resumo da compra**:
  - Quantidade total de itens e valor final visíveis e atualizados dinamicamente.
    ![Page Admin](imgs/imagenes/Resumo_Orden.png)

- **Finalização da compra e geração de comprovante**:
  - Página `pagamento.html` simula o pagamento com qualquer número de cartão.
  - Gera uma **boleta de compra** em PDF via `window.print()`, contendo:
    - Nome do comprador, produtos adquiridos, preços e total.
    ![Page Admin](imgs/imagenes/Finalizar_Compra.png)
  - Ele está conectado com o BEECEPTOR para poder diminuir o estoque dos produtos, e você pode ver isso porque na página “produto_individual.html” sai o estoque do produto, ao fazer as compras você poderá ver que ele diminui o estoque daquele produto.
    ![Page Admin](imgs/imagenes/beeceptor.png)

- **Página de perfil do cliente (`usuario.html`)**:
  - Permite ao cliente visualizar e editar seus dados pessoais.
  ![Page Admin](imgs/imagenes/Usuario.png)

- **Formulário funcional de contato**:
  - A página `contactopage.html` permite que clientes enviem sugestões e dúvidas.
  - As mensagens são redirecionadas para `supermarketnest9@gmail.com` via `mailto:`.
    ![Page Admin](imgs/imagenes/Contactanos.png)
  - E suas avaliações são enviadas para o endereço de e-mail que criamos para a empresa.
    ![Page Admin](imgs/imagenes/Correo.png)
    
- **Finalização da compra e geração de comprovante**:
  - A página `pagamento.html` permite ao cliente revisar os dados do pedido e confirmar a compra.
  - Ao clicar em "Finalizar Compra", é exibido um resumo completo com:
    - Nome do usuário.
    - Lista de produtos comprados (nome, quantidade e valor unitário).
    - Valor total da compra.
    - Data/hora do pedido.
  - O documento gerado é estruturado para ser impresso ou salvo como PDF, servindo como recibo oficial da compra.
  - Todos os dados são renderizados dinamicamente com base no conteúdo do `localStorage` e no estado do carrinho.
    ![Page Admin](imgs/imagenes/Boleta.png)    
- **Função para logout sua conta de usuário**:
  - Há uma função para fazer o logout do usuário quando você clica no nome do usuário.
    ![Page Admin](imgs/imagenes/Logout.png) 
---

#### 🛠️ Funcionalidades do Administrador

- **Área administrativa exclusiva**:
  - Administradores autenticados acessam uma interface própria com menu de navegação exclusivo.
  - E tem uma seção especial para retornar à página de comando do administrador.
  ![Page Admin](imgs/imagenes/admin_menu.png) 
- **CRUD de produtos**:
  - Visualizar todos os produtos existentes.
  - Adicionar novos produtos com imagem, descrição, preço e estoque.
  - Editar produtos cadastrados.
  - Excluir produtos do sistema.
  - Ele está conectado com o BEECEPTOR para poder editar o produto, enviando novas atualizações e editando o produto
    ![Page Admin](imgs/imagenes/Admin_products.png)
  ![Page Admin](imgs/imagenes/AdicionarProductoNuevo.png)
  ![Page Admin](imgs/imagenes/Editar_Producto.png) 
- **CRUD de usuários**:
  - Visualizar a lista completa de clientes e administradores.
  - Editar dados dos usuários registrados.
  ![Page Admin](imgs/imagenes/Admin_usuarios.png)
  ![Page Admin](imgs/imagenes/Editar_Usuario.png) 
- **Cadastro de novos administradores**:
  - Através da interface `admin-add-admin.html`.
  ![Page Admin](imgs/imagenes/AdicionarAdmin.png)
- **Validações administrativas**:
  - Formulários com máscara para CPF e validação de número de telefone e email.

- **Design consistente e responsivo**:
  - Todas as páginas administrativas seguem padrão visual coeso, com navegação clara e estilo moderno.
  - Responsividade garantida via CSS modular.

---

#### 💡 Funcionalidades Técnicas Adicionais

- **SPA parcial**:
  - A navegação entre páginas simula uma Single-Page Application.
  - O carregamento é fluido e controlado por `localStorage`.

- **Responsividade e acessibilidade**:
  - Uso de `media queries` e boas práticas de HTML5/CSS3.
  - Compatível com dispositivos móveis e navegadores modernos.

- **Modularidade e escalabilidade**:
  - Scripts organizados por função (`login.js`, `renderizarCarrinho.js`, `pagamento.js`, etc.).
  - Estrutura pronta para futura integração com backend real.


---

## 3. Descrição do Projeto (Implementação)

### 3.1. Telas Funcionais

| Página                      | Descrição                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| `homepage.html`            | Tela inicial com apresentação da loja e acesso a login                    |
| `loginpage.html`           | Autenticação de usuários com redirecionamento por perfil                  |
| `register.html`            | Formulário de registro com máscaras e validações                         |
| `Produtos_Page.html`       | Catálogo de produtos com filtro por categoria                            |
| `Produto_Individual.html`  | Página de detalhes de produto com botão de compra                         |
| `carrito_compras.html`     | Carrinho de compras interativo com resumo                                |
| `pagamento.html`           | Finalização do pedido e geração da boleta em PDF                         |
| `usuario.html`             | Visualização e edição do perfil do cliente                               |
| `contactopage.html`        | Formulário de contato funcional                                          |

### 3.2. Telas Administrativas

| Página                      | Função                                                                 |
|----------------------------|------------------------------------------------------------------------|
| `admin-productos.html`     | Listagem e gerenciamento de produtos                                   |
| `admin-add-product.html`   | Cadastro de novo produto                                               |
| `admin-edit-product.html`  | Edição de produto existente                                            |
| `admin-usuarios.html`      | Lista de clientes e admins registrados                                |
| `admin-add-admin.html`     | Cadastro de novo administrador                                         |
| `admin-edit-user.html`     | Edição de dados de um usuário  
---

## 4. Comentários sobre o Código

- Scripts JavaScript organizados por responsabilidade funcional.
- Separação entre lógica de renderização e manipulação de dados.
- Uso consistente de `localStorage` como repositório de dados.
- Scripts como `renderAdminUsers.js`, `renderizarCarrinho.js`, `contatanos.js` e `user_info.js` fornecem modularidade e reusabilidade.

---

## 5. Plano de Testes

**Testes manuais realizados:**

- Login e redirecionamento de usuários.
- Renderização de produtos e filtro por categoria.
- Manipulação completa do carrinho.
- Geração de boleta em PDF com produtos corretos.
- CRUD de produtos e usuários.
- Teste de envio de mensagens pelo formulário de contato.
- Máscaras aplicadas corretamente nos campos dos formulários.

---

## 6. Resultados dos Testes

Todos os testes foram executados com sucesso. As funcionalidades estão operacionais com resultados consistentes. Nenhum bug crítico foi identificado.

| Funcionalidade                         | Status |
|----------------------------------------|--------|
| Login de cliente/admin                 | ✅     |
| Redirecionamento por tipo de usuário   | ✅     |
| Carrinho com total dinâmico            | ✅     |
| CRUD de produtos e usuários            | ✅     |
| Geração de boleta                      | ✅     |
| Formulário “Contate-nos”               | ✅     |
| Máscara de CPF/telefone                | ✅     |
| Sessão e nome do usuário logado        | ✅     |
| Filtro por categoria                   | ✅     |
| SPA parcial com navegação              | ✅     |

---

## 7. Procedimentos de Execução

### 7.1. Requisitos

- Navegador moderno (recomenda-se Google Chrome).

### 7.2. ADMINISTRADOR PADRÃO
- Quando você inicia o projeto pela primeira vez e deseja acessar as páginas do administrador, já existe uma conta padrão com o atributo de administrador:
```bash
    email: nest@empresa.com
    password: admin123
```
### 7.3. Execução

1. Clonar o repositório:
   ```bash
   git clone https://github.com/GAMA544/milestone1-Supermarket.git


# 📄 Relatório de Projeto – Milestone 3: Aplicação Completa com Backend e Banco de Dados

## 1. Visão Geral

Nesta última etapa do projeto, a aplicação da loja online foi finalizada com todas as funcionalidades implementadas, incluindo:

- Integração completa com **servidor Node.js**
- Conexão real com banco de dados **MongoDB Atlas**
- Migração total dos dados do `localStorage` para **coleções MongoDB**
- Implementação de rotas REST para usuários e produtos
- Deploy local totalmente funcional, com persistência e controle de sessão

---

## 2. Migração de Dados e Backend

### 🔄 Migração de `localStorage` para MongoDB

Anteriormente, todas as funcionalidades da loja (usuários, produtos, carrinho) eram baseadas em `localStorage`, o que limitava a persistência e escalabilidade. Agora:

- Os **produtos** e **usuários** são armazenados em coleções no MongoDB Atlas (`nest_supermarket.produtos` e `nest_supermarket.usuarios`)
- As operações de leitura, criação, edição e exclusão são feitas via **API REST**
- Scripts JS como `login.js`, `register.js`, `renderProdutos.js`, `admin-edit-product.js` foram **modificados para usar `fetch()` e consumir as rotas do backend**

---

## 3. Backend: Estrutura e Tecnologias

### 📁 Estrutura

```
backend/
├── .env                     # String de conexão com MongoDB Atlas
├── models/
│   ├── Produto.js           # Esquema do Produto (Mongoose)
│   └── Usuario.js           # Esquema do Usuário (Mongoose)
├── routes/
│   ├── produtos.js          # Rotas GET, POST, PUT, DELETE para produtos
│   ├── usuarios.js          # Autenticação, criação e edição de usuários
│   └── initUser.js          # Cria admin inicial se não existir
├── server.js                # Inicialização do servidor Express
├── package.json             # Dependências e scripts
```

### 🧠 Tecnologias Usadas

- **Node.js + Express**: servidor e rotas
- **MongoDB Atlas**: banco de dados NoSQL na nuvem
- **Mongoose**: ODM para modelar dados
- **dotenv**: carregamento da string de conexão segura
- **CORS e JSON Middleware**: configuração do Express para lidar com requisições web

---

## 4. Funcionalidades Completas

| Funcionalidade                          | Status |
|-----------------------------------------|--------|
| Login com sessão                        | ✅     |
| Redirecionamento por tipo de usuário    | ✅     |
| CRUD completo de produtos (MongoDB)     | ✅     |
| CRUD completo de usuários (MongoDB)     | ✅     |
| Carrinho funcional                      | ✅     |
| Geração de boleta                       | ✅     |
| Formulário de contato funcional         | ✅     |
| Autenticação com email/senha            | ✅     |
| Admin inicial criado automaticamente    | ✅     |
| Atualização de estoque após compra      | ✅     |

---

## 5. Execução do Projeto

### 5.1. Pré-requisitos

- Node.js instalado (v16 ou superior)
- Conexão com internet (MongoDB Atlas)
- Navegador moderno

### 5.2. Instalação e Execução (passo a passo)

#### 📥 Clonar o repositório

```bash
git clone https://github.com/GAMA544/milestone1-Supermarket.git
cd milestone1-Supermarket/Milestone_3/backend
```

#### 📦 Instalar dependências do backend

```bash
npm install
```

#### ⚙️ Configurar variáveis de ambiente

O projeto já inclui o arquivo `.env` com:

```env
MONGO_URI=mongodb+srv://GAMA:70473411%40%2Eobj@m0.rtudete.mongodb.net/nest_supermarket
```

> Caso necessário, substitua com sua própria URI do MongoDB Atlas.

#### ▶️ Rodar o servidor

```bash
node server.js
```

Você verá no terminal:

```
Servidor rodando na porta 3000
Conectado ao MongoDB Atlas
```

---

### 5.3. Executar o Frontend

1. Acesse a pasta `pages`:

```bash
cd ../pages
```

2. Abra o arquivo `Produtos_Page.html` com um navegador (ou use extensão Live Server do VSCode)

---

### 5.4. Usuário Administrador Padrão

Foi criado automaticamente um admin padrão na coleção `usuarios`:

```txt
Email: nest@empresa.com
Senha: admin123
```

---

## 6. Observações Técnicas

- O código está modularizado: rotas e modelos separados
- A coleção `produtos` já vem com produtos registrados para testes
- O front consome as rotas da API utilizando `fetch` de forma assíncrona
- Ao fazer uma compra, o estoque é atualizado no banco em tempo real
- O projeto está pronto para ser publicado em plataformas como Render, Vercel ou Railway com pequenas adaptações

---

## 7. Capturas MongoDB Atlas

📸 Exemplo de documento da coleção `usuarios`:

![usuarios no MongoDB](imgs/imagenes/mongodb_usuarios.png)

📸 Exemplo de coleção `produtos`:

![produtos no MongoDB](imgs/imagenes/mongodb_produtos.png)

---

## ✅ Check de Requisitos Finais

| Item                                                     | Ok |
|----------------------------------------------------------|----|
| Backend com Node.js e Express                            | ✅ |
| Conexão com MongoDB Atlas                                | ✅ |
| Código bem comentado e formatado                         | ✅ |
| API funcional com rotas para usuários e produtos          | ✅ |
| Arquivo `index.html` existente                           | ✅ |
| Relatório atualizado com este milestone final            | ✅ |
| Projeto completo no GitHub                               | ✅ |



