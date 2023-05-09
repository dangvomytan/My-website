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


function handleRenderOrder()
{
     const etbody = document.querySelector("#tbd_order");
     const etotal = document.querySelector("#fr_total")

     const order = localStorageGetItem("checkout");
     const listProduct = localStorageGetItem("products");

     let content ="";
     let i = 1;
     let total = 0;
     order.cartDetail.forEach((item)=>{
     listProduct.forEach((product)=>{
          if (item.productId == product.productId) {
          console.log(product,66666);
          content +=`<tr>
               <td>${i++}</td>
               <td>${product.productName}</td>
               <td>${item.quantily }</td>
               <td>${fomatPrice(product.productPrice)}</td>
               </tr>`;
               total = Number(total) + (product.productPrice * item.quantily);
          }
     });
     });
     etbody.innerHTML = content;
     etotal.innerHTML = `Tổng cộng <span>${fomatPrice(total)}</span>`;
}
function handleRenderUserOrder()
{
     const eOrderName = document.querySelector("#tbx_orderName");
     const eOrderEmail = document.querySelector("#tbx_orderEmail");
     const eOrderPhone = document.querySelector("#tbx_orderPhone");
     const eOrderAddress = document.querySelector("#tbx_orderAddress");

     const userLogin = localStorageGetItem("userLogin");
     const listUser = localStorageGetItem("users");

     const userInfo = listUser.find((user) => user.userEmail === userLogin.userEmail);

     eOrderName.value = userInfo.userName;
     eOrderEmail.value = userInfo.userEmail;
     eOrderPhone.value = userInfo.userPhone;
     eOrderAddress  .value = userInfo.userAddress;
}
function handlePayment()
{
     const checkout = JSON.parse(localStorage.getItem("checkout"));
     const listOrder = localStorageGetItem("orders")
     const listUser = localStorageGetItem("users");
     const userLogin = localStorageGetItem("userLogin");
     const userInfo = listUser.find((user) => user.userEmail === userLogin.userEmail);

     const eOrderPhone = document.querySelector("#tbx_orderPhone");
     const eOrderMethod = document.querySelector("#slt_orderMethod");
     const eOrderAddress = document.querySelector("#tbx_orderAddress");

     userInfo.userPhone = eOrderPhone.value;
     userInfo.userAddress = eOrderAddress.value;
     if(!checkout)
     {
          // null
          console.log(1);
          console.log(checkout);
          alert("Đã xác nhận Thanh toán");
     }
     else
     {
          // ok
          let order = {
               orderId: checkout.orderId,
               userId: checkout.userId,
               date: checkout.date,
               cartDetail: checkout.cartDetail,
               status: checkout.status,
               method: eOrderMethod.value,
          }
          listOrder.push(order);
          //Cập nhật listOder trên local
          localStorageSetItem("orders",listOrder);
          //Xóa check out
          localStorage.removeItem("checkout");
          //Cập nhật thông tin user
          listUser.forEach((user,index) =>{
               if(user.userId = userInfo.userId)
               {
                    listUser.splice(index,1,userInfo)
               }
          })
          localStorageSetItem("users", listUser)
          alert("Xác nhận thanh toán thành công")
     }

     
}
// =====main=================
handleRenderOrder();
handleRenderUserOrder()