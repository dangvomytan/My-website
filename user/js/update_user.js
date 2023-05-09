function localStorageGetItem(key) {
     const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
     return data;
  }
  function localStorageSetItem(key, data) {
     localStorage.setItem(`${key}`, JSON.stringify(data));
  }
  function handleUpdateUser()
  {
     const listUser=  localStorageGetItem("users");
     const  message = document.querySelector(".message");
     const  message_Content = document.querySelector("#message_Content");

     const userEmail = document.querySelector("#tbx_userEmail");
     const userName = document.querySelector("#tbx_userName");
     const userPassword =  document.querySelector("#tbx_userPassword");
     const userRePassword =  document.querySelector("#tbx_userRePassword");
     let userInfo={};
     let idUser,statuSuser,isTrue=false;
     listUser.forEach(user => {
     if(userLogin.userEmail === user.userEmail)
     {
          isTrue=true;
          idUser = user.userId;
          statuSuser = user.userStatus;
     }
     });
     if(isTrue)
     {
          userInfo={
               userId: idUser,
               userStatus: statuSuser,
               userName: userName.value,
               userEmail: userEmail.value,
               userPassword: userPassword.value,
               userRePassword: userRePassword.value,
               userCart:[],
               userPhone: "",
               userAddress: "",
          }
          listUser.forEach((user,index)=>{
               if(user.userId===userInfo.userId)
               {
                    listUser.splice(index,1,userInfo);
                    localStorageSetItem("users",listUser);
                    // window.location="../../index.html";
                    message.style.display="inline"
                    message_Content.innerHTML="cập nhật thành công";
               }
          })
     }
}
function handleEditUser(userLogin)
{
   const listUser=  localStorageGetItem("users");

   const userName = document.querySelector("#tbx_userName");
   const userEmail = document.querySelector("#tbx_userEmail");
   const userPassword =  document.querySelector("#tbx_userPassword");
   const userRePassword =  document.querySelector("#tbx_userRePassword");

   listUser.forEach(user => {
   if(userLogin.userEmail ===user.userEmail)
   {
        userName.value = user.userName;
        userEmail.value = user.userEmail;
        userPassword.value = user.userPassword;
        userRePassword.value = user.userRePassword;
   }
   });
}
// =====Main=============
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
if(userLogin)
{
     handleEditUser(userLogin);
}