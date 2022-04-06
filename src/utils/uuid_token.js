import { v4 as uuidv4 } from 'uuid'

export const getUUID = ()=>{
    let token = localStorage.getItem("UUIDTOKEN")
    if(!token){
        token = uuidv4()
        //本地存储
        localStorage.setItem("UUIDTOKEN",token)
    }
    //一定要有返回值
    return token
}

