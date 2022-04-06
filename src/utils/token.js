//存储token
export const setToken = (token)=>{
    localStorage.setItem("TOKEN",token)
}
//获取token
export const getToken = ()=>{
    localStorage.getItem("TOKEN")
}
//清除本地缓存
export const removeToken = ()=>{
    localStorage.removeItem("TOKEN")
}
