const product ={


}
function localStorageGetItem(key)
{
     const data = JSON.parse(localStorage.getItem(`${key}`))??[];
     return data;
}
function localStorageSetItem(key,data)
{
     localStorage.setItem(`${key}`,JSON.stringify(data));
}