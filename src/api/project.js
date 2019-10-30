/**
 * ./src/api/project.js
 * 接口请求函数
 * 处理project(项目)接口请求
 */



//引自定义包
import ajax from "./ajax";

// const BASE = 'http://localhost:5000'
const BASE = ''


/*----项目管理----*/

//项目 添加项目
export const reqAddProject = (project) => ajax('/project/add', project, 'POST')

//项目 请求删除
export const reqDelProject = (_id) => ajax(BASE + '/project/del', { _id }, 'GET')

//项目 请求修改指定项目名
export const reqEditProject = (_id, newName) => ajax('/project/edit', { _id, newName }, 'POST')

//项目 请求项目(所有)
export const reqProjects = () => ajax(BASE + '/project/all', {}, 'GET')

//项目 请求项目(分页)
//pageNumber 查询那一页
//pageSize  每页大小
export const reqProjectsList = (pageNumber, pageSize) => ajax(BASE + '/project/list', { pageNumber, pageSize }, 'GET')

//project search by name or unit
//第三个属性名为searchType ,值为keyword
//形参为一整个对象,因为太多了
export const reqSearchProjects = ({ pageNumber, pageSize, searchType, keyword }) => ajax(BASE + '/project/search', {
  pageNumber,
  pageSize,
  [searchType]: keyword
})



/*数据库
  name: { type: String, required: true },            //项目名称  *
  unit: { type: String, required: true },            //项目单位  *
  number: { type: String, default: 'XT19000' },      //项目编号
  status: { type: String, default: '0' },            //项目状态  0 未完成  3 已完成
  category: { type: String, default: '0' },          //项目类型  从Categorys表   0 财政投资信息化项目安全测评
  contact: { type: String, default: '' },            //联系人
  contactWay: { type: String, default: '' },         //联系方式
  remark: { type: String, default: '' },             //项目备注
  contractStatus: { type: String, default: '0' },      //合同状态       0 未签订 , 1 我方签章 , 2 对方签章 , 3 已签订 ,4 其他
  contractNumber: { type: String, default: '0' },      //合同编号(项目编号)
  contractSigner: { type: String, required: true },    //合同签署方  *
  contractDate: { type: String, default: '' },         //合同日期
  contractPrice: { type: Number, default: 0 },         //合同金额
  contractRemark: { type: String, default: '' },       //合同备注
  payWays: { type: String, default: '0' },          //支付方式   0 两次支付  1 一次性支付   4 其他
  payStatus: { type: String, default: '0' },        //支付状态   0 未支付   1 首款支付   2 二款支付  3 已完成支付  4 其他
  invoiceStatus: { type: String, default: '0' },    //发票状态  0 未开票   1 首款发票   2 二款发票  3 所有发票已开  4 其他
  invoiceNumber: { type: String, default: '' },     //发票号码1
  invoiceNumber2: { type: String, default: '' },    //发票号码2
  invoiceNumber3: { type: String, default: '' },    //发票号码3
  payRemark: { type: String, default: '' },         //支付备注
  exeLeader: { type: String, required: true },    //项目负责人    *    从Leaders表
  exeProject: { type: String, default: '' },      //项目合作方    *    从Projects表
  exeStatus: { type: String, default: '0' },      //项目实施状态   0 未实施  1 完成现场   2 完成整改  3 报告签章   4 其他
  exeRemark: { type: String, default: '' },       //实施备注
*/