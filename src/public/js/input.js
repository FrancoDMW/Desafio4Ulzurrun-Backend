document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  var inputValue = document.getElementById('myInput').value; // Obtiene el valor del campo de entrada
  // Asigna el valor del campo de entrada a la propiedad 'action' del formulario
  document.getElementById('myForm').action = '/' + inputValue + '?_method=DELETE';
  // Envía el formulario
  this.submit();
});