/**
 * 角色管理
 */
import React, { Component } from 'react'
import { Card, Select, Table, Icon, Button, Input, message } from 'antd'

// import './ProjectHome.css'
import LinkButton from '../../components/LinkButton/LinkButton'
import { reqProjectsList, reqSearchProjects , reqDelProject } from '../../api/project'
import { PROJECT_PAGESIZE } from '../../config/constant'

const Option = Select.Option

export default class ProjectHome extends Component {
  state = {
    projects: [],
    loading: false,
    total: 0,
    searchType: 'name',
    keyword: '',
    showAdd: false
  }

  //准备表头
  componentWillMount() {
    this.initColumns()
  }

  //准备projects数据
  componentDidMount() {
    this.recieveProjectsList(1) //默认显示第一页
  }

  /**
   * 得到项目(分页)
   * //0 判断一般请求还是搜索
   * //1得到数据
   * //2更新state
   */
  recieveProjectsList = async pageNumber => {
    this.setState({ loading: true })
    //0 判断一般请求还是搜索
    const { searchType, keyword } = this.state
    let response
    if (keyword) {
      //0.1 有keyword 为搜索
      response = await reqSearchProjects({
        pageNumber,
        pageSize: PROJECT_PAGESIZE,
        searchType,
        keyword
      })
    } else {
      //0.2 没keyword 为一般请求
      response = await reqProjectsList(pageNumber, PROJECT_PAGESIZE)
    }
    //1 得到数据
    const { code, msg, projects, total } = response.data //服务器响应数据 {code , msg ,total,projects}
    this.setState({ loading: false })
    if (code === 0) {
      this.setState({ projects, total })
    } else {
      return message.error(msg)
    }
  }

  //回车提交搜索
  handleEnter = e => {
    if (e.keyCode === 13) {
      this.recieveProjectsList(1)
    }
  }

  //清空输入
  reset = () => {
    this.setState({ keyword: '', searchType: 'name' }, () => {
      this.recieveProjectsList()
    })
  }

  //初始化表头
  initColumns = () => {
    this.columns = [
      {
        title: '编号',
        dataIndex: 'number',
        width: 50
      },
      {
        title: '项目名称',
        dataIndex: 'name'
      },
      {
        title: '单位名称',
        dataIndex: 'unit'
      },
      {
        title: '负责人',
        dataIndex: 'exeLeader',
        width: 70
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 50,
        render: status => (status === '0' ? ' 未完' : '完成')
      },
      {
        title: '合同',
        width: 50,
        // dataIndex: 'contractStatus',
        render: item => (item.contractStatus === '0' ? ' 未签' : '已签')
      },
      {
        title: '支付',
        width: 50,
        // dataIndex: 'payStatus',
        render: item => (item.payStatus === '0' ? ' 未付' : '完成')
      },
      {
        title: '操作',
        width: 110,
        //传递参数item即每一行数据{name , key ,_id ,parentID}
        render: item => (
          <span>
            <LinkButton
              onClick={() => this.props.history.push('/project/detail', item)}
            >
              Detail
            </LinkButton>
            <LinkButton onClick={() => this.showEdit(item)}>Edit</LinkButton>
            <LinkButton onClick={() => this.delProject(item)}>Del</LinkButton>
          </span>
        )
      }
    ]
  }

  /**
   * 功能 删除指定project
   */
  delProject = (item)=>{
    const {_id,name} = item
    if(window.confirm(`确定要删除项目 ${name} ?`)){
      reqDelProject(_id)
      this.recieveProjectsList(1) 
    }   
  }

  render() {
    const { projects, total, loading, searchType, keyword } = this.state
    //左上角
    const title = (
      <div>
        <div>
          <Select style={{ width: 100 }} placeholder="负责人">
            <Option value="0">刘德华</Option>
            <Option value="3">张学友</Option>
            <Option value="">所有负责人</Option>
          </Select>
          <Select
            style={{ width: 100, margin: '0 10px' }}
            placeholder="项目状态"
          >
            <Option value="0">未完</Option>
            <Option value="3">已完</Option>
            <Option value="">忽略状态</Option>
          </Select>
        </div>
        <span>
          <Select
            ref="select1"
            style={{ width: 100 }}
            defaultValue={searchType}
            onChange={value => this.setState({ searchType: value })}
          >
            <Option value="name">项目名称</Option>
            <Option value="unit">单位名称</Option>
          </Select>
          <Input
            placeholder="输入关键字"
            value={keyword}
            style={{ width: '50%', margin: '10px 10px 0px 10px' }}
            onChange={e => this.setState({ keyword: e.target.value })}
            onKeyDown={e => this.handleEnter(e)}
          />
          <Button onClick={() => this.recieveProjectsList(1)}>搜索</Button>
          <Button onClick={this.reset} style={{ marginLeft: 5 }}>
            重置
          </Button>
        </span>
      </div>
    )
    //右上角
    const extra = (
      <Button
        onClick={() => {
          this.props.history.push('/project/addedit')
        }}
      >
        <Icon type="plus" />
        添加
      </Button>
    )
    return (
      <div className="ProjectHome">
        <Card title={title} extra={extra}>
          <Table
            dataSource={projects}
            columns={this.columns}
            rowKey="_id"
            bordered
            loading={loading}
            pagination={{
              defaultPageSize: PROJECT_PAGESIZE,
              total: total,
              onChange: this.recieveProjectsList
            }}
          />
        </Card>
      </div>
    )
  }
}
