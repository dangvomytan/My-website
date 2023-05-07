function localStorageGetItem(key) {
     const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
     return data;
  }
  function localStorageSetItem(key, data) {
     localStorage.setItem(`${key}`, JSON.stringify(data));
  }
  function handleUpdateUser()
  {
     console.log(1);
     const listUser=  localStorageGetItem("users");

     const userName = document.querySelector("#tbx_userName");
     const userEmail = document.querySelector("#tbx_userEmail");
     const userPassword =  document.querySelector("#tbx_userPassword");
     const userRePassword =  document.querySelector("#tbx_userRePassword");
     let userInfo={};
     // let idUser,statuSuser;
     listUser.forEach(user => {
     if(userLogin.userEmail ===user.userEmail)
     {
          idUser = user.userId;
          statuSuser = user.userStatus;
     }
     });
     // debugger;
     userInfo={
          // userId: idUser,
          // userStatus: statuSuser,
          userName: userName.value,
          userEmail: userEmail.value,
          userPassword: userPassword.value,
          userRePassword: userRePassword.value,
     }
     console.log(11,userLogin);
     console.log(22,userLogin);
     listUser.forEach((user,index)=>{
          if(user.userId===userInfo.userId)
          {
               listUser.splice(index,1,userInfo);
               localStorageSetItem("users",listUser);

               localStorageSetItem("userLogin",userLogin);
               // window.location="../index.html";
          }
     })
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