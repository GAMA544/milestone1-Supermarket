// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

    // Máscaras de entrada para os campos CPF, telefone e nome
    const cpfInput = document.getElementById("documento");
    const phoneInput = document.getElementById("telefone");
    const nameInput = document.getElementById("nome");

    // Formatação dinâmica do CPF no formato 000.000.000-00
    cpfInput.addEventListener("input", () => {
        let value = cpfInput.value.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
        if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
                     .replace(/(\d{3})(\d)/, "$1.$2")
                     .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        cpfInput.value = value;
    });

    // Formatação dinâmica do telefone no formato (XX) XXXXX-XXXX
    phoneInput.addEventListener("input", () => {
        let value = phoneInput.value.replace(/\D/g, ""); // Remove não dígitos
        if (value.length > 11) value = value.slice(0, 11); // Máximo de 11 dígitos
        value = value.replace(/^(\d{2})(\d)/, "($1) $2")
                     .replace(/(\d{5})(\d)/, "$1-$2");
        phoneInput.value = value;
    });

    // Restringe o campo de nome para conter apenas letras e espaços
    nameInput.addEventListener("input", () => {
        nameInput.value = nameInput.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    });

    // Captura o formulário de registro
    const form = document.querySelector(".formulario-registro");

    // Ao submeter o formulário, executa o cadastro do usuário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário pelo navegador

        // Coleta os valores digitados nos campos
        const cpf = cpfInput.value.trim();
        const name = nameInput.value.trim();
        const address = document.getElementById("endereco").value.trim();
        const phone = phoneInput.value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("senha").value;

        // Recupera a lista atual de usuários cadastrados no localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Verifica se já existe um usuário com o mesmo e-mail
        const existe = users.some(u => u.email === email);
        if (existe) {
            alert("Este e-mail já está cadastrado.");
            return;
        }

        // Gera um novo ID baseado no maior ID existente
        const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

        // Cria o objeto do novo usuário
        const novoUsuario = {
            id: newId,
            CPF: cpf,
            name,
            address,
            phone,
            email,
            password,
            role: "admin" // Define o tipo do usuário como administrador
        };

        // Adiciona o novo usuário à lista e salva no localStorage
        users.push(novoUsuario);
        localStorage.setItem("users", JSON.stringify(users));

        // Armazena o usuário atualmente logado na sessionStorage
        sessionStorage.setItem("loggedUser", JSON.stringify(novoUsuario));

        // Exibe mensagem de sucesso e redireciona para a página de produtos
        alert("Usuário registrado com sucesso!");
        window.location.href = "Produtos_Page.html";
    });

    // Exibe no console a lista de usuários atualmente armazenada
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
        console.log("Nenhum usuário registrado no localStorage.");
    } else {
        console.log("Lista de usuários registrados no localStorage:");
        console.table(users); // Mostra os dados em formato de tabela no console
    }

    // Linha opcional para apagar completamente o localStorage (comentada por padrão)
    // localStorage.clear(); // Remove todos os dados armazenados localmente
});
