const products = [
  { id: 1, name: "Chuột Logitech", price: 150000, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Bàn phím cơ", price: 500000, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Tai nghe Bluetooth", price: 350000, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Màn hình 24in", price: 2200000, image: "https://via.placeholder.com/150" }
];

const cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price.toLocaleString()}₫</p>
      <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString()}₫`;
    cartItems.appendChild(li);
    total += item.price;
  });
  totalElement.textContent = `Tổng: ${total.toLocaleString()}₫`;
}

renderProducts();
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

  // Lưu đơn hàng vào danh sách đơn
  const order = {
    user: currentUser.username,
    items: [...cart],
    total,
    date: new Date().toLocaleString()
  };
  orders.push(order);
  renderOrders();

  // Xóa giỏ hàng
  cart.length = 0;
  renderCart();
}
function renderOrders() {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = "";

  if (orders.length === 0) {
    orderList.innerHTML = "<li>Chưa có đơn hàng nào.</li>";
    return;
  }

  orders.forEach((order, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Đơn ${index + 1}:</strong> (${order.date})<br>
      ${order.items.map(i => `- ${i.name} (${i.price.toLocaleString()}₫)`).join("<br>")}
      <br><strong>Tổng: ${order.total.toLocaleString()}₫</strong><hr>
    `;
    orderList.appendChild(li);
  });
}
renderOrders();
let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders)); // lưu vào localStorage
  renderOrders();
function renderOrders() {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = "";

  if (!currentUser) {
    orderList.innerHTML = "<li>Vui lòng đăng nhập để xem đơn hàng.</li>";
    return;
  }

  const userOrders = orders.filter(order => order.user === currentUser.username);

  if (userOrders.length === 0) {
    orderList.innerHTML = "<li>Chưa có đơn hàng nào.</li>";
    return;
  }

  userOrders.forEach((order, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Đơn ${index + 1}:</strong> (${order.date})<br>
      ${order.items.map(i => `- ${i.name} (${i.price.toLocaleString()}₫)`).join("<br>")}
      <br><strong>Tổng: ${order.total.toLocaleString()}₫</strong><hr>
    `;
    orderList.appendChild(li);
  });
}
renderOrders();
localStorage.removeItem("orders");
