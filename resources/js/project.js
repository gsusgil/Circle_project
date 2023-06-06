/* Crea tu propia lógica para hacer fetch de un post y enseñar su información utilizando DOM manipulation */
/* ADVANCED: consigue que la info del post funcione dinámicamente y enseñe un post u otro según la URL */


// Variable para ubicar los elementos en el DOM
const principalProject = document.getElementById("current-project");
const projectsContainer = document.getElementById("cards-container");

// Variables para buscar las 'id' de la URL 
const urlParams = new URLSearchParams(window.location.search);
const selectedProjectId = urlParams.get("id");

// Variable para guardar el URL de la API / metodo fetch utilizado para realizar la peticion de la data a la API
let url =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const reverseData = data.reverse();
     // Metodo reverse para invertir la secuencia como se muestran los ibjetos / ademas se aplica el metodo MAP para generar un nuevo array de objetos con la secuencia correcta.
    const cardsInfo = reverseData.map((item) => { 
      return {
        id: item.uuid,
        name: item.name,
        description: item.description,
        content: item.content,
        image: item.image,
        complete_on: item.complete_on,
      };
    });
    
    createCurrentProject(cardsInfo);
    createCards(cardsInfo);
  })
  .catch((error) => console.error(error));

const createCurrentProject = (cardsInfo) => {
  if (selectedProjectId) {
    const selectedProject = cardsInfo.find(
      (project) => project.id === selectedProjectId
    );

    //Se utiliza el innerHtml para insertar los datos de los objetos dentro de HTML de forma dinamica.
    principalProject.innerHTML = `
      <h2>${selectedProject.name}</h2>
      <h3>${selectedProject.description}</h3>
      <img src="${selectedProject.image}" alt="${selectedProject.name}">
      <p>${selectedProject.content}</p>
    `;
  }
};

const createCards = (cardsInfo) => {
  // Se utiliza el metodo FILTER para clasificar los objetos segun la premisia colocada anteriormente de 2 sections (una principal y otra de cadrs) hace un nuevo array .
  const filteredProjects = cardsInfo.filter(
    (project) => project.id !== selectedProjectId
  );

  // Se recorre array con un metodo ForEach para para generar cada card (div) y su contenido 
  filteredProjects.forEach((project) => {

    const divElement = document.createElement("div");
    divElement.classList.add("cards");

    const imageElement = document.createElement("img");
    imageElement.src = project.image;

    divElement.appendChild(imageElement);
    const headingElement = document.createElement("h3");
    headingElement.textContent = project.name;

    divElement.appendChild(headingElement);
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = maxText(project.content, 100);
    divElement.appendChild(paragraphElement);
    const linkElement = document.createElement("a");
    linkElement.href = `project.html?id=${project.id}`;
    linkElement.target = "_self";
    linkElement.textContent = "Learn More";
    divElement.appendChild(linkElement);
    
    //Por ultimo utilizamos el appenChild para insertar cada card en el container
    projectsContainer.appendChild(divElement);
  });
};

// Función para minimizar el texto a un número específico de caracteres
const maxText = (text, limit) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + "...";
  }
};