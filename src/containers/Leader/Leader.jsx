/**
 * 项目负责人管理
 */
import React, { Component } from 'react'
import { Card, Table, Popconfirm, Modal, message } from 'antd'

import { reqLeaders, reqAddLeader, reqDelLeader } from '../../api/leader'
import './Leader.css'
import LinkButton from '../../components/LinkButton/LinkButton'
import AddLeader from './AddLeader'

export default class Leader extends Component {
  state = {
    leaders: [],
    showAdd: false, //显示对话框 : add
    showEdit: false //显示对话框 :edit
  }

  componentWillMount() {
    this.recieveLeaders()
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
   * 提交add项目负责人
   * 0 前端验证
   * 1 获取输入数据 leader:{leaderName , sector , leaderPhone , leaderMail}
   * 2 提交请求reqAddCategory
   * 3 处理响应
   * 3.1 code:0 获取最新数据 ,关闭对话框
   */
  submitAdd = () => {
    //0 前端验证
    this.form.validateFields(async (err, values) => {
      if (err) {
        return console.log(err)
      }
      //1 验证成功,获取输入数据 name , parentID
      const leader = values
      //2 提交请求
      const response = await reqAddLeader(leader) //axios成功返回
      const { code, msg } = response.data
      //3 处理响应
      //3.1 code:1 , 重名
      if (code === 1) {
        return message.error(msg, 0.5)
      }
      //3.2 code:0 , 成功:关闭窗口
      this.handleCancel()
      //获取最新数据
      this.recieveLeaders()
    })
  }

  /**
   * 删除指定类型
   * 1 请求删除
   * 2 接收最新数据
   */
  submitDel = async item => {
    //1 请求删除
    const _id = item._id
    await reqDelLeader(_id)
    //2 接收最新数据
    this.recieveLeaders()
  }

  /**
   * 删除指定类型(原生js确认框)
   * 0 确认
   * 1 请求删除
   * 2 接收最新数据
   */
  submitDel2 = async item => {
    //0确认
    if (window.confirm(`确定要删除${item.leaderName}吗?`)) {
      //1 请求删除
      const _id = item._id
      await reqDelLeader(_id)
      //2 接收最新数据
      this.recieveLeaders()
    }
  }

  /**
   * 得到项目负责人
   * //1请求数据
   * //2更新state
   */
  recieveLeaders = async () => {
    //1 request data
    const response = await reqLeaders()
    const leaders = response.data.leaders //服务器响应数据 {coed , msg ,leaders}
    leaders.forEach(item => {
      item.key = item._id
    })
    //2 updata state
    this.setState({
      leaders
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
        添加项目负责人
      </LinkButton>
    )
    const dataSource = this.state.leaders

    const columns = [
      {
        title: '姓名',
        dataIndex: 'leaderName',
        key: 'leaderName',
        width: 80,
        align: 'center'
      },
      {
        title: '部门',
        dataIndex: 'sector',
        key: 'sector',
        width: 100,
        align: 'center'
      },
      {
        title: 'phone',
        dataIndex: 'leaderPhone',
        key: 'leaderPhone',
        width: 100,
        align: 'center'
      },
      {
        title: 'mail',
        dataIndex: 'leaderMail',
        key: 'leaderMail',
        width: 150,
        align: 'center'
      },
      {
        title: 'action',
        // width: 100,
        align: 'center',
        render: item => (
          <span>
            <LinkButton>detail</LinkButton>
            <LinkButton>edit</LinkButton>
            <Popconfirm
              title='Are you sure delete this leader?'
              onConfirm={() => this.submitDel(item)}
              onCancel={() => message.info('think about it')}
              okText='Yes'
              cancelText='No'
            >
              <LinkButton>Delete</LinkButton>
            </Popconfirm>
          </span>
        )
      }
    ]
    return (
      <div className='Leader'>
        <Card title={title} extra={extra} style={{ width: '100%' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={{ defaultPageSize: 7 }}
          />
        </Card>
        {/* 对话框 添加负责人 */}
        <Modal
          title='添加负责人'
          visible={this.state.showAdd}
          onOk={this.submitAdd}
          onCancel={this.handleCancel}
        >
          <AddLeader
            sendForm={form => {
              this.form = form
            }}
          />
        </Modal>
      </div>
    )
  }
}
