document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Verifica se o admin "Nest" já existe na lista
  const adminExistente = users.find(u => u.email === "nest@empresa.com");

  if (!adminExistente) {
    const adminNest = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      CPF: "000.000.000-00",
      name: "Nest",
      address: "Av. Central, 123 - São Paulo",
      phone: "(11) 99999-9999",
      email: "nest@empresa.com",
      password: "admin123",
      role: "admin"
    };

    // Adiciona o admin na lista existente
    users.push(adminNest);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("✅ Admin 'Nest' adicionado com sucesso.");
  } else {
    console.log("ℹ️ Admin 'Nest' já existe no localStorage.");
  }
  //localStorage.removeItem("users");
});
