
function localStorageGetItem(key) {
  const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
  return data;
}
function localStorageSetItem(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}
// Fomat
function handleRenderProduct(listProduct) {
  const element = document.querySelector("#product_card");
  let content = "";
  listProduct.forEach((product) => {
    content += `
          <div class="box" >
          <img src="${product.productImage}" alt="">
          <div class="name">${product.productName}</div>
          <div class="flex">
             <div class="price"><span>${product.productPrice} VND</span></div>
          </div>
          <button class="btn" onclick="handleClickView(${product.productId})">Xem chi tiết</button>
       </div>
          `;
  });
  element.innerHTML = content;
}
// Click
function handleClickView(id) {
  window.location = `../pages/detail_product.html?productId=${id}`;
}

function handleSearchProduct() {
  listProduct = localStorageGetItem("products");
  const searchInput = document.querySelector("#tbx_search").value;
  console.log(searchInput, 111);
  const dataSearch = listProduct.filter((product) =>
    product.productName.toLowerCase().includes(searchInput.toLowerCase())
  );
  handleRenderProduct(dataSearch);
}

// ===main===================
