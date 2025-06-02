document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-add-produto");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const novoProduto = {
      id: produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
      nome: document.getElementById("nome").value.trim(),
      descricao: document.getElementById("descricao").value.trim(),
      imagem: document.getElementById("imagem").value.trim(),
      preco: parseFloat(document.getElementById("preco").value),
      estoque: parseInt(document.getElementById("estoque").value),
      vendidos: parseInt(document.getElementById("vendidos").value),
      categoria: document.getElementById("categoria").value,
      marca: document.getElementById("marca").value.trim(),
      apresentacao: document.getElementById("unidade").value // agora com select
    };

    // Validação simples extra (evita salvar campos vazios ou inválidos)
    if (isNaN(novoProduto.preco) || isNaN(novoProduto.estoque)) {
      alert("Preencha corretamente todos os campos numéricos.");
      return;
    }

    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto adicionado com sucesso!");
    window.location.href = "admin-productos.html";
  });
});
