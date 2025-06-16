// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

    // Recupera os dados do usuário logado armazenados na sessionStorage (em formato JSON)
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));

    // Se não houver usuário logado, exibe um alerta e redireciona para a página de login
    if (!user) {
        alert("Nenhum usuário logado. Redirecionando para o login...");
        window.location.href = "loginpage.html";
        return; // Encerra a execução do script
    }

    // Insere os dados do usuário nos elementos HTML correspondentes
    // O operador ?? (nullish coalescing) garante que, se o valor for null ou undefined, será exibido "-"
    document.getElementById("user-doc").textContent     = user.CPF     ?? "-"; // Documento (CPF)
    document.getElementById("user-name").textContent    = user.name    ?? "-"; // Nome do usuário
    document.getElementById("user-address").textContent = user.address ?? "-"; // Endereço
    document.getElementById("user-phone").textContent   = user.phone   ?? "-"; // Telefone
    document.getElementById("user-email").textContent   = user.email   ?? "-"; // E-mail

    // Exibe uma mensagem personalizada de boas-vindas
    document.getElementById("bienvenida").textContent = `Bem-vindo, ${user.name}!`;

    // Seleciona o <span> que mostrará a senha e o botão que alterna a visibilidade
    const passwordSpan = document.getElementById("user-password");
    const toggleButton = document.getElementById("toggle-password");

    // Variável de controle que indica se a senha está visível ou não
    let senhaVisivel = false;

    // Inicialmente oculta a senha, substituindo cada caractere por um ponto (•)
    passwordSpan.textContent = user.password.replace(/./g, "•");

    // Evento de clique para alternar entre mostrar e ocultar a senha
    toggleButton.addEventListener("click", () => {
        if (senhaVisivel) {
            // Se a senha estiver visível, oculta novamente
            passwordSpan.textContent = user.password.replace(/./g, "•");
            toggleButton.title = "Mostrar senha"; // Atualiza o título do botão (tooltip)
            senhaVisivel = false; // Atualiza a variável de controle
        } else {
            // Se a senha estiver oculta, mostra em texto claro
            passwordSpan.textContent = user.password;
            toggleButton.title = "Ocultar senha"; // Atualiza o título do botão (tooltip)
            senhaVisivel = true; // Atualiza a variável de controle
        }
    });

});
