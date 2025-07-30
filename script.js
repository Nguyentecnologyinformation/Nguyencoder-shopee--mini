const products = [
  { id: 1, name: "Tai nghe Bluetooth", price: 150000, image: "https://via.placeholder.com/200x150?text=Tai+Nghe" },
  { id: 2, name: "Chuột Gaming", price: 200000, image: "https://via.placeholder.com/200x150?text=Chuột" },
  { id: 3, name: "Bàn phím cơ", price: 450000, image: "https://via.placeholder.com/200x150?text=Bàn+phím" },
];

const cart = [];

function renderProducts() {
  const productList = document.getElementById('product-list');
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price.toLocaleString()}₫</p>
      <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${item.name} - ${item.price.toLocaleString()}₫`;
    cartItems.appendChild(li);
  });
}

renderProducts();
