let users = []; // lưu tạm tài khoản
let currentUser = null;

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("auth-message");

  if (!username || !password) {
    message.textContent = "Vui lòng nhập đầy đủ!";
    return;
  }

  if (users.find(u => u.username === username)) {
    message.textContent = "Tài khoản đã tồn tại!";
    return;
  }

  users.push({ username, password });
  message.textContent = "Đăng ký thành công!";
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("auth-message");

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    document.getElementById("auth").style.display = "none";
    document.getElementById("welcome-user").textContent = `Chào, ${currentUser.username}`;
  } else {
    message.textContent = "Sai thông tin đăng nhập!";
  }
}

function logout() {
  currentUser = null;
  document.getElementById("auth").style.display = "block";
  document.getElementById("welcome-user").textContent = "";
  cart.length = 0;
  renderCart();
}

function checkout() {
  if (!currentUser) {
    alert("Bạn cần đăng nhập trước khi mua hàng.");
    return;
  }

  if (cart.length === 0) {
    alert("Giỏ hàng trống.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`Cảm ơn ${currentUser.username} đã mua hàng! Tổng đơn: ${total.toLocaleString()}₫`);
  cart.length = 0;
  renderCart();
}
const products = [
  { id: 1, name: "Tai nghe Bluetooth", price: 150000, image: "https://via.placeholder.com/200x150?text=Tai+Nghe" },
  { id: 2, name: "Chuột Gaming", price: 200000, image: "https://via.placeholder.com/200x150?text=Chuột" },
  { id: 3, name: "Bàn phím cơ", price: 450000, image: "https://via.placeholder.com/200x150?text=B%C3%A0n+Ph%C3%ADm" },
  { id: 4, name: "Màn hình 24 inch", price: 2400000, image: "https://via.placeholder.com/200x150?text=M%C3%A0n+H%C3%ACnh" },
  { id: 5, name: "Ổ cứng SSD 512GB", price: 1100000, image: "https://via.placeholder.com/200x150?text=SSD+512GB" },
  { id: 6, name: "RAM 16GB DDR4", price: 1350000, image: "https://via.placeholder.com/200x150?text=RAM+16GB" },
  { id: 7, name: "Laptop Văn phòng", price: 8500000, image: "https://via.placeholder.com/200x150?text=Laptop" },
  { id: 8, name: "Webcam Full HD", price: 390000, image: "https://via.placeholder.com/200x150?text=Webcam" },
  { id: 9, name: "Loa Bluetooth Mini", price: 180000, image: "https://via.placeholder.com/200x150?text=Loa+Bluetooth" },
  { id: 10, name: "Micro thu âm", price: 320000, image: "https://via.placeholder.com/200x150?text=Micro" },
  { id: 11, name: "Bộ phát WiFi TP-Link", price: 420000, image: "https://via.placeholder.com/200x150?text=WiFi+Router" },
  { id: 12, name: "Bàn nâng laptop", price: 260000, image: "https://via.placeholder.com/200x150?text=B%C3%A0n+Laptop" }
];
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
function renderProducts(filter = "") {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // clear cũ

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.forEach(product => {
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

function searchProducts() {
  const keyword = document.getElementById('search-input').value;
  renderProducts(keyword);
