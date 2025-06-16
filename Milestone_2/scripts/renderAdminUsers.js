// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

  // Recupera a lista de usuários do localStorage, ou um array vazio se não existir
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Seleciona o corpo da tabela onde os usuários serão listados
  const tbody = document.querySelector(".scrollable-tbody tbody");

  // Se o elemento tbody não existir, encerra a função
  if (!tbody) return;

  // Limpa qualquer conteúdo anterior no tbody
  tbody.innerHTML = "";

  // Itera sobre cada usuário da lista
  users.forEach((user) => {
    // Cria uma nova linha da tabela (<tr>)
    const tr = document.createElement("tr");

    // Define o conteúdo da linha com os dados do usuário
    tr.innerHTML = `
      <td>${user.id}</td>                              <!-- ID do usuário -->
      <td>${user.name}</td>                            <!-- Nome -->
      <td>${user.email}</td>                           <!-- Email -->
      <td>${user.role}</td>                            <!-- Papel (admin, cliente, etc.) -->
      <td>${user.ativo === false ? "Inativo" : "Ativo"}</td> <!-- Status -->
      <td class="action-buttons">                      <!-- Botões de ação -->
        <button class="btn-icon edit" data-id="${user.id}">
          <i class="fas fa-edit"></i>                  <!-- Ícone de editar -->
        </button>
        <button class="btn-icon delete" data-id="${user.id}">
          <i class="fas fa-trash-alt"></i>             <!-- Ícone de deletar -->
        </button>
      </td>
    `;

    // Adiciona a linha ao corpo da tabela
    tbody.appendChild(tr);
  });

  // Seleciona todos os botões de deletar e adiciona escutadores de evento
  document.querySelectorAll(".btn-icon.delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Obtém o ID do usuário a partir do atributo data-id do botão clicado
      const id = e.currentTarget.dataset.id;

      // Exibe um diálogo de confirmação antes de excluir
      if (confirm("Deseja realmente excluir este usuário?")) {
        // Filtra os usuários removendo o que tem o ID correspondente
        const novaLista = users.filter(u => String(u.id) !== id);

        // Atualiza o localStorage com a nova lista sem o usuário removido
        localStorage.setItem("users", JSON.stringify(novaLista));

        // Recarrega a página para atualizar a tabela
        location.reload();
      }
    });
  });

  // Seleciona todos os botões de editar e adiciona escutadores de evento
  document.querySelectorAll(".btn-icon.edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Obtém o ID do usuário a partir do atributo data-id
      const id = e.currentTarget.dataset.id;

      // Salva o ID do usuário em edição no localStorage para uso na página de edição
      localStorage.setItem("editandoUsuarioId", id);

      // Redireciona o navegador para a página de edição do usuário
      window.location.href = "admin-edit-user.html";
    });
  });
});
