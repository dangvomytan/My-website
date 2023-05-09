const url = new URL(document.URL);
const viewId = url.searchParams.get("productId");

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
// Render chi tiết sản phẩm theo id
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
                  <div class="price"><span>${fomatPrice(product.productPrice)}</span></div>
                  <input type="number" id="tbx_qtyProduct" name="qty" class="qty" min="1" max="99" value="1">
               </div>
               <div class="flex-btn">
               <button class="btn" onclick="handleClickAddToCart(${product.productId})">Thêm vào giỏ hàng</button>
               <button class="option-btn" onclick="handleClickToCart()">Đến vào giỏ hàng</button>
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
function handleClickAddToCart(idProduct)
{

  const qtyProduct = document.querySelector("#tbx_qtyProduct").value;
  const userLogin = localStorageGetItem("userLogin");
  const listUser = localStorageGetItem("users");

  let userInfo={}
  if(userLogin)
  {
    userInfo = listUser.find((user)=> user.userEmail===userLogin.userEmail);

    let productCart = {
      productId: idProduct,
      quantily: qtyProduct,
      }
    if(userInfo.userCart)
    {
      let isDulicateProduct = false;
      userInfo.userCart.forEach(product=> {
        if(product.productId == idProduct ) {
         product.quantily = Number(qtyProduct)+ Number( product.quantily)
         isDulicateProduct = true
        }
      });
      if(!isDulicateProduct)
      {
        userInfo.userCart.push(productCart);
        listUser.forEach((user,index)=>{
          if(userInfo.userEmail==user.userEmail)
          {
            listUser.splice(index,1,userInfo);
            localStorageSetItem("users",listUser);
          }
        })
        localStorageSetItem("users",listUser)
      }
    }
    }
    listUser.forEach((user,index)=>{
      if(userInfo.userEmail==user.userEmail)
      {
        listUser.splice(index,1,userInfo);
        localStorageSetItem("users",listUser);
      }
    })

}
function handleClickToCart() 
{
window.location="../pages/cart.html"
}
// === main =====
handleRenderDetailProduct(viewId);
