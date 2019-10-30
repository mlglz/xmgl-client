/**
 * ./src/api/company.js
 * 接口请求函数
 * 处理company(合作公司)接口请求
 */



//引自定义包
import ajax from "./ajax";

// const BASE = 'http://localhost:5000'
const BASE = ''


/*----公司管理----*/

//公司 添加公司
// companyName: { type: String, required: true },
// companyContact: { type: String, required: true },
// companyPhone: { type: String, default: '' },
// companyMail: { type: String, default: '' },
export const reqAddCompany = (company) => ajax('/company/add', company, 'POST')

//公司 请求删除
export const reqDelCompany = (_id) => ajax(BASE + '/company/del', {_id}, 'GET')

//公司 请求修改指定公司名
export const reqEditCompany = (_id, newName) => ajax('/company/edit', { _id, newName }, 'POST') 

//公司 请求 设置公司状态
export const reqSetCompanyStatus = (_id , companyStatus)=> ajax('/company/edit', { _id, companyStatus }, 'POST')


//公司 请求公司(所有)
export const reqCompanys = () => ajax(BASE + '/company/all', {  }, 'GET')