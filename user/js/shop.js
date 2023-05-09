function localStorageGetItem(key) {
  const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
  return data;
}
function localStorageSetItem(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}
function fomatPrice(str)
{
  let strPrint =  parseInt(str).toLocaleString("de-DE") + " VNĐ";
  return strPrint;

}
function handleRenderProduct()
{
     const listProduct = localStorageGetItem("products");
     const element = document.querySelector("#product_card");
     let content="";
     listProduct.forEach(product => {
          content+=`
          <div class="box" >
          <img src="${product.productImage}" alt="">
          <div class="name">${product.productName}</div>
          <div class="flex">
             <div class="price"><span>${fomatPrice(product.productPrice)} </span></div>
          </div>
          <button class="btn" onclick="handleClickView(${product.productId})">Xem chi tiết</button>
       </div>
          `
     });
     element.innerHTML = content;
}
function handleClickView(id)
{
  window.location = `../pages/detail_product.html?productId=${id}`
}



// =MAIN================================

handleRenderProduct();