// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  
  // Recupera o ID do produto que foi salvo anteriormente para edição
  const idProduto = localStorage.getItem("editandoProdutoId");
  
  // Se nenhum ID foi encontrado, não há edição a fazer → encerra o script
  if (!idProduto) return;

  // Recupera a lista de produtos do localStorage, ou array vazio se não houver
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Procura dentro da lista o produto cujo ID corresponde ao salvo
  const produto = produtos.find(p => String(p.id) === idProduto);

  // Se o produto não for encontrado, exibe alerta e encerra
  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  // Preenche os campos do formulário HTML com os dados atuais do produto
  document.getElementById("id").value = produto.id;                         // ID do produto
  document.getElementById("nome").value = produto.nome;                    // Nome
  document.getElementById("preco").value = produto.preco;                  // Preço
  document.getElementById("descricao").value = produto.descricao;          // Descrição
  document.getElementById("imagem").value = produto.imagem;                // URL da imagem
  document.getElementById("estoque").value = produto.estoque;              // Quantidade em estoque
  document.getElementById("vendidos").value = produto.vendidos;            // Quantidade vendida
  document.getElementById("categoria").value = produto.categoria;          // Categoria do produto
  document.getElementById("marca").value = produto.marca;                  // Marca do produto
  document.getElementById("unidade").value = produto.apresentacao;         // Unidade/apresentacao

  // Adiciona evento ao formulário para salvar as alterações feitas no produto
  document.getElementById("form-produto").addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário (recarregamento da página)

    // Atualiza o objeto `produto` com os novos valores dos campos do formulário
    produto.nome = document.getElementById("nome").value;
    produto.preco = parseFloat(document.getElementById("preco").value);           // Converte para número decimal
    produto.descricao = document.getElementById("descricao").value;
    produto.imagem = document.getElementById("imagem").value;
    produto.estoque = parseInt(document.getElementById("estoque").value);         // Converte para inteiro
    produto.vendidos = parseInt(document.getElementById("vendidos").value);       // Converte para inteiro
    produto.categoria = document.getElementById("categoria").value;
    produto.marca = document.getElementById("marca").value;
    produto.apresentacao = document.getElementById("unidade").value;

    // Cria uma nova lista de produtos atualizada (substitui o antigo pelo editado)
    const novosProdutos = produtos.map(p => p.id === produto.id ? produto : p);

    // Salva essa nova lista no localStorage, sobrescrevendo os dados antigos
    localStorage.setItem("produtos", JSON.stringify(novosProdutos));

    // Exibe mensagem de sucesso e redireciona para a página de administração de produtos
    alert("Produto atualizado com sucesso!");
    window.location.href = "admin-productos.html";
  });
});
