/**
 * 项目类型管理
 */
import React, { Component } from 'react'
import { Card, Table, Icon, Modal, message, Popconfirm, Button } from 'antd'

//自定义组件/函数
import './Category.css'
import LinkButton from '../../components/LinkButton/LinkButton'
import {
  reqCategorys,
  reqEditCategory,
  reqAddCategory,
  reqDelCategory
} from '../../api/index'
import EditCategory from './EditCategory'
import AddCategory from './AddCategory'

export default class Category extends Component {
  state = {
    categorys: [],
    subCategory: [],
    parentID: '0',
    parentName: '',
    showAdd: false, //显示对话框 : add
    showEdit: false, //显示对话框 :edit
    targetName: '', //当前编辑类型的name,
    targetEditId: '' //目标类型的id
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.recieveCategorys()
  }

  //初始化表头
  initColumns = () => {
    this.columns = [
      {
        title: '项目类型',
        dataIndex: 'name',
        key: 'name'
        // width:150,
      },
      {
        title: 'action',
        width: 250,
        align: 'center',
        render: (
          item //传递参数item即每一行数据{name , key ,_id ,parentID}
        ) => (
          <span>
            <LinkButton onClick={() => this.showEdit(item)}>编辑</LinkButton>
            {item.parentID === '0' ? (
              <LinkButton onClick={() => this.getSubcategorys(item)}>
                查看子类型
              </LinkButton>
            ) : null}
            <Popconfirm
              title="Are you sure delete this company?"
              onConfirm={() => this.submitDel(item)}
              onCancel={() => message.info('think about it')}
              okText="Yes"
              cancelText="No"
            >
              <LinkButton>Delete</LinkButton>
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
   * 提交add项目类型
   * 0 前端验证
   * 1 获取输入数据 name , parentID
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
      const { name, parentID } = values
      //2 提交请求
      const response = await reqAddCategory(name, parentID) //axios成功返回
      const { code, msg } = response.data
      //3 处理响应
      //3.1 code:1 , 重名
      if (code === 1) {
        return message.error(msg, 0.5)
      }
      //3.2 code:0 , 成功:关闭窗口
      this.handleCancel()
      //如果添加的是当前类型的子类型,则获取最新数据
      if (parentID === this.state.parentID) {
        this.recieveCategorys()
        //如果在二级页面添加一级类型,则更新数据,但不跳转到一级
      } else if (parentID === '0') {
        this.recieveCategorys(parentID)
      }
    })
  }

  /**
   * 删除指定类型
   * 1 判断是否有子类型
   * 2 请求删除
   * 3 接收最新数据
   */
  submitDel = async item => {
    //1 判断是否有子类型
    const _id = item._id
    //1.1 请求parentID为目标_id的数据
    //即如以当前删除目标为parentID请求数据,如果有数据,则说明该目标有子类型
    const response = await reqCategorys(_id)
    const SubCategorys = response.data.categorys //服务器响应数据 {coed , msg ,categorys}
    if (SubCategorys.length > 0) {
      return message.info('该类型包含子类型,请先删除子类型', 1)
    }
    //2 请求删除
    reqDelCategory(_id)
    //3 接收最新数据
    this.recieveCategorys()
  }

  /**
   * 显示编辑对话框
   */
  showEdit = item => {
    this.setState({
      showEdit: true,
      targetName: item.name,
      targetEditId: item._id
    })
  }

  /**
   * 提交编辑项目类型
   * 0 表单验证
   * 1 目标id ,输入值
   * 2 提交请求
   * 3 获取最新数据
   * 4 关闭对话框
   */
  submitEdit = () => {
    //0 表单验证
    this.form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      //0 验证通过
      //1 目标id ,输入值
      const _id = this.state.targetEditId
      const { newName } = values
      //2 提交请求
      const response = await reqEditCategory(_id, newName)
      //3 获取最新数据 ,关闭对话框
      const { code, msg, category } = response.data
      if (code===1){
        return message.warning(msg)
      }
      if (code === 0) {
        message.info(`${msg},${category.name}`,2)
        this.recieveCategorys()
        this.handleCancel()
      }
    })
  }

  /**
   * 得到项目类型(1级或2级)
   * //1请求数据
   * //2更新state
   */
  recieveCategorys = async parentID => {
    //1 request data
    parentID = parentID || this.state.parentID
    const response = await reqCategorys(parentID)
    const categorys = response.data.categorys //服务器响应数据 {coed , msg ,categorys}
    categorys.forEach(item => {
      item.key = item._id
    })
    //2 updata state
    //2.1 如果是0 , 收到一级类型
    if (parentID === '0') {
      this.setState({
        categorys
      })
    } else {
      //2.2 如果不是0 , 收到指定parentId子类型
      this.setState({
        subCategory: categorys
      })
    }
  }

  /**
   * 得到1级项目类型
   */
  recieveLv1Categorys = async () => {
    //1请求
    const response = await reqCategorys('0')
    const { categorys } = response.data
    //1.1 配置key
    categorys.forEach(item => {
      item.key = item._id
    })
    //1.2 更新状态
    this.setState({
      categorys
    })
  }

  //显示指定子类型
  //1 获取parentID
  //2 更新状态
  //3 调用函数,请求项目类型(带着parentID拿到二级)
  getSubcategorys = item => {
    this.setState({ parentID: item._id, parentName: item.name }, () => {
      this.recieveCategorys() //setState是异步的,通过callback使用最新state
    })
  }

  //返回一级类型
  //初始化状态即重新渲染
  returnCategorys = () => {
    this.setState({
      subCategory: [],
      parentID: '0',
      parentName: ''
    })
  }

  render() {
    const {
      parentID,
      parentName,
      categorys,
      subCategory,
      targetName
    } = this.state
    const title =
      parentName === '' ? (
        ' 一级类型'
      ) : (
        <span>
          <LinkButton onClick={this.returnCategorys}>一级类型</LinkButton>
          <Icon type="caret-right" />
          <span>{parentName}的子类型</span>
        </span>
      )
    const extra = (
      <Button
        onClick={() => {
          this.setState({ showAdd: true })
        }}
      >
        <Icon type="plus" />
        添加分类
      </Button>
    )

    return (
      <div className="Category">
        <Card title={title} extra={extra} style={{ width: '100%' }}>
          <Table
            dataSource={parentID === '0' ? categorys : subCategory}
            columns={this.columns}
            bordered
            pagination={{ defaultPageSize: 5 }}
          />
        </Card>
        {/* 对话框 添加类型 */}
        <Modal
          title="添加项目类型"
          visible={this.state.showAdd}
          onOk={this.submitAdd}
          onCancel={this.handleCancel}
        >
          <AddCategory
            parentID={parentID}
            categorys={categorys}
            sendForm={form => {
              this.form = form
            }}
          />
        </Modal>
        {/* 对话框 编辑项目类型 */}
        <Modal
          title="编辑项目类型"
          visible={this.state.showEdit}
          onOk={this.submitEdit}
          onCancel={this.handleCancel}
        >
          <EditCategory
            targetName={targetName}
            sendForm={form => {
              this.form = form
            }}
          />
        </Modal>
      </div>
    )
  }
}
