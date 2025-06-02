// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

  // Recupera a lista de produtos do localStorage ou inicializa como array vazio
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Seleciona o corpo da tabela dentro de um container com scroll
  const tbody = document.querySelector(".scrollable-tbody tbody");

  // Se o tbody não existir, encerra a execução
  if (!tbody) return;

  // Limpa o conteúdo atual da tabela para re-renderizar do zero
  tbody.innerHTML = "";

  // Itera sobre cada produto para criar uma linha na tabela
  produtos.forEach((produto, index) => {
    // Cria o elemento <tr> (linha da tabela)
    const tr = document.createElement("tr");

    // Define o conteúdo HTML da linha com os dados do produto
    tr.innerHTML = `
      <td>${index + 1}</td>                             <!-- Número sequencial -->
      <td class="asset-name">                          <!-- Nome + imagem -->
        <img src="${produto.imagem}" alt="${produto.nome}" class="asset-icon">
        <span>${produto.nome}</span>
      </td>
      <td>${produto.apresentacao}</td>                     <!-- Unidade/apresentacao -->
      <td>${produto.categoria}</td>                    <!-- Categoria do produto -->
      <td>R$${parseFloat(produto.preco).toFixed(2).replace('.', ',')}</td> <!-- Preço formatado -->
      <td>${produto.estoque}</td>                      <!-- Estoque disponível -->
      <td class="action-buttons">                      <!-- Botões de ação -->
        <button class="btn-icon edit" data-id="${produto.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon delete" data-id="${produto.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;

    // Adiciona a linha criada ao corpo da tabela
    tbody.appendChild(tr);
  });

  // Bloco de eventos para o botão de editar produto
  document.querySelectorAll(".btn-icon.edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id; // Obtém o ID do produto do atributo data-id
      localStorage.setItem("editandoProdutoId", id); // Salva o ID no localStorage para carregar na tela de edição
      window.location.href = "admin-edit-product.html"; // Redireciona para a página de edição
    });
  });

  // Bloco de eventos para o botão de deletar produto
  document.querySelectorAll(".btn-icon.delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id; // Obtém o ID do produto

        // Confirma se o usuário deseja realmente excluir
        if (confirm("Deseja realmente excluir este produto?")) {
          // Recupera novamente a lista de produtos do localStorage
          const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

          // Filtra a lista para remover o produto com o ID correspondente
          const novaLista = produtos.filter(p => String(p.id) !== id);

          // Atualiza o localStorage com a nova lista
          localStorage.setItem("produtos", JSON.stringify(novaLista));

          // Recarrega a página para atualizar a tabela
          location.reload();
        }
    });
  });

});
