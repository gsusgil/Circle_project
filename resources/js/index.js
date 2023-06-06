/* Crea tu propia lógica para hacer fetch de 3 posts distintos y enseñarlos en la homepage con DOM manipulation */


// Variable para guardar el URL de la API / metodo fetch utilizado para realizar la peticion de la data a la API


let url = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";
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
    
    createCards(cardsInfo);
  })
  .catch((error) => console.error(error));

const createCards = (cardsInfo) => {
  // Se crea el contenedor padre de las cards
  const parentContainer = document.getElementById("cards-container");
  // Se recorre array con un metodo ForEach para para generar cada card (div) y su contenido 
  for (let i = 0; i < Math.min(cardsInfo.length, 3); i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("cards");
    
    const imageElement = document.createElement("img");
    imageElement.src = cardsInfo[i].image;
    divElement.appendChild(imageElement);
    const headingElement = document.createElement("h3");
    headingElement.textContent = cardsInfo[i].description;
    divElement.appendChild(headingElement);
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = maxText(cardsInfo[i].content, 100);
    divElement.appendChild(paragraphElement);
    const linkElement = document.createElement("a");
    linkElement.href = `project.html?id=${cardsInfo[i].id}`;
    linkElement.target = "_self";
    linkElement.textContent = "Learn More";
    divElement.appendChild(linkElement);
    //Por ultimo utilizamos el appenChild para insertar cada card
    parentContainer.appendChild(divElement);
  }
};

// Función para minimizar el texto a un número específico de caracteres en el container
const maxText = (text, limit) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + "...";
  }
};

