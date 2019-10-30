//子组件
//负责人管理 \ 添加负责人的Form
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item
const create = Form.create

class AddLeader extends Component {
  componentWillMount() {
    //向父组件传递form对象
    this.props.sendForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // const { parentID, categorys } = this.props //父组件传属性
    return (
      <Form>
        姓名
        <Item>
          {getFieldDecorator('leaderName', {
            rules: [{ required: true, message: '必须输入姓名' }, { min: 2 }]
          })(<Input placeholder='输入姓名' />)}
        </Item>
        部门
        <Item>
          {getFieldDecorator('sector', {
            rules: []
          })(<Input placeholder='输入部门' />)}
        </Item>
        联系方式
        <Item>
          {getFieldDecorator('leaderPhone', {
            rules: [{ required: true }, { min: 2 }]
          })(<Input placeholder='输入手机/固定电话' />)}
        </Item>
        电子邮箱
        <Item>
          {getFieldDecorator('leaderMail', {
            rules: [{ required: true }, { min: 2 }]
          })(<Input placeholder='name@domino.com' />)}
        </Item>
      </Form>
    )
  }
}

AddLeader.propTypes = {
  sendForm: PropTypes.func //将Form对象传给父组件 , 父组件需要Form的方法拿到输入值
}

//包装 , 获得form属性
export default create()(AddLeader)
