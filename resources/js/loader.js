
window.onload = function() {
    let container = document.getElementById('load-container');
  
    // Mostrar el loader
    container.style.visibility = 'visible';
    container.style.opacity = '1';
  
    setTimeout(function() {
      
      container.style.visibility = 'hidden';
      container.style.opacity = '0';
  

    }, 800);
  };