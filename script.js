// Danh sách sản phẩm mẫu
const products = [
  { id: 1, name: "Chuột Gaming", price: 200000 },
  { id: 2, name: "Tai nghe Bluetooth", price: 350000 },
  { id: 3, name: "Bàn phím cơ", price: 800000 },
  { id: 4, name: "Laptop Dell XPS", price: 20000000 },
  { id: 5, name: "Màn hình LG 24inch", price: 3000000 },
  { id: 6, name: "Ổ cứng SSD 512GB", price: 1500000 }
];

let currentUser = null;
let cart = [];

// Đăng ký người dùng mới (chỉ lưu trong localStorage)
function register(username, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.username === username)) {
    alert("Tài khoản đã tồn tại!");
    return;
  }
  users.push({ username, password, orders: [], isAdmin: false });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công!");
}

// Đăng nhập tài khoản
function login(username, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đăng nhập thành công");
    renderCart();
    renderOrders();
    if (user.isAdmin) renderAllOrders();
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu!");
  }
}

// Đăng xuất
function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  alert("Đã đăng xuất!");
  location.reload();
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Cập nhật giao diện giỏ hàng
function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  const cartMap = {};
  cart.forEach(item => {
    if (cartMap[item.id]) {
      cartMap[item.id].quantity++;
    } else {
      cartMap[item.id] = { ...item, quantity: 1 };
    }
  });

  let total = 0;
  for (const id in cartMap) {
    const item = cartMap[id];
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - ${item.price * item.quantity}₫`;
    cartItemsElement.appendChild(li);
    total += item.price * item.quantity;
  }

  document.getElementById("total").textContent = `Tổng: ${total.toLocaleString()}₫`;
}

// Hiển thị danh sách sản phẩm
function renderProducts() {
  const productsElement = document.getElementById("products");
  productsElement.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price.toLocaleString()}₫</p>
      <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
    `;
    productsElement.appendChild(div);
  });
}

// Xác nhận mua hàng (checkout)
function checkout() {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để mua hàng.");
    return;
  }
  if (cart.length === 0) {
    alert("Giỏ hàng trống.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users"));
  const index = users.findIndex(u => u.username === currentUser.username);
  users[index].orders = users[index].orders.concat(cart);
  localStorage.setItem("users", JSON.stringify(users));
  cart = [];
  localStorage.removeItem("cart");
  alert("Đặt hàng thành công!");
  updateCart();
  renderOrders();
  if (currentUser.isAdmin) renderAllOrders();
}

// Hiển thị đơn hàng của người dùng
function renderOrders() {
  if (!currentUser || currentUser.isAdmin) return;

  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(u => u.username === currentUser.username);

  const ordersElement = document.getElementById("my-orders");
  ordersElement.innerHTML = "<h3>Đơn hàng của tôi</h3>";
  user.orders.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString()}₫`;
    ordersElement.appendChild(li);
  });
}

// ADMIN: Hiển thị tất cả đơn hàng
function renderAllOrders() {
  const allOrdersElement = document.getElementById("all-orders");
  if (!allOrdersElement || !currentUser || !currentUser.isAdmin) return;

  allOrdersElement.innerHTML = "<h3>Đơn hàng của tất cả người dùng</h3>";

  const users = JSON.parse(localStorage.getItem("users"));
  users.forEach(user => {
    if (user.orders.length > 0) {
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `<h4>${user.username}</h4>`;
      const ul = document.createElement("ul");
      user.orders.forEach(order => {
        const li = document.createElement("li");
        li.textContent = `${order.name} - ${order.price.toLocaleString()}₫`;
        ul.appendChild(li);
      });
      userDiv.appendChild(ul);
      allOrdersElement.appendChild(userDiv);
    }
  });
}

// Khởi tạo lại từ localStorage khi tải trang
window.onload = () => {
  renderProducts();
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  if (savedCart) cart = savedCart;
  updateCart();

  const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (savedUser) {
    currentUser = savedUser;
    renderOrders();
    if (currentUser.isAdmin) renderAllOrders();
  }
};
