import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from 'vue-router'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // localStorage.setItem(key, value);
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === 401) {
      // router.replace('/login')
      // Message({
      //   message: '请先登录',
      //   type: 'info',
      //   duration: 5 * 1000
      // })
    } else if (res.status === 402) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 3 * 1000
    })
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
