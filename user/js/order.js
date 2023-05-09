const url = new URL(document.URL);
const orderId = url.searchParams.get("orderId");

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

function handleRenderOrderDetail(orderId) 
{
     const eDetailOrder= document.querySelector("#detail_order")

    const listOrder = localStorageGetItem("orders");
    const listProduct = localStorageGetItem("products");
    const order = listOrder.find((order) => orderId == order.orderId);
    const listUser = localStorageGetItem("users");
    const userLogin = localStorageGetItem("userLogin");
    const userInfo = listUser.find(
      (user) => user.userEmail === userLogin.userEmail
    );
    let total = 0;
    order.cartDetail.forEach((item) => {
      listProduct.forEach((product) => {
        if (item.productId == product.productId) {
          total = Number(total) + product.productPrice * item.quantily;
        }
      });
    });



     let content = `
     <p>Tên : <span>${userInfo.userName}</span></p>
     <p>Email : <span>${userInfo.userEmail}</span></p>
     <p>SĐT : <span>${userInfo.userPhone}</span></p>
     <p>Địa chỉ : <span>${userInfo.userAddress}</span></p>
     <p>Phương thức thanh toán : <span>${order.method}</span></p>
     <p>Tổng giá : <span>${fomatPrice(total)}</span></p>`
     if(order.status==false)
     {
      content += `<p > Tình trạng : <span style = "color:red">ĐANG XỬ LÝ</span> </p>`
     }
     else
     {
          content += `<p > Tình trạng : <span style = "color:green">THÀNH CÔNG</span> </p>`
     }
     eDetailOrder.innerHTML = content;
}


if (JSON.parse(localStorage.getItem("userLogin"))) {
     handleRenderOrderDetail(orderId)
}
