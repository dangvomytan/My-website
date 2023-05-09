function localStorageGetItem(key) {
  const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
  return data;
}
function localStorageSetItem(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}

function fomatPrice(str) {
  let strPrint = parseInt(str).toLocaleString("de-DE") + " VNĐ";
  return strPrint;
}
function handleRenderCart() {
  const listUser = localStorageGetItem("users");
  const userLogin = localStorageGetItem("userLogin");
  const listProduct = localStorageGetItem("products");
  const userInfo = listUser.find(
    (user) => user.userEmail === userLogin.userEmail
  );

  const eRender = document.querySelector("#box_cart");
  let content = "";

  userInfo.userCart.forEach((item) => {
    listProduct.forEach((product) => {
      if (item.productId == product.productId) {
        //   console.log(product.productName);
        content += `
               <div action="" class="box">
               <img src="${product.productImage}" alt="">
               <div class="name">${product.productName}</div>
               <div class="flex">
               <div class="price"><span>${fomatPrice(
                 product.productPrice
               )}</span></div>
                  <input type="number" name="qty" class="qty" min="1" max="99"" value ="${
                    item.quantily
                  }" onclick="handleUpdateQuantity(${
          item.productId
        },this.value)">
               </div>
               <div class="sub-total">Tổng : <span>${fomatPrice(
                 Number(product.productPrice) * Number(item.quantily)
               )}</span> </div>
               <input type="submit" value="Xem chi tiết" class="btn" onclick="handleClickViewDetail(${
                 item.productId
               })">
               <input type="submit" value="Xóa" class="delete-btn" onclick="handleClickDeleteCart(${
                 item.productId
               })">
            </div>
               `;
      }
    });
  });
  eRender.innerHTML = content;
}
function handleUpdateQuantity(id, qty) {
  const listUser = localStorageGetItem("users");
  const userLogin = localStorageGetItem("userLogin");
  const userInfo = listUser.find(
    (user) => user.userEmail === userLogin.userEmail
  );
  userInfo.userCart.forEach((user) => {
    if (id == user.productId) {
      user.quantily = qty;
    }
  });
  listUser.forEach((user, index) => {
    if ((userInfo.userId = user.userId)) {
      listUser.splice(index, 1, userInfo);
      localStorageSetItem("users", listUser);
    }
  });
  handleRenderCart();
  handleRenderTotal();
}

function handleClickDeleteCart(id) {
  const listUser = localStorageGetItem("users");
  const userLogin = localStorageGetItem("userLogin");
  const userInfo = listUser.find(
    (user) => user.userEmail === userLogin.userEmail
  );
  userInfo.userCart.forEach((user, index) => {
    if (id == user.productId) {
      userInfo.userCart.splice(index, 1);
      localStorageSetItem("users", listUser);
    }
  });
  handleRenderCart();
  handleRenderTotal();
}
function handleRenderTotal() {
  const listUser = localStorageGetItem("users");
  const userLogin = localStorageGetItem("userLogin");
  const listProduct = localStorageGetItem("products");
  const userInfo = listUser.find(
    (user) => user.userEmail === userLogin.userEmail
  );

  const eRender = document.querySelector("#ct_total");
  let totai = 0;
  userInfo.userCart.forEach((item) => {
    listProduct.forEach((product) => {
      if (item.productId == product.productId) {
        totai = totai + Number(product.productPrice) * Number(item.quantily);
      }
    });
    eRender.innerHTML = `Tổng cộng : <span>${fomatPrice(totai)}</span>`;
  });
}

function handleClickViewDetail(id) {
  window.location = `../pages/detail_product.html?productId=${id}`;
}
function handleClickToShop() {
  window.location = `../pages/shop.html`;
}

function handleClickDeleteAllCart() {
  const eRender = document.querySelector("#ct_total");
  const listUser = localStorageGetItem("users");
  const userLogin = localStorageGetItem("userLogin");
  const userInfo = listUser.find(
    (user) => user.userEmail === userLogin.userEmail
  );
  userInfo.userCart.splice(0, userInfo.userCart.length);
  localStorageSetItem("users", listUser);
  eRender.innerHTML = `Tổng cộng : <span>0</span>`;
  handleRenderCart();
}
function handleClickCheckout() {
  // const eRender = document.querySelector("#ct_total");
  const listUser = localStorageGetItem("users");
  const userLogin = localStorageGetItem("userLogin");
  const listOrder = localStorageGetItem("orders");
  let today = new Date();
  let orderIdAuto = 1;
  //Lấy id order tự động
  if (listOrder.length != 0) {
    orderIdAuto = listOrder[listOrder.length - 1].orderId + 1;
  }
  let order = {
    orderId: "",
    userId: "",
    date: "",
    cartDetail: [],
    status: false,
  };

  const userInfo = listUser.find(
    (user) => user.userEmail === userLogin.userEmail
  );
  //Gán giá trị vào đơn hàng
  order.orderId = orderIdAuto;
  order.cartDetail = userInfo.userCart;
  order.date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  order.userId = userInfo.userId;
  localStorageSetItem("checkout", order);
// Xóa giỏ hàng trong giỏ hàng người dung
userInfo.userCart= []
listUser.forEach((user, index) => {
  if ((user.userId == userInfo.userId)) {
    listUser.splice(index, 1, userInfo);
  }
});
localStorageSetItem("users", listUser);
  window.location = `../pages/checkout.html`;
}

function handleRenderHistoryOrder(idUser) {
  const listOrder = localStorageGetItem("orders");
  hitory = listOrder.filter((item) => item.userId == 1);
  console.log(hitory, 2222);
}
// -------main---------
handleRenderCart();
handleRenderTotal();


