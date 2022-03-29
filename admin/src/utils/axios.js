import axios from "axios";
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.baseURL = 'https://shop-api.mightycoders.xyz/';
export default axios;