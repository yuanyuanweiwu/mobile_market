import axios from './../utils/axios';

export  function getHome(parasm) {
    return axios.get('/index-infos')
}