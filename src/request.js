import axios from 'axios'
import { Message } from 'element-ui'

const BASE_API = 'http://localhost:7070'
// create an axios instance
const service = axios.create({
  baseURL: BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// 响应拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   */
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res.code > 4000) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return response.success
      }

      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('timeout')) {
      Message({
        message: '请求超时，请稍后重试',
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
