// Função principal para renderizar os produtos adicionados ao carrinho de compras
function renderizarCarrinho() {
  // Obtém os elementos do DOM onde os produtos e o resumo serão inseridos
  const listaCarro = document.getElementById("lista-carro");
  const listaResumo = document.getElementById("lista-resumo");
  const totalCompra = document.getElementById("total-compra");

  // Recupera o carrinho da sessionStorage; se não houver, inicializa como array vazio
  let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

  // Limpa os elementos HTML para evitar duplicação na renderização
  listaCarro.innerHTML = "";
  listaResumo.innerHTML = "";

  let total = 0; // Inicializa o total da compra

  // Itera sobre cada item do carrinho para renderizar na tela
  carrinho.forEach(item => {
    // Calcula o subtotal de cada item (preço × quantidade)
    const subtotal = item.quantidade * item.preco;
    total += subtotal; // Acumula o subtotal no total

    // Cria um elemento de produto e insere os dados no formato HTML
    const divProduto = document.createElement("div");
    divProduto.classList.add("item-carrinho");

    // Define a estrutura visual do item com imagem, nome, marca, controles e preço
    divProduto.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <h3>${item.nome}</h3>
        <p class="marca">${item.marca || ""}</p>
        <div class="quantidade-controle">
          <button onclick="alterarQtd(${item.id}, -1)">−</button>
          <input type="number" id="qtd-${item.id}" value="${item.quantidade}" min="1" readonly>
          <button onclick="alterarQtd(${item.id}, 1)">+</button>
          <button onclick="removerProduto(${item.id})" title="Remover produto" style="margin-left: 10px; background-color: red;">
            🗑️
          </button>
        </div>
        <p><strong>R$ ${(item.preco).toFixed(2)}</strong></p>
      </div>
    `;

    // Adiciona o produto ao contêiner da lista
    listaCarro.appendChild(divProduto);

    // Cria o resumo para a seção lateral da compra
    const liResumo = document.createElement("li");
    liResumo.innerHTML = `<span>– ${item.nome}</span><span>R$ ${subtotal.toFixed(2)}</span>`;
    listaResumo.appendChild(liResumo);
  });

  // Atualiza o valor total da compra no elemento correspondente
  totalCompra.textContent = `R$ ${total.toFixed(2)}`;
}

// Função para alterar a quantidade de um produto no carrinho (±1)
function alterarQtd(id, delta) {
  let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

  // Localiza o item pelo ID
  const item = carrinho.find(p => p.id === id);
  if (!item) return;

  // Modifica a quantidade e garante que seja ao menos 1
  item.quantidade += delta;
  if (item.quantidade < 1) item.quantidade = 1;

  // Atualiza o carrinho na sessionStorage e renderiza novamente
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Função para remover um produto do carrinho completamente
function removerProduto(id) {
  let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

  // Remove o item filtrando todos os que não têm o ID especificado
  carrinho = carrinho.filter(p => p.id !== id);

  // Atualiza a sessionStorage com o novo estado do carrinho
  sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Executa a função de renderizar o carrinho assim que a página estiver carregada
document.addEventListener("DOMContentLoaded", renderizarCarrinho);

// Função para avançar para a etapa de pagamento
async function avanzarCompra() {
  // Recupera o usuário logado da sessionStorage
  const usuario = JSON.parse(sessionStorage.getItem("loggedUser"));

  // Verifica se há usuário autenticado; se não, redireciona para o login
  if (!usuario || !usuario.name) {
    alert("Você precisa estar logado para enviar uma mensagem.");
    window.location.href = "loginpage.html";
    return;
  }

  // Redireciona para a página de pagamento
  window.location.href = "pagamento.html";
}

// (Repetido) Garante que o carrinho seja renderizado ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrinho();
});
