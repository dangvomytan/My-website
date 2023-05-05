// Lấy dữ liệu từ local
function localStorageGetItem(key) {
     const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
     return data;
   }
   // Đẩy dữ liệu lên local
   function localStorageSetItem(key, data) {
     localStorage.setItem(`${key}`, JSON.stringify(data));
   }
//===ADMIN USER============================================
//Show danh sách người dùng
function handleRenderUsers() {
     let listUser = localStorageGetItem("users");
     const tbody = document.querySelector("#tbd_users");
     let tableContent = "";
     listUser.forEach((user, index) => {
       tableContent += `
           <tr>
                <td>${index + 1}</td>
                <td>${user.userName}</td>
                <td>${user.userEmail}</td>
                <td>`;
       if (user.userStatus == true) {
         tableContent += `<button class="bg_btn_actinve" onclick="handelClickStatus(${user.userId})">Active</button>`;
       } else {
         tableContent += `  <button class="bg_btn_inactive" onclick="handelClickStatus(${user.userId})">Inactive</button>`;
       }
       tableContent += `</td></tr>`;
     });
     tbody.innerHTML = tableContent;
   }
   // Hàm xử lý trạng thái người dùng
   function handelClickStatus(id) {
     console.log("id>", id);
     const listUser = localStorageGetItem("users");
     listUser.forEach((user) => {
       if (user.userId == id) {
         if (user.userStatus == true) {
           user.userStatus = false;
         } else {
           user.userStatus = true;
         }
         localStorageSetItem("users", listUser);
       }
     });
     console.log(">", listUser);
     handleRenderUsers();
   }
// ===MAIN=========================================
handleRenderUsers();