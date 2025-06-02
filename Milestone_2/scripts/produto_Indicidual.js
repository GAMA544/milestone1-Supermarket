// Função utilitária para obter um parâmetro da URL (ex: ?id=5)
function getParamFromURL(name) {
  const params = new URLSearchParams(window.location.search); // Pega a string de query da URL
  return params.get(name); // Retorna o valor do parâmetro solicitado
}

// Recupera o ID do produto da URL e converte para número inteiro
const id = parseInt(getParamFromURL("id"));

// Carrega a lista de produtos armazenados no localStorage
const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Procura o produto com o ID correspondente
const produto = produtos.find(p => p.id === id);

// Se o produto foi encontrado, preenche os elementos da página com seus dados
if (produto) {
  document.getElementById("produto-nome").textContent = produto.nome;
  document.getElementById("produto-descricao").textContent = produto.descricao;
  document.getElementById("produto-marca").textContent = produto.marca;
  document.getElementById("produto-preco").textContent = `R$ ${produto.preco.toFixed(2)}`;
  document.getElementById("produto-img").src = produto.imagem;
  document.getElementById("produto-apresentacao").textContent = produto.apresentacao;
  document.getElementById("produto-quantidade").textContent = produto.estoque;
} else {
  // Caso o produto não exista, exibe uma mensagem de erro
  document.body.innerHTML = "<h2>Produto não encontrado</h2>";
}

// Função chamada ao clicar nos botões "+" ou "-" de quantidade
function alterarQuantidade(delta) {
  const input = document.getElementById("quantidade"); // Campo de input numérico
  let valor = parseInt(input.value); // Valor atual
  let estoque = parseInt(document.getElementById("produto-quantidade").textContent); // Estoque disponível

  if (isNaN(valor)) valor = 1; // Garante que sempre haja um valor numérico

  valor += delta; // Adiciona ou subtrai conforme o botão clicado

  if (valor < 1) valor = 1; // Garante valor mínimo de 1
  if (valor > estoque) {
    alert("Quantidade excede o estoque disponível.");
    valor = estoque;
  }

  input.value = valor; // Atualiza o campo de input com o novo valor
}

// Função chamada ao clicar no botão "Adicionar ao carrinho"
function adicionarAoCarrinho() {
  const quantidade = parseInt(document.getElementById("quantidade").value); // Quantidade desejada
  if (quantidade < 1 || isNaN(quantidade)) {
    alert("Quantidade inválida.");
    return;
  }

  // Recupera o carrinho atual da sessão (sessionStorage é apagado ao fechar o navegador)
  let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

  // Verifica se o produto já está no carrinho
  const existente = carrinho.find(item => item.id === produto.id);

  if (existente) {
    // Se já existir, apenas aumenta a quantidade
    existente.quantidade += quantidade;
  } else {
    // Se não existir, adiciona um novo item ao carrinho
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: quantidade
    });
  }

  // Atualiza o carrinho no sessionStorage
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Exibe confirmação visual ao usuário
  alert("Produto adicionado ao carrinho!");
  window.location.href = `../pages/carrito_compras.html`; // Redireciona para a página do carrinho
}
