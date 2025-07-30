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
}
//lưu đơn hàng
const orders = []; // lưu đơn hàng đã mua
//cập nhật hàng checkout
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
//them hàm renderorders
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
//Gọi renderOrders() khi người dùng đăng nhập lại:
renderOrders();
//1. Load đơn hàng từ localStorage khi mở trang
//Thêm đầu file:
let orders = JSON.parse(localStorage.getItem("orders")) || [];
//2. Lưu đơn hàng vào localStorage mỗi khi checkout
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders)); // lưu vào localStorage
  renderOrders();
// 3. Lọc đơn hàng theo tài khoản đang đăng nhập
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
function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  // Gom nhóm các sản phẩm và đếm số lượng
  const cartMap = {};
  cart.forEach(item => {
    if (cartMap[item.id]) {
      cartMap[item.id].quantity += 1;
    } else {
      cartMap[item.id] = { ...item, quantity: 1 };
    }
  });

  let total = 0;

  // Hiển thị từng sản phẩm với số lượng
  for (const id in cartMap) {
    const item = cartMap[id];
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - ${item.price * item.quantity}₫`;
    cartItemsElement.appendChild(li);
    total += item.price * item.quantity;
  }

  document.getElementById("total").textContent = `Tổng: ${total.toLocaleString()}₫`;
}
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart)); // nếu có lưu localStorage
  updateCart(); // 🟢 phải có dòng này
}

updateCart();



