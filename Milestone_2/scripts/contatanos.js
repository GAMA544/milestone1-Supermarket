// Aguarda o carregamento completo do DOM antes de iniciar o script
document.addEventListener("DOMContentLoaded", () => {

  // Recupera o usuário logado da sessão (sessionStorage)
  const usuario = JSON.parse(sessionStorage.getItem("loggedUser"));

  // Verifica se há um usuário logado e com nome definido
  if (!usuario || !usuario.name) {
    alert("Você precisa estar logado para enviar uma mensagem."); // Alerta ao usuário
    window.location.href = "loginpage.html"; // Redireciona para a página de login
    return; // Interrompe o restante do script
  }

  // Preenche automaticamente os campos de nome e e-mail no formulário com os dados do usuário logado
  document.getElementById("name").value = usuario.name;
  document.getElementById("email").value = usuario.email;

  // Seleciona o formulário de contato usando a classe CSS definida
  const form = document.querySelector(".contact-form");

  // Adiciona um listener para o evento de envio do formulário
  form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede que a página recarregue ao enviar o formulário

    // Cria um objeto FormData com os dados preenchidos no formulário
    const formData = new FormData(form);

    try {
      // Envia os dados para o serviço Formspree usando fetch com método POST
      const response = await fetch("https://formspree.io/f/mvgalepo", {
        method: "POST",
        body: formData, // Dados do formulário
        headers: {
          Accept: "application/json" // Indica que queremos uma resposta JSON
        }
      });

      // Verifica se o envio foi bem-sucedido
      if (response.ok) {
        alert("Mensagem enviada com sucesso!"); // Informa sucesso ao usuário
        form.reset(); // Limpa todos os campos do formulário após envio
      } else {
        alert("Erro ao enviar. Tente novamente."); // Caso algo falhe na requisição
      }
    } catch (error) {
      // Caso ocorra erro de rede ou outro erro inesperado
      alert("Erro inesperado: " + error.message);
    }
  });
});
