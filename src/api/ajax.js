/**
 * axios发送ajax请求
 * 返回promise对象
 */

import axios from "axios";
import { message } from "antd";



export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    //1) ajax请求
    if (method === 'GET') {
      promise = axios.get(url, { params: data })
    } else {
      promise = axios.post(url, data)
    }
    //2) 处理成功(resolve)
    promise.then(response => {
      resolve(response)
      //3) 处理失败(直接处理掉) ,即最终返回的promise对象不会抛出error
    }).catch(error => {
      //不要reject(error) ,而是直接处理掉error
      message.error(error.message , 0.5)
    })
  })
}