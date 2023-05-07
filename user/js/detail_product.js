const url = new URL(document.URL);
const viewId = url.searchParams.get("productId");
console.log(viewId, 111);

function localStorageGetItem(key) {
  const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
  return data;
}
function localStorageSetItem(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}

function handleRenderDetailProduct(id) {
  const listProduct = localStorageGetItem("products");
  const boxDetail = document.querySelector(".box_detail");
  let content = "";
  listProduct.forEach((product) => {
    if (id === product.productId) {
      content += `
         <div>
         <div class="row">
            <div class="image-container">
               <div class="main-image">
                  <img src="${product.productImage}">
               </div>
            </div>
            <div class="content">
               <div class="name">${product.productName}</div>
              <div class="details">
               <b>Danh mục: </b> ${product.productList}
               </div>
               <div class="details">
               <b>Thương hiệu:</b> ${product.productBrand}
               </div>

               <div class="flex">
                  <div class="price"><span>${product.productPrice}</span><span>VND</span></div>
                  <input type="number" name="qty" class="qty" min="1" max="99" onkeypress="" value="1">
               </div>
               <div class="flex-btn">
                  <input type="submit" value="Thêm vào giỏ hàng" class="btn" name="add_to_cart">
               </div>
               <div class="details">
               <h2>Tùy chọn phiên bản:</h2>
               - Full combo
               </div>
            </div>
         </div>
         <div class="details">
           ${product.productDetail}
         </div>
      </div>
               `;
    }
  });
  boxDetail.innerHTML = content;
}

handleRenderDetailProduct(viewId);
