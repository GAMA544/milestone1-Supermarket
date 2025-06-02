// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona o elemento <form> da página para manipular o envio de login
    const form = document.querySelector("form");

    // Adiciona um "ouvinte" de evento que será disparado quando o formulário for enviado
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o comportamento padrão do envio (recarregar a página)

        // Captura e remove espaços em branco do início/fim do valor digitado no campo de email ou CPF
        const inputEmail = document.getElementById("email").value.trim();

        // Captura a senha digitada pelo usuário
        const inputSenha = document.getElementById("password").value;

        // Recupera a lista de usuários previamente cadastrados no localStorage
        // Se não existir nada, cria um array vazio
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Busca no array um usuário que tenha email ou CPF correspondente e senha correta
        const userEncontrado = users.find(user =>
            (user.email === inputEmail || user.CPF === inputEmail) &&
            user.password === inputSenha
        );

        // Verifica se um usuário válido foi encontrado
        if (userEncontrado) {
            // Armazena os dados do usuário encontrado na sessionStorage
            // Isso serve para manter o estado de "usuário logado" durante a sessão
            sessionStorage.setItem("loggedUser", JSON.stringify(userEncontrado));

            // Informa o usuário com um alerta de sucesso
            alert("Login realizado com sucesso!");

            // Redireciona para diferentes páginas com base no tipo de usuário
            if (userEncontrado.role === "admin") {
                // Se o usuário for administrador, redireciona para a página de administração de produtos
                window.location.href = "admin-productos.html";
            } else {
                // Caso contrário (cliente comum), redireciona para a página geral de produtos
                window.location.href = "Produtos_Page.html";
            }

        } else {
            // Se nenhum usuário válido for encontrado, exibe um alerta de erro
            alert("Usuário ou senha inválidos.");
        }
    });

});
