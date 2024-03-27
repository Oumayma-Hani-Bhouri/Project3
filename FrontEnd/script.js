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

if (window.sessionStorage.getItem("token")) {
  // modifier le text du lien login en logout
  const login = document.querySelector("#logIn");
  login.innerText = "logout";
  console.log("Vous êtes connecté !");
  LogInMode();
  // fonction pour Supprimer le token et revenir vers la page de connexion
  login.addEventListener("click", function () {
    window.sessionStorage.removeItem("token");
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
  TitleEdit.classList.add("TitleEdit");
  TitleEdit.href = "#";
  TitleEdit.innerHTML = ` <i class="fa-regular fa-pen-to-square"></i> <p> modifier <p> `;
  TitlePortfolio.appendChild(TitleEdit);
}

// Affichage de la modale
const TitleEdit = document.querySelector(".TitleEdit");
const modal = document.querySelector(".modal");
const ModalWrapper = document.querySelector(".modalwrapper");
const CloseBtnModal = document.createElement("i");
CloseBtnModal.classList.add("fa-solid", "fa-xmark", "fa-lg");
const titleModal = document.createElement("h3");
titleModal.innerText = "Galerie Photo";
const divGallery = document.createElement("div");
divGallery.classList.add("GalleryModal");
const LineModal = document.createElement("hr");
const btnAddImg = document.createElement("button");
btnAddImg.classList.add("BtnAddImg");
btnAddImg.innerText = "Ajouter une photo";
ModalWrapper.appendChild(CloseBtnModal);
ModalWrapper.appendChild(titleModal);
ModalWrapper.appendChild(divGallery);
ModalWrapper.appendChild(LineModal);
ModalWrapper.appendChild(btnAddImg);

afficherimages(works);
//fonction pour afficher les images dans la modale
function afficherimages(works) {
  for (const work of works) {
    const GalleryModal = document.querySelector(".GalleryModal");
    const project = document.createElement("project");
    const imgproject = document.createElement("img");
    imgproject.classList.add("imgwork");
    imgproject.src = work.imageUrl;
    GalleryModal.appendChild(project);
    project.appendChild(imgproject);
  }
}

// fonctions pour ouvrir et fermer la modale

let modal1 = null;
const OpenModal = function (e) {
  e.preventDefault();
  e.stopPropagation();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal1 = modal;
  modal1.addEventListener("click", closeModal);
  modal1.querySelector(".fa-xmark").addEventListener("click", closeModal);
  modal1
    .querySelector(".modalwrapper")
    .addEventListener("click", stopPropagation);
};
const closeModal = function (e) {
  if (modal1 === null) return;
  e.preventDefault();
  e.stopPropagation();
  modal1.style.display = "none";
  modal1.setAttribute("aria-hidden", "true");
  modal1.removeEventListener("click", closeModal);
  modal1.querySelector(".fa-xmark").removeEventListener("click", closeModal);
  modal1
    .querySelector(".modalwrapper")
    .removeEventListener("click", stopPropagation);
  modal1 = null;
};
const stopPropagation = function (e) {
  e.stopPropagation();
};
TitleEdit.addEventListener("click", OpenModal);
