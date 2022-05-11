function addToCart(id) {
	// INSERT CODE HERE --> PRIPREMA
	if (localStorage.getItem(id) == null) {
		localStorage.setItem(id, 1);
	} else {
		localStorage.setItem(id, parseInt(localStorage.getItem(id)) + 1);
	}
	// END INSERT --> PRIPREMA
	refreshCartItems();
}

let getData = async function () {
	let response = await fetch("data/lab2.json");
	let data = await response.json();
	addCategories(data);
}

let like = async function (id) {

	let response = await fetch("data/lab2.json"); //dohvati json
	let data = await response.json(); 
	let index = id - 1;
	let name = data.products[index].name;
	let key = localStorage.getItem(name);
	if(key == null || key == 'inactive'){
		localStorage.setItem(name, 'active');
		document.getElementById(id).classList.add('like-btn-enabled');
		return;
	}

	localStorage.setItem(name, 'inactive');
	document.getElementById(id).classList.remove('like-btn-enabled');
}

let addCategories = async function (data) {
	let categories = data.categories;
	let main = document.querySelector('main');
	let categoryTemplate = document.querySelector('#category-template');

	for (let index = 0; index < categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = categories[index].name;
		
		let products = data.products.filter(p => p.categoryId ==  categories[index].id);
		// INSERT CODE HERE --> PRIPREMA
		let gallery = category.querySelector('.gallery');
		let productsTemplate = document.querySelector('#product-template');
		
		for (let ind = 0; ind < products.length; ind++) {
			let product = productsTemplate.content.cloneNode(true);

			let photoBox = product.querySelector('.photo-box');
			photoBox.setAttribute("data-id", products[ind].id);

			let productTitleElement = product.querySelector('.photo-box-title');
			productTitleElement.textContent = products[ind].name;

			let productImageElement = product.querySelector('.photo-box-image');
			productImageElement.src = products[ind].imageUrl;

			let newId = products[ind].id;
			let productClickElement = product.querySelector('.cart-btn');
			productClickElement.onclick = (event)=> addToCart(newId);

			let likebtn = product.querySelector(".like-btn");
			likebtn.setAttribute("id", products[ind].id);
			likebtn.onclick = (e) => like(products[ind].id);

			gallery.appendChild(product);

		}
		// END INSERT --> PRIPREMA
		main.appendChild(category);
	}
};
getData();