function localStorageGetItem(key)
 {
     const data = JSON.parse(localStorage.getItem(`${key}`));
     return data;
}
function localStorageSetItem(key, data) {
localStorage.setItem(`${key}`, JSON.stringify(data));
}
// {
//      productId: 10,
//      productList: "",
//      productBrand: "",
//      productName: "",
//      productPrice: "",
//      productImage: "",
//      productDetail:
//        "",
//    },
const products = [
  {
    productId: "1",
    productList: "Mini",
    productBrand: "DJI",
    productName: "DJI Mini 2 SE",
    productPrice: "8000000",
    productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
    productDetail:
      "DJI Mini 2 SE nhẹ như thế nào? Với trọng lượng chưa đến 249 g, DJI Mini 2 SE  nặng bằng một quả táo và nằm gọn trong lòng bàn tay của bạn. Nhỏ gọn và tiện lợi, Mini 2 SE chắc chắn sẽ là người bạn đồng hành lý tưởng trong những chuyến đi của bạn, giúp  bạn ghi lại những khoảnh khắc yêu thích của mình.",
  },
  {
    productId: '2',
    productList: "Mini",
    productBrand: "DJI",
    productName: "DJI Mini 3",
    productPrice: "19780000",
    productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
    productDetail:
      "DJI Mini 3 là một máy bay không người lái nhỏ gọn, siêu nhẹ, sẵn sàng cho những cuộc phiêu lưu đầy thú vị. Thời lượng pin tiêu chuẩn kéo dài lên đến 38 phút, video 4K HDR tuyệt đẹp, Mini 3 hứa hẹn sẽ mang đến những thước phim nhiều màu sắc và rõ nét đến từng chi tiết. Các tính năng như chụp dọc sẽ tạo nên những bức ảnh sống động trên mạng xã hội. Và dù đi bộ trên bãi biển, xách balo đi chơi cuối tuần hay một chuyến đi kéo dài hàng tháng, Mini 3 sẵn sàng cùng bạn ghi lại mọi khoảnh khắc.",
  },
  {
    productId: "3",
    productList: "Mini",
    productBrand: "DJI",
    productName: "DJI Mini 3 Pro",
    productPrice: "17500000",
    productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
    productDetail:
      "DJI Mini 2 SE nhẹ như thế nào? Với trọng lượng chưa đến 249 g, DJI Mini 2 SE  nặng bằng một quả táo và nằm gọn trong lòng bàn tay của bạn. Nhỏ gọn và tiện lợi, Mini 2 SE chắc chắn sẽ là người bạn đồng hành lý tưởng trong những chuyến đi của bạn, giúp  bạn ghi lại những khoảnh khắc yêu thích của mình.",
  },
  {
    productId: "4",
    productList: "Mavic Air 2",
    productBrand: "DJI",
    productName: "DJI Mavic Air 2S",
    productPrice: "24000000",
    productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
    productDetail:
      "DJI Mavic Air 2S là phiên bản nâng cấp của thiết bị Mavic Air 2 vừa được hãng DJI ra mắt vào tháng 4 năm 2021. Vậy, Sự khác biệt chính giữa DJI Air 2S và Mavic Air 2 là gì? Đó chính là hiệu suất của camera, các tính năng thông minh, hệ thống cảm biến chướng ngại vật và hệ thống truyền dẫn đều đã được cải thiện đáng kể. Các nâng cấp bao gồm cảm biến CMOS 1 inch, truyền dẫn độ trễ thấp bốn ăng-ten, APAS 4.0, được bổ sung cảm biến tầm nhìn kép hướng lên trên và MasterShots.",
  },
  {
     productId: "5",
     productList: "Mavic Air 3",
     productBrand: "DJI",
     productName: "DJI Mavic 3 Pro",
     productPrice: "114000000",
     productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
     productDetail:
       "DJI Mavic 3 Series có hiệu suất hình ảnh cấp độ cao tiếp theo của dòng drone Mavic (tiếp nối series DJI Mavic và DJI Mavic 2). Tuy nhiên, DJI không dừng lại ở đó khi tiếp tục nâng cấp hệ thống ba camera của DJI Mavic 3 Pro mở ra một kỷ nguyên mới của máy bay không người lái trang bị máy ảnh phục vụ nhiếp ảnh chuyên nghiệp bằng cách mang ba camera với cảm biến và ống kính có độ dài tiêu cự khác nhau.",
   },
   {
     productId: "6",
     productList: "Mavic Air 3",
     productBrand: "DJI",
     productName: "DJI Mavic 3 Classic",
     productPrice: "38000000",
     productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
     productDetail:
       "Hassaelblad một trong những thương hiệu camera đứng đầu đến từ Thụy Điển đã thiết kế riêng L2D-20c camera dành riêng cho dòng sp Mavic 3, đưa cảm biến camera 4/3inch Chuyên dụng vào trong 1 thiết kế nhỏ gọn. Với tiêu chuẩn khắc khe nhất của Hasselblad được ứng dụng trong cả phần cứng lẫn phần mêm đã nâng tâm chất lượng hình ảnh đến một tầng cao mới.",
   },
   {
     productId: "7",
     productList: "Phantom 4",
     productBrand: "",
     productName: "Phantom 4 Multispectral",
     productPrice: "24000000",
     productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
     productDetail:
       "Phantom 4 Multispectral Trồng trọt thông minh cho các hoạt động có mục đích Thu thập dữ liệu sức khỏe thực vật chính xác bằng P4 Multispectral – một máy bay không người lái có độ chính xác cao với hệ thống hình ảnh đa quang phổ tích hợp liền mạch được thiết kế cho các nhiệm vụ nông nghiệp, giám sát môi trường,…",
   },
   {
     productId: "8",
     productList: "Phantom 4",
     productBrand: "",
     productName: "Phantom 4 Pro V2.0",
     productPrice: "24000000",
     productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
     productDetail:
       "Chiếc Phantom 4 Pro V2.0 mới ra mắt mang toàn bộ những thông số từ chiếc Phantom 4 Pro ra mắt vào cuối năm 2016, vẫn mang màu trắng ngọc ngà, có nâng cấp thêm một số tính năng mới như tăng độ phân giải hình ảnh trong khi đang điều khiển qua live-view, nâng cấp về khả năng kết nối và nhiều tính năng hữu ích nữa.",
   },
   {
     productId: "9",
     productList: "Avata",
     productBrand: "DJI",
     productName: "DJI Avata Pro-View Combo (New)",
     productPrice: "30000000",
     productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
     productDetail:
       "",
   },
   {
     productId: "10",
     productList: "Inspire",
     productBrand: "DJI",
     productName: "Inspire 2 X7",
     productPrice: "3000000000",
     productImage: "../../images/products/DJI-mini-2-se-24-247x247.jpg",
     productDetail:
       "Thừa hưởng những thành công nhất của Inspire 1, nay DJI cho ra mắt sản phẩm mới Inspire 2 với nhiều cải thiện đáng kể, hệ thống xử lý hình ảnh hoàn toàn mới độ phân giải 5,2K trong CinemaDNG Raw, Nâng cấp quan trọng đầu tiên là khả năng bay của Inspire 2 được nâng cấp rất ấn tượng với tốc độ cao nhất 58 dặm/giờ, xấp xỉ 94km/h.",
   },

];
const userAdmin = {
  userAdmin:"tanadmin@gmail.com",
   password:"tandang123456",}


  //  const listProduct = localStorageGetItem("products");
  //  if(!listProduct)
  //  {

  //  }

localStorageSetItem("products",products);
// localStorageSetItem("userAdmin",userAdmin);