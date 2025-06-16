// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

  const idProduto = localStorage.getItem("editandoProdutoId");
  if (!idProduto) return;

  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const produto = produtos.find(p => String(p.id) === idProduto);

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  // Preenche os campos do formulário
  document.getElementById("id").value = produto.id;
  document.getElementById("nome").value = produto.nome;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("descricao").value = produto.descricao;
  document.getElementById("imagem").value = produto.imagem;
  document.getElementById("estoque").value = produto.estoque;
  document.getElementById("vendidos").value = produto.vendidos;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("marca").value = produto.marca;
  document.getElementById("unidade").value = produto.apresentacao;

  document.getElementById("form-produto").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Atualiza os campos do produto
    produto.nome = document.getElementById("nome").value;
    produto.preco = parseFloat(document.getElementById("preco").value);
    produto.descricao = document.getElementById("descricao").value;
    produto.imagem = document.getElementById("imagem").value;
    produto.estoque = parseInt(document.getElementById("estoque").value);
    produto.vendidos = parseInt(document.getElementById("vendidos").value);
    produto.categoria = document.getElementById("categoria").value;
    produto.marca = document.getElementById("marca").value;
    produto.apresentacao = document.getElementById("unidade").value;

      try {
        
      const response = await fetch(`https://milestone-2.free.beeceptor.com/edit/${produto.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        descricao: produto.descricao,
        imagem: produto.imagem,
        estoque: produto.estoque,
        vendidos: produto.vendidos,
        categoria: produto.categoria,
        marca: produto.marca,
        apresentacao: produto.apresentacao // <- cambia el nombre de la clave aquí
      })
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("✅ Produto atualizado:", data.status);
        alert(`Produto ${data.produtoAtualizado.nome} editado com sucesso!`);
      } else {
        throw new Error("Resposta de Beeceptor não é JSON");
      }

    } catch (error) {
      console.error("❌ Erro ao enviar para Beeceptor:", error);
      alert("Erro ao sincronizar com o servidor. Tente novamente.");
      return;
    }


    // Atualiza a lista local
    const novosProdutos = produtos.map(p => p.id === produto.id ? produto : p);
    localStorage.setItem("produtos", JSON.stringify(novosProdutos));

    alert("Produto atualizado com sucesso!");
    window.location.href = "admin-productos.html";
  });
});
