/**
 * ./src/api/index.js
 * 接口请求函数
 * 包含所有业务接口请求
 */

import jsonp from "jsonp";
import { message } from "antd";

//引自定义包
import ajax from "./ajax";

// const BASE = 'http://localhost:5000'
const BASE = ''



//用户登录请求
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

//用户新建用户请求
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')




//天气请求 jsonp
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        //1 成功
        const { date, dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ date, dayPictureUrl, weather })
      } else {
        //2 失败
        message.error('请求天气失败')
      }
    })
  })
}

/*
data.results[0].weather_data[0] :
{
date: "周日 07月28日 (实时：30℃)"
dayPictureUrl: "http://api.map.baidu.com/images/weather/day/yin.png"
nightPictureUrl: "http://api.map.baidu.com/images/weather/night/duoyun.png"
temperature: "35 ~ 27℃"
weather: "阴转多云"
wind: "西南风微风"
}
*/


/*----项目类型管理----*/

//项目类型 添加项目类型
// name: { type: String, required: true },
// parentID: { type: String, default: 0 },
// 成功响应 { code: 0, msg: '添加成功' , result }
export const reqAddCategory = (name, parentID) => ajax('/cate/add', { name, parentID }, 'POST')

//项目类型 请求删除
export const reqDelCategory = (_id) => ajax(BASE + '/cate/del', {_id}, 'GET')

//项目类型 请求项目类型
export const reqCategorys = (parentID) => ajax(BASE + '/cate/all', { parentID }, 'GET')


//项目类型 请求修改指定项目类型名
export const reqEditCategory = (_id, newName) => ajax('/cate/edit', { _id, newName }, 'POST') 

//项目类型 根据类型ID查询类型
export const reqCategory = (categoryID)=>ajax(BASE + '/cate/one',{categoryID})