function verProducto(id) {
  window.location.href = `../pages/Produto_Individual.html?id=${id}`;
}

function filtrarPorCategoria(categoria) {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const container = document.getElementById("produtos-container");

  if (!container) return;

  container.innerHTML = "";

  const filtrados = produtos.filter(p => p.categoria === categoria);

  if (filtrados.length === 0) {
    container.innerHTML = "<p>Nenhum produto encontrado nesta categoria.</p>";
    return;
  }

  filtrados.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    card.innerHTML = `
      <img src="${prod.imagem}" alt="${prod.nome}">
      <h4>${prod.nome}</h4>
      <p><strong>Marca:</strong> ${prod.marca}</p>
      <p><strong>apresentacao:</strong> ${prod.apresentacao}</p>
      <p class="precio">R$ ${prod.preco.toFixed(2)}</p>
      <button onclick="verProducto(${prod.id})">ADICIONAR</button>
    `;

    container.appendChild(card);
  });
}
