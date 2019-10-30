/**
 * ./src/api/leader.js
 * 接口请求函数
 * 处理leader(负责人)接口请求
 */


//引自定义包
import ajax from "./ajax";

// const BASE = 'http://localhost:5000'
const BASE = ''

/*----负责人管理----*/

//负责人 添加负责人
// leaderName: { type: String, required: true },
// sector: { type: String, default: '测评部' },
// leaderPhone: { type: String, default: '' },
// leaderMail: { type: String, default: '' },
export const reqAddLeader = (leader) => ajax('/leader/add', leader, 'POST')

//负责人 请求删除
export const reqDelLeader = (_id) => ajax(BASE + '/leader/del', {_id}, 'GET')

//负责人 请求修改指定负责人名
export const reqEditLeader = (_id, newName) => ajax('/leader/edit', { _id, newName }, 'POST') 

//负责人 请求负责人(所有)
export const reqLeaders = () => ajax(BASE + '/leader/all', {  }, 'GET')