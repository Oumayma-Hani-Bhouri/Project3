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
function displayModalDeleting() {
  const ModalWrapper = document.querySelector(".modalwrapper");
  const CloseBtnModal = document.createElement("i");
  CloseBtnModal.classList.add("fa-solid", "fa-xmark", "fa-xl", "btnclose1");
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
  displayImgModal(works);
  btnAddImg.addEventListener("click", displayModalAdd);
}

//fonction pour afficher les images dans la modale
function displayImgModal(works) {
  for (const work of works) {
    const GalleryModal = document.querySelector(".GalleryModal");
    const project = document.createElement("project");
    project.classList.add("project");
    const imgproject = document.createElement("img");
    imgproject.classList.add("imgwork");
    const iconTrash = document.createElement("i");
    iconTrash.classList.add("fa-regular", "fa-trash-can", "fa-sm");
    imgproject.src = work.imageUrl;
    GalleryModal.appendChild(project);
    project.appendChild(imgproject);
    project.appendChild(iconTrash);
  }
}
displayModalDeleting();

// fonctions pour ouvrir et fermer la modale

const modal = document.querySelector(".modal");
let modal1 = null;
const OpenModal = function (e) {
  e.preventDefault();
  e.stopPropagation();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal1 = modal;
  modal1.addEventListener("click", closeModal);
  modal1.querySelector(".btnclose1").addEventListener("click", closeModal);

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
  modal1.querySelector(".btnclose1").removeEventListener("click", closeModal);

  modal1
    .querySelector(".modalwrapper")
    .removeEventListener("click", stopPropagation);

  modal1 = null;
};
const stopPropagation = function (e) {
  e.stopPropagation();
};

const TitleEdit = document.querySelector(".TitleEdit");
TitleEdit.addEventListener("click", OpenModal);

// fonction pour afficher la modal d ajout

function displayModalAdd() {
  const ModalWrapper = document.querySelector(".modalwrapper");
  ModalWrapper.innerHTML = "";
  const iconsModal = document.createElement("div");
  iconsModal.classList.add("iconsModal");
  const btnBackToGallery = document.createElement("i");
  btnBackToGallery.classList.add("fa-solid", "fa-arrow-left", "fa-xl");
  const CloseBtnModal = document.createElement("i");
  CloseBtnModal.classList.add("fa-solid", "fa-xmark", "fa-xl", "btnclose2");
  iconsModal.appendChild(btnBackToGallery);
  iconsModal.appendChild(CloseBtnModal);
  const ModalAddTitle = document.createElement("h3");
  ModalAddTitle.classList.add("titleModaladd");
  ModalAddTitle.innerText = "Ajout photo";
  const AddImg = document.createElement("div");
  AddImg.classList.add("AddImg");
  AddImg.innerHTML = `<div>
  <i class="fa-regular fa-image fa-5x" style="color: #b9c5cc;"></i>
  <button class="add-photo-button">+ Ajouter photo</button>
  <p>jpg, png : 4mo max</p> </div>
  `;
  const InputModal = document.createElement("div");
  InputModal.classList.add("InputModalAdd");
  InputModal.innerHTML = ` <div>
  <label for="title">Titre</label>
  <input type="text" name="title" id="title" autocomplete="off" required>
  <label for="category">Catégorie</label>
	<select name="category" id="category" ></select>
  `;
  const LineModal = document.createElement("hr");
  LineModal.classList.add("lineModalAdd");
  const btnValid = document.createElement("button");
  btnValid.classList.add("BtnValid");
  btnValid.innerText = "Valider";
  //  retour à la vue "Galerie Photo"

  btnBackToGallery.addEventListener("click", function () {
    ModalWrapper.innerHTML = ""; // Efface le contenu actuel de la modale
    displayModalDeleting();
    // Reaffiche la vue "Galerie Photo"
    modal.querySelector(".btnclose1").addEventListener("click", closeModal);
  });
  CloseBtnModal.addEventListener("click", function () {
    ModalWrapper.innerHTML = ""; // Efface le contenu actuel de la modale
    displayModalDeleting();
    closeModalAdd();
  });
  ModalWrapper.appendChild(iconsModal);
  ModalWrapper.appendChild(ModalAddTitle);
  ModalWrapper.appendChild(AddImg);
  ModalWrapper.appendChild(InputModal);
  ModalWrapper.appendChild(LineModal);
  ModalWrapper.appendChild(btnValid);
}
function closeModalAdd() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
}
