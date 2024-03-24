// Appel a l API pour recuperer les projets

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

// Appel a l API pour recuperer les filtres
const response2 = await fetch("http://localhost:5678/api/categories");
const categories = await response2.json();

// Recuperer les projets

function displayWorks(works) {
  for (const work of works) {
    const galleryWorks = document.querySelector(".gallery");
    const project = document.createElement("project");
    const imgproject = document.createElement("img");
    imgproject.src = work.imageUrl;
    const caption = document.createElement("projectcaption");
    caption.innerText = work.title;
    galleryWorks.appendChild(project);
    project.appendChild(imgproject);
    project.appendChild(caption);
  }
}
displayWorks(works);

// le filtre Tous
const buttonfilterAll = document.createElement("button");
buttonfilterAll.innerText = "Tous";
const filters = document.querySelector(".filters");
filters.appendChild(buttonfilterAll);
buttonfilterAll.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  displayWorks(works);
});
// creation et activation des filtres

function filterProjects(categories) {
  for (const category of categories) {
    const buttonfilter = document.createElement("button");
    buttonfilter.innerText = category.name;
    const filters = document.querySelector(".filters");
    filters.appendChild(buttonfilter);
    buttonfilter.addEventListener("click", function () {
      const filteredProjects = works.filter(function (work) {
        return work.categoryId === category.id;
      });
      document.querySelector(".gallery").innerHTML = "";
      displayWorks(filteredProjects);
    });
  }
}
filterProjects(categories);

// Passer au mode edition

if (localStorage.getItem("token")) {
  // modifier le text du lien login en logout
  const login = document.querySelector("#logIn");
  login.innerText = "logout";
  console.log("Vous êtes connecté !");
  LogInMode();
  // fonction pour Supprimer le token et revenir vers la page de connexion
  login.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}

function LogInMode() {
  // supprimer la partie filtres
  document.querySelector(".filters").style.display = "none";
  // Ajout de la barre d edition
  const body = document.querySelector("body");
  body.style.paddingTop = "40px";
  const headerEdit = document.createElement("div");
  body.appendChild(headerEdit);
  headerEdit.classList.add("header-edit");
  const EditMode = document.createElement("div");
  EditMode.classList.add("edit");
  EditMode.innerHTML = ` <i class="fa-regular fa-pen-to-square"></i> <p>Mode édition</p> `;
  headerEdit.appendChild(EditMode);

  // Ajout du lien Modification
  const TitlePortfolio = document.querySelector(".TitlePortfolio");
  const TitleEdit = document.createElement("a");
  TitleEdit.classList.add("editLink");
  TitleEdit.href = "#";
  TitleEdit.innerHTML = ` <i class="fa-regular fa-pen-to-square"></i> <p> modifier <p> `;
  TitlePortfolio.appendChild(TitleEdit);
}
