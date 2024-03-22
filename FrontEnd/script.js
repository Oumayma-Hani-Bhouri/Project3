// Appel a l API pour recuperer les projets

const response= await fetch ('http://localhost:5678/api/works');
const works= await response.json();

// Appel a l API pour recuperer les filtres
const response2=await fetch ('http://localhost:5678/api/categories');
const categories=await response2.json();

// Recuperer les projets 

function displayWorks (works) {
    
for( const work of works ) {
const galleryWorks=document.querySelector(".gallery");
const project=document.createElement("project");
const imgproject=document.createElement("img");
imgproject.src=work.imageUrl;
const caption=document.createElement("projectcaption");
caption.innerText=work.title;
galleryWorks.appendChild(project);
project.appendChild(imgproject);
project.appendChild(caption);
}}
displayWorks (works);

// le filtre Tous
const buttonfilterAll=document.createElement('button');
buttonfilterAll.innerText="Tous";
const filters=document.querySelector(".filters");
filters.appendChild(buttonfilterAll);
buttonfilterAll.addEventListener("click",function() {
document.querySelector(".gallery").innerHTML = "";
displayWorks(works);
})
// creation et activation des filtres

function filterProjects (categories) {

for (const category of categories){

    const buttonfilter=document.createElement('button');
    buttonfilter.innerText=category.name;
    const filters=document.querySelector(".filters");
   filters.appendChild(buttonfilter);
    buttonfilter.addEventListener("click", function(){
    const filteredProjects =works.filter(function(work) {
        return work.categoryId===category.id;
    });
    document.querySelector(".gallery").innerHTML= "";
    displayWorks (filteredProjects)
    })
    }}

   filterProjects (categories);