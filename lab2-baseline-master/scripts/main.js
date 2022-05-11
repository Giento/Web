function refreshCartItems(){
	let cartItemsElement = document.querySelector('#cart-items');
	let count = 0;
	for (let index = 0; index < localStorage.length; index++) {
		let test = parseInt(localStorage.key(index));
		if (!isNaN(test)) {
			count += parseInt(localStorage.getItem(test));
		}
	}
   cartItemsElement.textContent = count;
}

refreshCartItems();