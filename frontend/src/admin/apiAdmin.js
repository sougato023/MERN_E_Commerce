import { API } from "../config";

export const createCategory = (userId, token, category) => {
    //console.log(name,email, password);
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then((response) =>{
        
        return response.json();
    })
    .catch((err,data) => {
        console.log(data);
    })
};


export const createProduct = (userId, token, product) => {
    //console.log(name,email, password);
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            
            Authorization:`Bearer ${token}`
        },
        body: product
    })
    .then((response) =>{
        
        return response.json();
    })
    .catch((err,data) => {
        console.log(data);
    })
};
