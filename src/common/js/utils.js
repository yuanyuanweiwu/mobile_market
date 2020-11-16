export const getLocal=name=>{
    return sessionStorage.getItem(name)
}
export const setLocal =(name,value)=>{
    sessionStorage.setItem(name,value)
}