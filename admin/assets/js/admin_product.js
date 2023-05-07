
// Lấy dữ liệu từ local
function localStorageGetItem(key) {
  const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
  return data;
}
// Đẩy dữ liệu lên local
function localStorageSetItem(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}

//===ADMIN PRODUCT=========================================
// Hàm fomat link hình ảnh
function fomatSrcImage(src) {
  const array = src.split("\\");
  const string = "../../images/products/" + array[2];
  return string;
}
function getImage(src)
{

    let str = fomatSrcImage(src);
    const elementImage = document.querySelector("#printImage");
    elementImage.innerHTML=`<img src="${str}" alt="">` ;
}
function checkError(info, list) {
  const errorIdProduct = document.querySelector("#errorIdProduct");

  const errorProduct = validator(info, list);

  let isCheck = true;
  if (errorProduct.isError == false) {
    isCheck = true;
    errorIdProduct.innerHTML = "";
  } else {
    isCheck = false;
    errorIdProduct.innerHTML = errorProduct.errorIdProduct;
  }
  return isCheck;
}
function validator(info, list) {
  const errorProduct = {
    isError: false,
    errorIdProduct: "",
  };
  if (!info.productId) {
    errorProduct.isError = true;
    errorProduct.errorIdProduct = "Mã sản phẩm không được để trống";
  }
   else {
    list.forEach((product) => {
      if (info.productId === product.productId) {
        errorProduct.isError = true;
        errorProduct.errorIdProduct = "Mã sản phẩm đã tồn tại";
      }
    });
  }
  return errorProduct;
}
function deleteValueInput()
{
  const productId = document.querySelector("#tbxIdInput");
  const productList = document.querySelector("#tbxListProductInput");
  const productBrand = document.querySelector("#tbxBrandProductInput");
  const productName = document.querySelector("#tbxNameProductInput");
  const productPrice = document.querySelector("#tbxPriceInput");
  const productImage = document.querySelector("#tbxImageInput");
  const productDetail = document.querySelector("#tta_detailProduct");
  productId.value = "";
  productList.value = "";
  productBrand.value = "";
  productName.value = "";
  productPrice.value = "";
  productImage.value = "";
  productDetail.value = "";
}
// ================================
function handleClickCreateProduct() {
  const form = document.querySelector("#mr-updateform");
  const btn_create = document.querySelector("#btn_createProduct");
  const btn_update = document.querySelector("#btnUpdateProduct")
  const btn_add = document.querySelector("#btnAddProduct")
  const elementInputId =  document.querySelector("#tbxIdInput")

  form.style.display="block";
  btn_create.style.display ="none";
  btn_update.style.display ="none";
  btn_add.style.display="inline-block";
  elementInputId.removeAttribute("disabled")
}

