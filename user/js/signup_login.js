const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");

const signupLink = document.querySelector("form .signup-link a");
const loginLink = document.querySelector("form .login-link a");
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};
loginLink.onclick = () => {
  loginBtn.click();
  return false;
};
// =============================================
function localStorageGetItem(key) {
  const data = JSON.parse(localStorage.getItem(`${key}`)) ?? [];
  return data;
}
function localStorageSetItem(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}
function validator(info) {
  let error = {
    isError: false,
    errorUserName: "",
    errorEmail: "",
    errorPassword: "",
    errorRePassword: "",
    errorLogin: "",
  };
  const regxEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!info.userName) {
    error.isError = true;
    error.errorUserName = "Name không được bỏ trống";
  }
  //Đặt điều kiện hỏi email có tồn tại hay không
  if (!info.userEmail?.match(regxEmail)) {
    isError = true;
    error.errorEmail = "Email không đúng định dạng";
  }

  if (!info.userPassword) {
    error.isError = true;
    error.errorPassword = "Password không được để trống";
  } else if (info.userPassword.length < 8) {
    error.isError = true;
    error.errorPassword = "Password không được nhỏ hơn 8 ký tự";
  }
  if (!info.userRePassword) {
    error.isError = true;
    error.errorRePassword = "Re-type password không được để trống";
  }
  if (info.userRePassword !== info.userPassword) {
    error.isError = true;
    error.errorRePassword = "Password không trùng khớp";
  }
  return error
}
function checkError(info)
{
    // console.log(info);
    const errorUserName = document.querySelector("#error_userName");
    const errorEmail = document.querySelector("#error_userEmail");
    const errorPassword = document.querySelector("#error_userPassword");
    const errorRePassword = document.querySelector("#error_userRePassword");

    const check = validator(info);
    let isCheck=false;
    if(check.isError)
    {
        isCheck=false;
        errorUserName.innerHTML = check.errorUserName;
        errorEmail.innerHTML = check.errorEmail;
        errorPassword.innerHTML = check.errorPassword;
        errorRePassword.innerHTML = check.errorRePassword;
    }
    else
    {
        isCheck=true;
        errorUserName.innerHTML = "";
        errorEmail.innerHTML = "";
        errorPassword.innerHTML = "";
        errorRePassword.innerHTML = "";
    }
    return isCheck;
}

// ===============================================
listUser = localStorageGetItem("users");
//thực hiên đăng ký
const formSignup = document.querySelector("#fm_signup");
formSignup.addEventListener("submit", (element) => {
  element.preventDefault();
  let isDulicate = false;
  const userName = document.querySelector("#tbx_userName");
  const userEmail = document.querySelector("#tbx_userEmail");
  const userPassword = document.querySelector("#tbx_userPassword");
  const userRePassword = document.querySelector("#tbx_userRePassword");
 
  const listUser = localStorageGetItem("users");

  let idAuto = 1;
  //Lấy id order tự động
  if ( listUser.length != 0) {
    idAuto = listUser[listUser.length - 1].userId + 1;
  }

  console.log(listUser);

  const newUser = {
    userId: idAuto,
    userName: userName.value.trim(),
    userEmail: userEmail.value.toLowerCase().trim(),
    userPassword: userPassword.value.trim(),
    userRePassword: userRePassword.value.trim(),
    userStatus: true,
    userCart:[],
    userPhone: "",
    userAddress: "",
  };

  const isCheck = checkError(newUser,listUser);

  if(isCheck)
  {
    listUser.forEach((user)=>
      {
          if(user.userEmail === newUser.userEmail)
          {
              isDulicate=true;
          }
      });
      if(!isDulicate)
      {
        listUser.push(newUser);
        console.log("new",listUser);
          localStorageSetItem("users", listUser);

          userName.value = "";
          userEmail.value = "";
          userPassword.value = "";
          userRePassword.value= "";
          //Chuyên sanng form login
          loginBtn.click();
      }
      else
      {
          const errorEmail = document.querySelector("#error_userEmail");
          errorEmail.innerHTML="Email đã tồn tại, hãy dùng email khác"
      }

  }
});
//thực hiện đăng nhập
const formLogin = document.querySelector("#fm_login");
formLogin.addEventListener("submit",(element)=>{
  element.preventDefault();
  handleLogin();
})

function handleLogin()
{
  const listUser = localStorageGetItem("users");
  let isDulicate = false;
  let userLogin;

  const errorLogin = document.querySelector("#error_Login");
  const EmailInput = document.querySelector("#tbx_EmailLogin");
  const PasswordInput = document.querySelector("#tbx_PasswordLogin");
  const infoUser = {
    userEmail: EmailInput.value.toLowerCase().trim(),
    userPassword:PasswordInput.value.trim(),
  }
  // console.log(1,infoUser);
  listUser.forEach((user)=>{
    if(infoUser.userEmail === user.userEmail)
    {
      errorLogin.innerHTML = "";
      if(infoUser.userPassword === user.userPassword)
      {
        errorLogin.innerHTML = "";
        if(user.userStatus==true)
        {
          isDulicate=true;
          userLogin = infoUser;
          delete userLogin.userPassword;
        }
        else
        {
          alert("Tài khoản của bạn đã bị khóa")
          errorLogin.innerHTML = "";
        }
      }
    }
  })
  if(isDulicate)
  {
      localStorageSetItem("userLogin", userLogin);
      window.location=("../../index.html")
  }
  else
  {
    errorLogin.innerHTML = "Email hoặc password không đúng";
  }
}