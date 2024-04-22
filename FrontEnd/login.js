const formLogin = document.querySelector(".loginform");

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();
  // Récupération des valeurs des champs email et mot de passe
  const identifier = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value,
  };
  const chargeUtile = JSON.stringify(identifier);

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: chargeUtile,
    });

    if (response.ok) {
      const data = await response.json();

      const token = data.token;
      // Stocker le token
      window.sessionStorage.setItem("token", token);
      // Redirection vers la page d'accueil
      window.location.href = "index.html";
    }
    // Affichage d'un message d'erreur
    else {
      const ErrorMsg = document.querySelector(".error-msg");
      ErrorMsg.textContent = "Erreur dans l'identifiant ou le mot de passe";
    }
    document.querySelector("#email").value = null;
    document.querySelector("#password").value = null;
  } catch (error) {
    console.log("une erreur est survenue", error);
  }
});
