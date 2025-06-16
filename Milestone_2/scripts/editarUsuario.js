// Aguarda o carregamento completo do DOM antes de executar qualquer lógica
document.addEventListener("DOMContentLoaded", () => {

  // Recupera do localStorage o ID do usuário que será editado
  const idUsuario = localStorage.getItem("editandoUsuarioId");

  // Se não houver ID armazenado, interrompe a execução do script
  if (!idUsuario) return;

  // Recupera todos os usuários previamente armazenados no localStorage
  const usuarios = JSON.parse(localStorage.getItem("users")) || [];

  // Procura o usuário cujo ID corresponde ao valor armazenado
  const usuario = usuarios.find(u => String(u.id) === idUsuario);

  // Caso o usuário não seja encontrado, exibe alerta e cancela a operação
  if (!usuario) {
    alert("Usuário não encontrado.");
    return;
  }

  // Preenche os campos do formulário com os dados do usuário localizado
  document.getElementById("id").value        = usuario.id;
  document.getElementById("nome").value      = usuario.name;
  document.getElementById("email").value     = usuario.email;
  document.getElementById("telefone").value  = usuario.phone;
  document.getElementById("endereco").value  = usuario.address;
  document.getElementById("cpf").value       = usuario.CPF;
  document.getElementById("role").value      = usuario.role;
  document.getElementById("status").value    = usuario.ativo === false ? "inativo" : "ativo";

  // Adiciona um listener ao envio do formulário para salvar as alterações
  document.getElementById("form-usuario").addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregamento da página

    // Atualiza os dados do objeto `usuario` com os novos valores do formulário
    usuario.name       = document.getElementById("nome").value;
    usuario.email      = document.getElementById("email").value;
    usuario.phone      = document.getElementById("telefone").value;
    usuario.address    = document.getElementById("endereco").value;
    usuario.CPF        = document.getElementById("cpf").value;
    usuario.role       = document.getElementById("role").value;
    usuario.ativo      = document.getElementById("status").value === "ativo";

    // Substitui o usuário original na lista por este atualizado
    const novosUsuarios = usuarios.map(u => u.id === usuario.id ? usuario : u);

    // Persiste a lista atualizada no localStorage
    localStorage.setItem("users", JSON.stringify(novosUsuarios));

    // Informa sucesso ao usuário e redireciona para a lista de usuários
    alert("Usuário atualizado com sucesso!");
    window.location.href = "admin-usuarios.html";
  });
});