function handleClickCancelProduct() {
  const form = document.querySelector("#mr-updateform");
  const btn_create = document.querySelector("#btn_createProduct");
  form.style.display="none";
  btn_create.style.display ="block";
  deleteValueInput();
}
// render sản phẩm
function handleRenderProduct() 
{
   const listProduct = localStorageGetItem("products");
   const tbody = document.querySelector("#tbd_product");
   let tableContent = "";
   listProduct.forEach((product,index)=>{
    tableContent += `
    <tr>
    <td>${index+1}</td>
    <td><img src="${product.productImage}" alt=""></td>
    <td>${product.productName}</td>
    <td>${product.productPrice}</td>
    <td>
         <button class="bg_btn_edit" onclick="handleEditProduct('${product.productId}')"><a href="#mr-header">Edit</a></button>
         <button class="bg_btn_delete" onclick="handleDeleteProduct('${product.productId}')">Delete</button>
    </td>
</tr>
    `
   })
   tbody.innerHTML=tableContent;
}
// Thêm sản phẩm mới
function handleAddProduct() {
  const listProduct = localStorageGetItem("products");

  const form = document.querySelector("#mr-updateform");
  const btn_create = document.querySelector("#btn_createProduct");

  const productId = document.querySelector("#tbxIdInput");
  const productList = document.querySelector("#tbxListProductInput");
  const productBrand = document.querySelector("#tbxBrandProductInput");
  const productName = document.querySelector("#tbxNameProductInput");
  const productPrice = document.querySelector("#tbxPriceInput");
  const productImage = document.querySelector("#tbxImageInput");
  const productDetail = document.querySelector("#tta_detailProduct");
  
  const newProduct = {
    productId: productId.value,
    productList: productList.value,
    productBrand: productBrand.value,
    productName: productName.value,
    productPrice: productPrice.value,
    productImage: fomatSrcImage(productImage.value),
    productDetail: productDetail.value,
  };
  const isCheck = checkError(newProduct,listProduct);
  if(isCheck==true)
  {

      listProduct.push(newProduct);
      console.log(111,listProduct);
      localStorageSetItem("products",listProduct);
      form.style.display="none";
      deleteValueInput()
      handleRenderProduct();
      btn_create.style.display="block";
  }
}
// Xóa sản phẩm
function handleDeleteProduct(id) 
{
  listProduct = localStorageGetItem("products");
  listProduct.forEach((product,index)=>{
    if(product.productId===id)
    {
      listProduct.splice(index,1);
      localStorageSetItem("products",listProduct)
      handleRenderProduct();
    }
  })
}
// Sửa sản phẩm
function handleEditProduct(id)
 {
  const listProduct = localStorageGetItem("products");
  const form = document.querySelector("#mr-updateform");
  const elementImage = document.querySelector("#printImage");
  const btn_add = document.querySelector("#btnAddProduct")
  const btn_update = document.querySelector("#btnUpdateProduct")
  const btn_create = document.querySelector("#btn_createProduct");

  const productId = document.querySelector("#tbxIdInput");
  const productList = document.querySelector("#tbxListProductInput");
  const productBrand = document.querySelector("#tbxBrandProductInput");
  const productName = document.querySelector("#tbxNameProductInput");
  const productPrice = document.querySelector("#tbxPriceInput");
  // const productImage = document.querySelector("#tbxImageInput");
  const productDetail = document.querySelector("#tta_detailProduct");

  listProduct.forEach((product)=>{
    if(product.productId===id)
    {
      form.style.display="block";
      btn_add.style.display="none";
      btn_update.style.display="inline-block";
      btn_create.style.display ="none";

      productId.value = product.productId;
      productId.disabled="true";
      productList.value = product.productList;
      productBrand.value = product.productBrand;
      productName.value = product.productName;
      productPrice.value = product.productPrice;
      elementImage.innerHTML=`<img src="${product.productImage}" alt="">`;
      productDetail.value = product.productDetail;
      btn_update.setAttribute("onclick",`handleUpdateProduct("${id}")`)
    }
  })
 }
// Cập nhật sản phẩm
function handleUpdateProduct(id) 
{
  const listProduct = localStorageGetItem("products");

  const form = document.querySelector("#mr-updateform");
  const btn_create = document.querySelector("#btn_createProduct");

  const productId = document.querySelector("#tbxIdInput");
  const productList = document.querySelector("#tbxListProductInput");
  const productBrand = document.querySelector("#tbxBrandProductInput");
  const productName = document.querySelector("#tbxNameProductInput");
  const productPrice = document.querySelector("#tbxPriceInput");
  const productImage = document.querySelector("#tbxImageInput");
  const productDetail = document.querySelector("#tta_detailProduct");
  
  const updateProduct = {
    productId: productId.value,
    productList: productList.value,
    productBrand: productBrand.value,
    productName: productName.value,
    productPrice: productPrice.value,
    productImage: fomatSrcImage(productImage.value),
    productDetail: productDetail.value,
  };

  listProduct.forEach((product,index)=>{
    if(id===product.productId)
    {
      listProduct.splice(index,1,updateProduct);
      localStorageSetItem("products",listProduct);
console.log(3333,listProduct);
      form.style.display="none";
      deleteValueInput()
      handleRenderProduct();
      btn_create.style.display="block";
    }
  })
}
// ===MAIN=========================================
handleRenderProduct();
const formElement = document.querySelector("#formProductInput");
formElement.addEventListener("submit",(e)=>
{
    e.preventDefault();

});

