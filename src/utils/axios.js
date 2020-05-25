import axios from 'axios'
import store from '../store/index'

// 配置
axios.defaults.baseURL = 'http://localhost:13080/'
axios.defaults.timeout = 20000
axios.defaults.headers['Content-Type'] = 'application/json'
 
axios.interceptors.request.use(
    config => {
        config.headers['Token'] = store.state.token;
        return config;
    },
    error => {
        return error;
    }
);
 
axios.interceptors.response.use(
    data => {
        return data;
    },
    error => {
        return error;
    }
);


export default axios