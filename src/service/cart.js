import axios from './../utils/axios';
export function addCart(params){
    return axios.post('/shop-cart',params)
}

export function getCart(params) {
    return axios.get('/shop-cart', { params });
  }