// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // ----- MÁSCARAS DE ENTRADA PARA CAMPOS DO FORMULÁRIO DE CARTÃO -----

  // Permite apenas letras e espaços no campo "nome do cartão"
  document.getElementById("nome-cartao").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
  });

  // Formata o número do cartão em blocos de 4 dígitos separados por espaço
  document.getElementById("numero-cartao").addEventListener("input", e => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 16);
    e.target.value = val.replace(/(\d{4})(?=\d)/g, "$1 ");
  });

  // Formata a validade do cartão no formato MM/AA
  document.getElementById("validade-cartao").addEventListener("input", e => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 4);
    e.target.value = val.length > 2 ? val.replace(/(\d{2})(\d+)/, "$1/$2") : val;
  });

  // Permite somente 3 dígitos numéricos no campo de CVV
  document.getElementById("cvv-cartao").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
  });

  // ----- CALCULA O TOTAL A PAGAR COM BASE NOS PRODUTOS DO CARRINHO -----
  const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  const total = carrinho.reduce((acc, p) => acc + p.quantidade * p.preco, 0); // Soma o total de todos os produtos no carrinho
  const totalInput = document.getElementById("total");
  totalInput.value = `R$ ${total.toFixed(2).replace(".", ",")}`;
  totalInput.readOnly = true;

  // ----- EVENTO AO CLICAR EM "CONFIRMAR PAGAMENTO" -----
  document.getElementById("btn-confirmar").addEventListener("click", async (e) => {
    e.preventDefault(); // Evita que o formulário envie normalmente

    // Captura os dados do formulário
    const nome = document.getElementById("nome-cartao").value.trim();
    const numero = document.getElementById("numero-cartao").value.trim();
    const validade = document.getElementById("validade-cartao").value.trim();
    const cvv = document.getElementById("cvv-cartao").value.trim();

    // Verificação básica dos campos
    if (!nome || numero.length < 19 || validade.length < 5 || cvv.length !== 3) {
      alert("Preencha corretamente todos os campos do cartão.");
      return;
    }

    // Chama função para processar a compra e gerar o PDF
    await finalizarCompra();

    // Limpa o formulário e redireciona para página de produtos
    document.getElementById("form-pago").reset();
    window.location.href = "Produtos_Page.html";
  });
});

// -------- FUNÇÃO PRINCIPAL PARA PROCESSAR A COMPRA --------
async function finalizarCompra() {
  const carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  const produtosLS = JSON.parse(localStorage.getItem("produtos")) || [];
  const usuario = JSON.parse(sessionStorage.getItem("loggedUser")) || { name: "Usuário desconhecido" };

  // Se o carrinho estiver vazio, interrompe
  if (carrinho.length === 0) {
    alert("Carrinho vazio.");
    return;
  }

  // Para cada produto, realiza uma "compra" via POST simulado
  for (let produto of carrinho) {
    const estoqueAtual = produtosLS.find(p => p.id === produto.id)?.estoque || 0;

    try {
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

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        atualizarEstoqueLocal(produto.id, data.new_quantity, produto.quantidade);
      } else {
        throw new Error("Resposta de Beeceptor não é JSON");
      }

    } catch (error) {
      console.error(`Erro ao comprar ${produto.nome}:`, error);
      alert("Erro na compra. Tente novamente.");
      return;
    }
  }

  // Gera e baixa a boleta PDF
  await gerarBoletaECriarDownload(carrinho, usuario);
  sessionStorage.removeItem("carrinho");
}

  // -------- ATUALIZA O ESTOQUE NO LOCALSTORAGE --------
function atualizarEstoqueLocal(id, novoEstoque, quantidadeVendida) {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const index = produtos.findIndex(p => Number(p.id) === Number(id));
  if (index !== -1) {
    produtos[index].estoque = novoEstoque;
    produtos[index].vendidos += quantidadeVendida;
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }
}

// -------- GERA E FAZ DOWNLOAD DO COMPROVANTE EM PDF --------
async function gerarBoletaECriarDownload(carrinho, usuario) {
  return new Promise(resolve => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const agora = new Date();
    const data = agora.toLocaleDateString();
    const hora = agora.toLocaleTimeString();

    // Cabeçalho
    doc.setFontSize(18);
    doc.setTextColor(40, 100, 70);
    doc.text("Nest Supermarkt", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Cliente: ${usuario.name}`, 14, 30);
    doc.text(`Data: ${data} ${hora}`, 14, 38);

    // Tabela com produtos
    const cabecalho = [["Produto", "Qtd", "Preço Unitário", "Subtotal"]];
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

    doc.autoTable({
      head: cabecalho,
      body: linhas,
      startY: 45,
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [117, 176, 91] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // Total final
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`TOTAL: R$ ${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

    // Baixa o PDF
    doc.save("boleta_compra.pdf");

    // Espera mínima antes de redirecionar
    setTimeout(resolve, 100);
  });
}
