// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

  // Seleciona o elemento onde as informações do usuário logado serão exibidas
  const userInfo = document.getElementById("user-info");

  // Recupera os dados do usuário logado armazenados na sessionStorage
  const usuario = JSON.parse(sessionStorage.getItem("loggedUser"));

  // Verifica se existe um usuário logado e se ele possui o campo "name"
  if (usuario && usuario.name) {

    // Inicia a estrutura HTML do menu de usuário com o nome e imagem de perfil
    let menuHTML = `
      <div class="usuario-toggle">
        <div class="perfil" id="perfil-clickable">
          <span>${usuario.name}</span>
          <img src="../imagenes/default_user.png" alt="Usuário">
        </div>
        <div id="logout-opcoes" class="logout-menu">
          <button id="btn-logout" class="logout-button">Sair</button>
    `;

    // Se o usuário for administrador, adiciona o botão "Admin" ao menu
    if (usuario.role === "admin") {
      menuHTML += `
        <button id="btn-admin" class="admin-button">Admin</button>
      `;
    }

    // Finaliza a estrutura HTML do menu
    menuHTML += `</div></div>`;

    // Insere o HTML gerado dentro do elemento user-info na página
    userInfo.innerHTML = menuHTML;

    // Seleciona o elemento de perfil que será clicável (nome + imagem)
    const perfilClickable = document.getElementById("perfil-clickable");

    // Seleciona o contêiner do menu suspenso (logout e, se for admin, botão admin)
    const logoutMenu = document.getElementById("logout-opcoes");

    // Adiciona evento de clique para alternar a visibilidade do menu
    perfilClickable.addEventListener("click", () => {
      logoutMenu.classList.toggle("show"); // adiciona ou remove a classe CSS 'show'
    });

    // Adiciona evento de clique no botão "Sair"
    document.getElementById("btn-logout").addEventListener("click", () => {
      // Remove o usuário logado da sessionStorage (encerrando a sessão)
      sessionStorage.removeItem("loggedUser");

      // Redireciona para a página de login
      window.location.href = "loginpage.html";
    });

    // Se o botão "Admin" estiver presente no DOM (ou seja, se for admin)
    const btnAdmin = document.getElementById("btn-admin");
    if (btnAdmin) {
      // Redireciona para a página de administração de produtos
      btnAdmin.addEventListener("click", () => {
        window.location.href = "admin-productos.html";
      });
    }
  }
});
