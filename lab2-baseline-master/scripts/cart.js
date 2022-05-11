let refreshCart = async function() {
   let main = document.querySelector('main');
   let headerTemplate = document.querySelector('#cart-template-header');
   let headerClone = headerTemplate.content.cloneNode(true);
   main.appendChild(headerClone);

   let itemTemplate = document.querySelector('#cart-template-item');

   let response = await fetch("data/lab2.json");
    let data = await response.json();
   let products = data.products;

   for (let i = 0; i < localStorage.length; i++) {
      let test = parseInt(localStorage.key(i));
      if (isNaN(test)) continue;
      
      let itemClone = itemTemplate.content.cloneNode(true);

      let itemTitle = itemClone.querySelector('.cart-item  div');
      itemTitle.textContent = products[parseInt(localStorage.key(i)) - 1].name;

      let itemPrice = itemClone.querySelector('.cart-item-price');
      itemPrice.textContent = products[parseInt(localStorage.key(i)) - 1].price + ' kn';

      let input = itemClone.querySelector('input');
      input.value = localStorage.getItem(localStorage.key(i));

      main.appendChild(itemClone);
   }

}
refreshCart();