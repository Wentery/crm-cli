import axios from 'axios';
import qs from 'qs';
import store from '../store/index'
import router from '../router/index'
import { removeSession, removeLocal } from '@/assets/js/storage/clear'
let isFirst = true;
const io = axios.create();
io.defaults.timeout = 60000;

io.interceptors.response.use((response) => {
  isFirst = true;
  return response;
}, (error) => {
  if (error.response && isFirst) {
    const code = error.response.status;
    switch (code) {
      case 401: router.replace('/login'); removeLocal('token'); removeSession('tabs'); break;
      case 502: router.push('/error/502');; break;
    }
    isFirst = false;
  }
  // let logs = JSON.parse(localStorage.getItem("logs") || JSON.stringify([]));
  // localStorage.setItem('logs', JSON.stringify(logs.push(error.response)));
  // return Promise.reject(error);
})

io.interceptors.request.use((config) => {
  let token = store.getters.getToken
  if (token) {
    config.headers = {
      Authorization: token
    }
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

class Axios {
  get(url, params = {}) {
    return io.get(url, { params }).then(res => {
      return Promise.resolve(res.data);
    })
  }

  post(url, params = {}, config = {}) {
    if (config.dataType !== 'json') { // 默认采用x-www-form-urlencodeed format, 除非config中传了dataType=json
      params = qs.stringify(params);
    }
    return io.post(url, params, config).then(res => {
      return Promise.resolve(res.data);
    })
  }

  formData(url, params) {
    return io.post(url, params).then(res => {
      return Promise.resolve(res.data);
    })
  }

  all(...promises) {
    return io.all([...promises]).then(io.spread(res => {
      return res;
    }));
  }
}

export default new Axios;