//子组件
//负责人管理 \ 添加负责人的Form
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item
const create = Form.create

class AddCompany extends Component {
  componentWillMount() {
    //向父组件传递form对象
    this.props.sendForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // const { parentID, categorys } = this.props //父组件传属性
    return (
      <Form>
        <span className='Add-span'>
          公司全称
        </span>        
        <Item>
          {getFieldDecorator('companyFName', {
            rules: [{ required: true, message: '必须输入公司全称' }, { min: 2 }]
          })(<Input placeholder="输入公司全称" />)}
        </Item>
        <span className='Add-span'>
          简称
        </span>  
        <Item>
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: '必须输入' }, { min: 2 }]
          })(<Input placeholder="输入公司简称,方便显示" />)}
        </Item>
        <span className='Add-span'>
          联系人
        </span>
        <Item>
          {getFieldDecorator('companyContact', {
            rules: []
          })(<Input placeholder="输入联系人姓名" />)}
        </Item>
        联系方式
        <Item>
          {getFieldDecorator('companyPhone', {
            rules: [{ required: true }, { min: 2 }]
          })(<Input placeholder="输入手机/固定电话" />)}
        </Item>
        电子邮箱
        <Item>
          {getFieldDecorator('companyMail', {
            rules: [{ required: true }, { min: 2 }]
          })(<Input placeholder="company@domino.com" />)}
        </Item>
      </Form>
    )
  }
}

AddCompany.propTypes = {
  sendForm: PropTypes.func //将Form对象传给父组件 , 父组件需要Form的方法拿到输入值
}

//包装 , 获得form属性
export default create()(AddCompany)
