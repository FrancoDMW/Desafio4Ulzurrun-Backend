const socket = io()
socket.emit('message','Comenzamos a usar websocket')

socket.addEventListener('message', function(event) {
    const productList = document.getElementById('productList');
    const products = JSON.parse(event.data);
    // Actualizar la lista de productos
    productList.innerHTML = '';
    products.forEach(function(product) {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.title} - Precio: ${product.price} - ID: ${product.id}`;
      productList.appendChild(listItem);
    });
  });
