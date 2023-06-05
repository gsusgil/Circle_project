/* Crea tu propia lógica para hacer fetch de un post y enseñar su información utilizando DOM manipulation */
/* ADVANCED: consigue que la info del post funcione dinámicamente y enseñe un post u otro según la URL */
let url =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const reverseData = data.reverse();
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
    // Llamada a la función para generar los elementos div
    createCards(cardsInfo);
  })
  .catch((error) => console.error(error));
const createCards = (cardsInfo) => {
  // Obtén el contenedor padre
  const parentContainer = document.getElementById("cards-container");
  // Crea los tres elementos div
  for (let i = 0; i < Math.min(cardsInfo.length, 3); i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("cards");
    // Crea el contenido interno de cada div
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
    linkElement.href = "#";
    linkElement.target = "_blank";
    linkElement.textContent = "Learn More";
    linkElement.dataset.id = cardsInfo[i].id;
    divElement.appendChild(linkElement);
    // Agrega cada div al contenedor padre
    parentContainer.appendChild(divElement);
    linkElement.addEventListener("click", (event) => {
      event.preventDefault();

      const uuid = event.target.dataset.uuid;

      // Redirigir a la página del objeto deseado utilizando su UUID
      window.location.href = `project.html?id=${id}`;
    });
  }
};
// Función para minimizar el texto a un número específico de caracteres
const maxText = (text, limit) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + "...";
  }
};
let linkForIndex = (i) => {
  let route = ["./project.html"];
  return route[i];
};
