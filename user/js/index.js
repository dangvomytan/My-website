let navbar = document.querySelector(".header .flex .navbar");
let profile = document.querySelector(".header .flex .profile");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  profile.classList.remove("active");
};

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  navbar.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  profile.classList.remove("active");
};
//  LocalStorage
function localStorageGetItem(key) {
  const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
  return data;
}
function localStorageSetItem(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}
//  Định dạng kiểu
function fomatPrice(str) {
  let strPrint = parseInt(str).toLocaleString("de-DE") + " VNĐ";
  return strPrint;
}
//  Render 
function handleRenderUserLogin(info) {
  listUser = localStorageGetItem("users");
  const eProfile = document.querySelector("#box_profile");
  let conten = "";
  listUser.forEach((user) => {
    if (info.userEmail === user.userEmail) {
      conten += `            
         <p>${user.userName}</p>
         <div class="flex-btn">
         <a href="./user/pages/update_user.html" class="option-btn">Edit</a>
         <a href="./user/pages/orders.html" class="btn">Order</a>
         </div>

         <a href="./user/pages/signup_login.html" class="delete-btn" onclick="handleLogout()">logout</a>`;
    }
  });
  eProfile.innerHTML = conten;
}
// Handle 
function handleLogout() {
  localStorage.removeItem("userLogin");
}

function handleCartLength() {
  const eCartLength = document.querySelector("#cart_length");

  const listUser = localStorageGetItem("users");
  const userLogin = localStorageGetItem("userLogin");
  const userInfo = listUser.find(
    (user) => user.userEmail === userLogin.userEmail
  );

  console.log(userInfo.userCart  .length, 222);
  eCartLength.innerHTML = `(${userInfo.userCart.length})`;
}

function handleClickViewHome(id) {
  window.location = `./user/pages/detail_product.html?productid=${id}`;
}

function handleRenderProductHome() {
  const listProduct = localStorageGetItem("products");
  const element = document.querySelector("#show_card");
  let content = "";
  listProduct.forEach((product) => {
    content += `
          <div class="swiper-slide slide">
          <img src="${product.productImage}" alt="">
          <div class="name">${product.productName}</div>
          <div class="flex">
             <div class="price"><span>${fomatPrice(
               product.productPrice
             )}</span></div>
          </div>
          <button class="btn" onclick="handleClickViewHome(${
            product.productId
          })">Xem chi tiết</button>
       </div>
          `;
  });
  element.innerHTML = content;
}

// ====== Main =====
// Check Login
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
if (userLogin) {
  handleRenderUserLogin(userLogin);
}
handleCartLength();
handleRenderUserLogin(userLogin);
handleRenderProductHome()