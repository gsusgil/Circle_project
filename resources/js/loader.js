// window.onload = function() {
//     let container = document.getElementById('load-container')

//     container.style.visibility = 'hidden',
//     container.style.opacity = '0'

// }

window.onload = function() {
    let container = document.getElementById('load-container');
  
    // Mostrar el loader
    container.style.visibility = 'visible';
    container.style.opacity = '1';
  
    // Simular un tiempo de carga de 2 segundos antes de ocultar el loader
    setTimeout(function() {
      // Ocultar el loader
      container.style.visibility = 'hidden';
      container.style.opacity = '0';
  
      // Aquí puedes agregar cualquier otra lógica o acciones que desees realizar después de que se haya cargado la página
    }, 800);
  };