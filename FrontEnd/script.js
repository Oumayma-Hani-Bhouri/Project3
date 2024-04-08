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
    project.setAttribute("id", "project-" + work.id);
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
  //  l evenement pour ouvrir la modale d ajout de photo
  btnAddImg.addEventListener("click", displayModalAdd);
}

//fonction pour afficher les images dans la modale
function displayImgModal(works) {
  for (const work of works) {
    const GalleryModal = document.querySelector(".GalleryModal");
    const project = document.createElement("project");
    project.classList.add("project");
    project.setAttribute("id", work.id);
    const imgproject = document.createElement("img");
    imgproject.classList.add("imgwork");
    const iconTrash = document.createElement("i");
    iconTrash.classList.add("fa-regular", "fa-trash-can", "fa-sm");
    imgproject.src = work.imageUrl;
    GalleryModal.appendChild(project);
    project.appendChild(imgproject);
    project.appendChild(iconTrash);
    // evenement pour supprimer un projet
    iconTrash.addEventListener("click", () => {
      deleteWorks(work.id);
    });
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
// evenement pour ouvrir la modale
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
  const AddImg = document.createElement("form");
  AddImg.classList.add("AddImg");
  AddImg.innerHTML = `
  <form method="post"  action="/upload" id=form-add >
  <div class=addphoto>
  <img src="" alt="image upload" class="img-preview">
  <i class="fa-regular fa-image fa-5x" style="color: #b9c5cc;"></i>
  <div>
  <label for="photo" class="photo-label">+ Ajouter photo </label>
  <input type="file" id="photo" name="photo"  />
  </div>
  <p class=imgtype >jpg, png : 4mo max</p> 
</div>
 <div class="titlendcategory">
  <label for="title">Titre</label>
  <input type="text" name="title" id="title" autocomplete="off" required>
  <label for="selectcategory">Catégorie</label>
	<select name="selectcategory" id="selectcategory" required >  <option value=""selected></option> </select>
  <hr class="lineModalAdd" /> 
      <input type="submit" value="Valider" class="BtnValid" />
    </div>
  </form>
`;
  // evenement pour le retour à la "Galerie Photo"

  btnBackToGallery.addEventListener("click", function () {
    ModalWrapper.innerHTML = ""; // Efface le contenu actuel de la modale
    displayModalDeleting();
  });
  // Retour a la  "Galerie Photo" si on ferme la modale

  CloseBtnModal.addEventListener("click", function () {
    ModalWrapper.innerHTML = "";
    displayModalDeleting();
    closeModalAdd();
  });
  ModalWrapper.appendChild(iconsModal);
  ModalWrapper.appendChild(ModalAddTitle);
  ModalWrapper.appendChild(AddImg);

  // Ajout des categories dans la modale d'ajout
  categories.forEach((category) => {
    const selectCategory = document.getElementById("selectcategory");
    selectCategory.required = true;
    const option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    selectCategory.appendChild(option);
  });

  const inputPhoto = document.getElementById("photo");
  inputPhoto.addEventListener("change", function () {
    validateAndDisplayImage(inputPhoto);
  });
}
// fonction pour fermer la modale d ajout
function closeModalAdd() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.querySelector(".btnclose1").addEventListener("click", closeModal);
}

// fonction pour supprimer des projets
async function deleteWorks(Id) {
  let token = window.sessionStorage.getItem("token");
  console.log(Id);
  try {
    const deletefetch = await fetch(`http://localhost:5678/api/works/${Id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (deletefetch.ok) {
      console.log(deletefetch);
      const projectToRemove = document.getElementById(Id);
      projectToRemove.remove();
      const projectToRemove2 = document.getElementById("project-" + Id);
      projectToRemove2.remove();
    } else {
      console.error(
        "Une erreur s'est produite lors de la suppression de l'image."
      );
    }
  } catch (error) {
    console.log("une erreur est survenue", error);
  }
}

// fonction pour afficher l image dans la modale
function validateAndDisplayImage(fileInput) {
  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSize = 4 * 1024 * 1024; // 4 Mo

  const file = fileInput.files[0];

  // Vérifie si un fichier est sélectionné
  if (!file) {
    alert("Veuillez sélectionner une image.");
    return;
  }

  // Vérifie le type de fichier
  if (!allowedTypes.includes(file.type)) {
    alert("Veuillez sélectionner une image de type JPEG ou PNG.");
    return;
  }

  // Vérifie la taille du fichier
  if (file.size > maxSize) {
    alert("La taille de l'image dépasse la limite de 4 Mo.");
    return;
  }

  // Affiche l aperçu de l image dans l input
  const reader = new FileReader();
  reader.onload = function (event) {
    const imgPreview = document.querySelector(".img-preview");
    const iconImage = document.querySelector(".fa-image");
    const labelInputAdd = document.querySelector(".photo-label");
    const imgtype = document.querySelector(".imgtype");
    iconImage.style.display = "none";
    labelInputAdd.style.display = "none";
    imgtype.style.display = "none";
    imgPreview.src = event.target.result;
    imgPreview.style.display = "flex"; // Affiche l aperçu de limage
  };
  reader.readAsDataURL(file);
}
// fonction pour poster l image
function postNewWork() {
  const FormBtnValid = document.querySelector(".BtnValid");
  const addphoto = document.getElementById("photo");
  const title = document.getElementById("title");
  const selectCategory = document.getElementById("selectcategory");
  FormBtnValid.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("validation");
    // Récupérez les données du formulaire
    const formData = new FormData();
    formData.append("image", addphoto.files[0]);
    formData.append("title", title.value);
    formData.append("category", selectCategory.value);
    // Effectuez une requête fetch POST vers votre endpoint back-end
    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Le projet a été ajouté avec succès.");
        // const newProject = await response.json();
        // displayNewProject(newProject);
      } else {
        console.error("Erreur lors de l'ajout du projet.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite", error);
    }
  });
}
async function displayNewProject(newProject) {
  const gallery = document.querySelector(".gallery");
  const Project = document.createElement("project");
  const imgProject = document.createElement("img");
  const caption = document.createElement("caption");

  Project.classList.add(`Project-${newProject.id}`);
  imgProject.src = newProject.imageUrl;
  caption.innerText = newProject.title;
  gallery.appendChild(Project);
  Project.appendChild(imgProject);
  Project.appendChild(caption);
}
