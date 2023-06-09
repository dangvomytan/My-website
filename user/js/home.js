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
         <a href="../pages/update_user.html" class="option-btn">Edit</a>
         <a href="../pages/order.html" class="btn">Order</a>
         </div>

         <a href="../pages/signup_login.html" class="delete-btn" onclick="handleLogout()">logout</a>`;
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

  console.log(userInfo.userCart.length, 222);
  eCartLength.innerHTML = `(${userInfo.userCart.length})`;
}
// ====== Main =====
// Check Login
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
if (userLogin) {
  handleRenderUserLogin(userLogin);
}
handleCartLength();
handleRenderUserLogin(userLogin);
