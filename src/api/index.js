import axios from './axios'

export default {
  /**
   * login
  */
  async login(params) {
    // const url = '/api/login';
    // return axios.formData(url, params).then(res => {
    //   return Promise.resolve(res.data)
    // }).catch(rej => {
    //   return Promise.reject(rej)
    // })
    return Promise.resolve({
      code: 200,
      data: 'tokenyyyyyy'
    })
  },
  async getMenuList() {
    return Promise.resolve({
      code: 0,
      data: [
        {
          menus: [{
            name: '工作台',
            url: '/staging'
          }]
        }
      ]
    })
  }
}