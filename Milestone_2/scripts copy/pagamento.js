async function finalizarCompra(event) {
  // Recupera o carrinho de compras da sessão atual
  const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

  // Recupera os produtos cadastrados do localStorage (base local)
  const produtosLS = JSON.parse(localStorage.getItem("produtos")) || [];

  // Recupera os dados do usuário logado; se não existir, define um nome genérico
  const usuario = JSON.parse(sessionStorage.getItem("loggedUser")) || { name: "Usuário desconhecido" };

  // Verifica se o carrinho está vazio
  if (carrinho.length === 0) {
    alert("Carrinho vazio.");
    return; // Sai da função sem continuar
  }


  // Itera sobre cada item do carrinho
  for (let produto of carrinho) {
    // Busca o estoque atual do produto no localStorage
    const estoqueAtual = produtosLS.find(p => p.id === produto.id)?.estoque || 0;

    try {
      // Envia requisição POST simulada para a API do Beeceptor com os dados da compra
      const response = await fetch(`https://milestone-2.free.beeceptor.com/comprar/${produto.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: produto.id,
          nameProduct: produto.nome,
          price: produto.preco,
          stock: estoqueAtual,
          quantity: produto.quantidade
        })
      });     

      // Verifica se a resposta tem tipo JSON
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json(); // Lê o corpo da resposta como JSON

        // Atualiza o estoque local com base na nova quantidade vinda da resposta
        atualizarEstoqueLocal(produto.id, data.new_quantity, produto.quantidade);
      } else {
        throw new Error("Resposta de Beeceptor não é JSON");
      }

    } catch (error) {
      // Captura e exibe erro na compra de um produto
      console.error(`Erro ao comprar ${produto.nome}:`, error);
      alert("Erro na compra. Tente novamente.");
      return; // Sai da função
    }
  }

  // Gera e baixa a boleta após finalizar todas as compras com sucesso
  gerarBoletaECriarDownload(carrinho, usuario);

  // Limpa o carrinho da sessão
  sessionStorage.removeItem("carrinho");
}

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

  // Seleciona o campo de input com o id="total" onde o valor final da compra será exibido
  const totalInput = document.getElementById("total");

  // Recupera o carrinho armazenado na sessionStorage (memória da aba atual do navegador).
  // Se não houver carrinho salvo, retorna um array vazio.
  const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

  // Inicializa uma variável para somar o valor total da compra
  let total = 0;

  // Itera sobre cada item do carrinho e acumula o total: quantidade × preço de cada produto
  carrinho.forEach(produto => {
    total += produto.quantidade * produto.preco;
  });

  // Define o valor final calculado no campo de input "total", formatando como moeda brasileira
  totalInput.value = `R$ ${total.toFixed(2).replace(".", ",")}`;

  // Impede que o campo seja editável pelo usuário
  totalInput.readOnly = true;
});



function atualizarEstoqueLocal(id, novoEstoque, quantidadeVendida) {
  // Recupera todos os produtos do localStorage
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Encontra o índice do produto com o ID fornecido
  const index = produtos.findIndex(p => Number(p.id) === Number(id));

  // Se o produto foi encontrado
  if (index !== -1) {
    // Atualiza o valor do estoque e incrementa a quantidade vendida
    produtos[index].estoque = novoEstoque;
    produtos[index].vendidos += quantidadeVendida;

    // Salva a nova lista de produtos no localStorage
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Log para depuração
    console.log(`✅ Estoque: ${novoEstoque}, Vendidos: ${produtos[index].vendidos} (${produtos[index].nome})`);
  } else {
    // Caso o produto não seja encontrado no localStorage
    console.warn(`⚠️ Produto com id ${id} não encontrado no localStorage.`);
  }
}

async function gerarBoletaECriarDownload(carrinho, usuario) {
  // Importa a classe jsPDF
  const { jsPDF } = window.jspdf;

  // Instância do PDF
  const doc = new jsPDF();

  // Data e hora
  const agora = new Date();
  const data = agora.toLocaleDateString();
  const hora = agora.toLocaleTimeString();

  // Título da boleta
  doc.setFontSize(18);
  doc.setTextColor(40, 100, 70);
  doc.text("Nest Supermarkt", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Cliente: ${usuario.name}`, 14, 30);
  doc.text(`Data: ${data} ${hora}`, 14, 38);

  // Cabeçalho da tabela
  const cabecalho = [["Produto", "Qtd", "Preço Unitário", "Subtotal"]];

  // Linhas com os produtos do carrinho
  let total = 0;
  const linhas = carrinho.map(item => {
    const subtotal = item.quantidade * item.preco;
    total += subtotal;
    return [
      item.nome.length > 30 ? item.nome.slice(0, 27) + "..." : item.nome,
      item.quantidade.toString(),
      `R$ ${item.preco.toFixed(2)}`,
      `R$ ${subtotal.toFixed(2)}`
    ];
  });

  // Gera tabela com autoTable
  doc.autoTable({
    head: cabecalho,
    body: linhas,
    startY: 45,
    styles: {
      fontSize: 10,
      cellPadding: 4
    },
    headStyles: {
      fillColor: [117, 176, 91] // cor verde Nest
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });

  // Total da compra
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`TOTAL: R$ ${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

  // Gera e baixa o PDF
  doc.save("boleta_compra.pdf");
}
