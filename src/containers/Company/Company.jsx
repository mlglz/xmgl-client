/**
 * 合作公司管理
 */
import React, { Component } from 'react'
import { Card, Table, Popconfirm, Modal, message, Button } from 'antd'

import {
  reqCompanys,
  reqAddCompany,
  reqDelCompany,
  reqSetCompanyStatus
} from '../../api/company'
import './Company.css'
import LinkButton from '../../components/LinkButton/LinkButton'
import AddCompany from './AddCompany'

export default class Company extends Component {
  state = {
    companys: [],
    showAdd: false, //显示对话框 : add
    showEdit: false //显示对话框 :edit
  }

  componentWillMount() {
    this.initColums()
  }

  componentDidMount() {
    this.recieveCompanys()
  }

  //配置表头
  initColums = () => {
    this.columns = [
      {
        title: '合作公司',
        dataIndex: 'companyName',
        width: 100,
        align: 'center'
      },
      {
        title: '联系人',
        dataIndex: 'companyContact',
        width: 100,
        align: 'center'
      },
      {
        title: 'phone',
        dataIndex: 'companyPhone',
        width: 100,
        align: 'center'
      },
      {
        title: 'status',
        width: 100,
        align: 'center',
        render: item => {
          const { companyStatus } = item
          return (
            <span>
              <span style={{ marginRight: 10 }}>
                {companyStatus === '0' ? '暂停' : '可用'}
              </span>
              <Button
                style={{ fontSize:12, padding: '0 10px' ,height:20}}
                onClick={() => {
                  this.setStatus(item)
                }}
              >
                {companyStatus === '0' ? '激活' : '停用'}
              </Button>
            </span>
          )
        }
      },
      {
        title: 'action',
        width: 100,
        align: 'center',
        render: item => (
          <span>
            <LinkButton>Edit</LinkButton>
            <LinkButton>Detail</LinkButton>
            <Popconfirm
              title="Are you sure delete this company?"
              onConfirm={() => this.submitDel(item)}
              onCancel={() => message.info('think about it')}
              okText="Yes"
              cancelText="No"
            >
              <LinkButton>Del</LinkButton>
            </Popconfirm>
          </span>
        )
      }
    ]
  }

  //关闭对话框
  handleCancel = () => {
    //1 重置所有输入框
    this.form.resetFields()
    //2 更新状态,关闭输入框
    this.setState({
      showAdd: false,
      showEdit: false
    })
  }

  /**
   * 提交add合作公司
   * 0 前端验证
   * 1 获取输入数据 company:{companyName , companyContact , companyPhone , companyMail}
   * 2 提交请求reqAddCategory
   * 3 处理响应
   * 3.1 code:0 获取最新数据 ,关闭对话框
   */
  submitAdd = () => {
    //0 前端验证
    this.form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      //1 验证成功,获取输入数据 name , parentID
      const company = values
      //2 提交请求
      const response = await reqAddCompany(company) //axios成功返回
      const { code, msg } = response.data
      //3 处理响应
      //3.1 code:1 , 重名
      if (code === 1) {
        return message.error(msg, 0.5)
      }
      //3.2 code:0 , 成功:关闭窗口
      this.handleCancel()
      //获取最新数据
      this.recieveCompanys()
    })
  }

  /**
   * 设置公司状态
   * 0 获取id和当前状态
   * 1 发送请求
   * 2 响应成功后,刷新对应页面
   */
  setStatus = async item => {
    //0 获取id和当前状态
    const { _id, companyStatus } = item
    //1 发送请求
    //1.1 配置新状态
    const newStatus = companyStatus === '0' ? '1' : '0'
    const response = await reqSetCompanyStatus(_id, newStatus)
    //2 处理响应
    const { code } = response.data
    if (code === 0) {
      this.recieveCompanys()
    }
  }

  /**
   * 删除指定类型
   * 1 请求删除
   * 2 接收最新数据
   */
  submitDel = async item => {
    //1 请求删除
    const _id = item._id
    await reqDelCompany(_id)
    //2 接收最新数据
    this.recieveCompanys()
  }

  /**
   * 得到公司(所有)
   * //1请求数据
   * //2更新state
   */
  recieveCompanys = async () => {
    //1 request data
    const response = await reqCompanys()
    const companys = response.data.companys //服务器响应数据 {coed , msg ,companys}
    companys.forEach(item => {
      item.key = item._id
    })
    //2 updata state
    this.setState({
      companys
    })
  }

  render() {
    const title = ''
    const extra = (
      <LinkButton
        onClick={() => {
          this.setState({ showAdd: true })
        }}
      >
        添加合作公司
      </LinkButton>
    )
    const dataSource = this.state.companys

    return (
      <div className="Company">
        <Card title={title} extra={extra} style={{ width: '100%' }}>
          <Table
            dataSource={dataSource}
            columns={this.columns}
            bordered
            pagination={{ defaultPageSize: 7 }}
            rowKey="_id"
          />
        </Card>
        {/* 对话框 添加合作公司 */}
        <Modal
          title="添加合作公司"
          visible={this.state.showAdd}
          onOk={this.submitAdd}
          onCancel={this.handleCancel}
        >
          <AddCompany
            sendForm={form => {
              this.form = form
            }}
          />
        </Modal>
      </div>
    )
  }
}
