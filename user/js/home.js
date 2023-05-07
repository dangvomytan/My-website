let navbar = document.querySelector('.header .flex .navbar');
let profile = document.querySelector('.header .flex .profile');

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
   profile.classList.remove('active');
}

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   navbar.classList.remove('active');
}

window.onscroll = () =>{
   navbar.classList.remove('active');
   profile.classList.remove('active');
}

function localStorageGetItem(key) {
   const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
   return data;
}
function localStorageSetItem(key, data) {
   localStorage.setItem(`${key}`, JSON.stringify(data));
}

function handleRenderUserLogin(info)
{
   listUser = localStorageGetItem("users");
   const eProfile = document.querySelector("#box_profile");
   let conten="";
   listUser.forEach(user => {
      if(info.userEmail===user.userEmail)
      {
         conten+=`            
         <p>${user.userName}</p>
         <div class="flex-btn">
         <a href="./user/pages/update_user.html" class="option-btn">Edit</a>
         </div>
         <a href="./user/pages/Signup_Login.html" class="delete-btn" onclick="handleLogout()">logout</a>`
      }
   });
   eProfile.innerHTML=conten;
}

function handleLogout() 
{
   localStorage.removeItem("userLogin");
}
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
if(userLogin)
{
handleRenderUserLogin(userLogin);
}
