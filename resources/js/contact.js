/* Crea tu propia lógica para hacer un fetch que emule una post request a un servidor y enseñe un mensaje en consola cuando la llamada se resuelva */
/*  ADVANCED: utiliza DOM manipulation para enseñarle al user que su mensaje se ha enviado correctamente o no */

// 1era ITERACION  Primero se crean todas las variables con los sselectores correctos ya identificados en el html
const url = "https://jsonplaceholder.typicode.com/posts";
const myForm = document.querySelector("#form-msg");
const nameInput = document.querySelector("#formName");
const emailInput = document.querySelector("#email-us");
const phoneNumber = document.querySelector("#phone");
const randomMessage = document.querySelector("#msg");

const errorPage = () => {
  const error = document.querySelector(".container");
  error.innerHTML = `
    <h1>Error 404 - Pagina no encontrada</h1>`;
};
let sendData = async (event) => {
  event.preventDefault();

  // 2da ITERACION  Se coloca un IF para verificar que todos los campos esten rellenos correctamente, caso contrario avisa a user que tiene que verificar y rellenar todo correctamente
  if (!nameInput.value || !emailInput.value || !phoneNumber.value) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  console.log("Enviando datos al servidor...");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        phoneNumber: phoneNumber.value,
        randomMessage: randomMessage.value,
      }),
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // 3era ITERACION  Se utiliza setTimeout para agregar un delay de 2 seg para emular la llamada a un servidor.
    
    if (response.ok) {
      const data = await response.json();
      console.log("Datos recibidos:", data);
      const successMessage = document.getElementById("success-message");
      successMessage.textContent = "La solicitud se ha enviado correctamente.";
      successMessage.style.display = "block";
      nameInput.value = "";
      emailInput.value = "";
      phoneNumber.value = "";
      randomMessage.value = "";
      
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    } else {
      const aleatorio = Math.random();
      if (aleatorio < 0.5) {
        console.log("No se pudo enviar la solicitud. Error 404 - Página no encontrada");
        throw new Error("Error 404 - Página no encontrada");
      } else {
        console.log("No se pudo enviar la solicitud debido a un error inesperado.");
        throw new Error("Error inesperado en la solicitud");
      }
    }
  } catch (error) {
    if (error.message === "Error 404 - Página no encontrada") {
      console.error("Error 404 - Página no encontrada:", error);
      alert("No se pudo enviar la solicitud. Error 404 - Página no encontrada");
      errorPage();
    } else {
      console.error("Error inesperado en la solicitud:", error);
    }
  }
};

myForm.addEventListener("submit", sendData);


