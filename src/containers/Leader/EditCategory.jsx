//子组件
//项目类型管理 \ 编辑指定项目的Form
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item
const create = Form.create

class EditCategory extends Component {
  componentWillMount() {
    this.props.sendForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { targetName } = this.props
    return (
      <Form>
        <Item>
          {getFieldDecorator('newName', { initialValue: targetName , rules:[
            {required:true , message:'类型名必须输入'}
          ] })(
            <Input />
          )}
        </Item>
      </Form>
    )
  }
}

EditCategory.propTypes = {
  targetName: PropTypes.string, //父组件传属性:当前点击编辑的目标项目类型的名字 , 用于默认显示
  sendForm: PropTypes.func //将Form对象传给父组件 , 父组件需要Form的方法拿到输入值
}

//包装 , 获得form属性
export default create()(EditCategory)
