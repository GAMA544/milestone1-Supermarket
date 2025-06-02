// Função que renderiza dinamicamente a lista de categorias de produtos em um elemento do tipo <ul> ou <ol>
function renderizarCategorias(containerId = "lista-categorias") {

  // Obtém o elemento do DOM com o ID fornecido (por padrão: "lista-categorias")
  const container = document.getElementById(containerId);

  // Verifica se o elemento existe na página. Se não existir, exibe aviso no console e encerra a função
  if (!container) {
    console.warn(`Contêiner "${containerId}" não encontrado no DOM.`);
    return;
  }

  // Recupera os produtos armazenados no localStorage e converte em array. Se estiver vazio, assume array vazio
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Verifica se há produtos cadastrados. Se não houver, exibe aviso no console e encerra a função
  if (produtos.length === 0) {
    console.warn("Nenhum produto carregado.");
    return;
  }

  // Cria um array com as categorias únicas dos produtos, eliminando duplicatas com Set
  const categorias = [...new Set(produtos.map(p => p.categoria))];

  // Limpa qualquer conteúdo HTML anterior no contêiner
  container.innerHTML = "";

  // Para cada categoria identificada, cria um item de lista (<li>)
  categorias.forEach(cat => {
    const item = document.createElement("li");      // Cria o elemento <li>
    item.textContent = cat;                         // Define o texto como o nome da categoria
    item.className = "cat-item";                    // Aplica uma classe CSS padrão
    item.dataset.categoria = cat;                   // Atribui um atributo data-* com o nome da categoria

    // Se a categoria atual for "Frutas", define como a categoria inicialmente ativa
    if (cat === "Frutas") {
      item.classList.add("active");
    }

    // Adiciona um evento de clique ao item de categoria
    item.addEventListener("click", () => {
      // Se o item já estiver ativo, não faz nada
      if (item.classList.contains("active")) return;

      // Remove a classe 'active' de todos os itens da lista
      document.querySelectorAll(".cat-item").forEach(li => li.classList.remove("active"));

      // Adiciona a classe 'active' somente ao item clicado
      item.classList.add("active");

      // Chama a função que filtra os produtos pela categoria selecionada
      filtrarPorCategoria(cat);
    });

    // Adiciona o item <li> ao contêiner de categorias
    container.appendChild(item);
  });

  // Ao final, aplica o filtro padrão para a categoria "Frutas"
  filtrarPorCategoria("Frutas");
}
