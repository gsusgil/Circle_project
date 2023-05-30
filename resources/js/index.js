/* Crea tu propia lógica para hacer fetch de 3 posts distintos y enseñarlos en la homepage con DOM manipulation */

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

    console.table(cardsInfo);
    cards(cardsInfo);
  })
  .catch((error) => console.error(error));

let cards = (cardsInfo) => {
  console.log(cardsInfo);
  let cardsProjects = "";
  for (let i = 0; i < Math.min(cardsInfo.length, 3); i++) {
    const link = linkForIndex(i);
    cardsProjects += `
    <img src="${cardsInfo[i].image}" />
    <h3>${cardsInfo[i].description}</h3>
    <p>${cardsInfo[i].content}</p>
    <a href="${link}" target="_blank">Learn More</a>`;
  }
  document.getElementById("cardContainerProjects").innerHTML = cardsProjects;
};

let cardsProjects = (finalCards) => {
  finalCards.forEach((element, i) => {
    element.link = linkForIndex(i);
    let linkElement = document.createElement("a");
    linkElement.href = element.link;
    linkElement.textContent = element.learn;
    const linkContainer = document.getElementById("cardContainerProjects");
    linkContainer.appendChild(linkElement);
  });
};
let linkForIndex = (i) => {
  let route = ["./project.html"] ;
  return route[i];
};

let finalLinks = [{ learn: "objectOne" }];
cardsProjects(finalLinks);
